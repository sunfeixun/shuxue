let course1 = {};

(function() {
	let p = {};

	const mainContainer = new createjs.Container;
	let manager;
	let loader;
	let resetBtn,prevBtn,nextBtn, seerButton;
	let curTab;
	let tipTab;
	let staticCloud, countClouds;
	const cloudQueueInfo = {beginX:410,sumX:70,targY:95,scale:1};

	p.go = function(){
		manager = courseGetter.getManager();     //通过courseGetter获取到当前课程类的管理器
		manager.init('canvas');		//初始化课程类（包括舞台）
		loader = manager.loader;				//统一用课程管理器的loader来合并加载队列

		loader.addLoadProgress(null,manager.container).set({x:640,y:360});  //进度文本;
		loader.add(['mainUI.json','mainUI.png'],'graphics/');

		manager.loadLesson(sessionStorage.lesson,buildFrame);
	}

	function buildFrame() {
		let container = manager.container;

		// 生成版式，包括背景，按钮，云朵等
		let sprite = loader.getSprite('mainUI',true);

		let partsButtonContainer = new createjs.Container;
		let buttonContainer = new createjs.Container;

		// 生成遮罩
		let rect = new createjs.Shape();
		let pos = {x:235,y:142};
		rect.graphics.s('#C4DC7D').ss(2).sd([7,7]).rr(0,0,879,495,109);
		mainContainer.mask = new createjs.Shape(new createjs.Graphics().rr(0,0,879,495,109)).set(pos);
		rect.set(pos);

		let _x = 140, _y = 200, sumY = 76;
		for(let i=0;i<=5;i++){
			sprite['t'+i].set({x:_x,y:_y,custom:{}});
			sprite['t'+i].custom.part = i;
			sprite['t'+i].custom.tween = TweenLite.to(sprite['t'+i],0.2,{x:'-=20'}).pause();
			sprite['t'+i].custom.name = 't'+i;
			partsButtonContainer.addChild(sprite['t'+i]);
			_y += sumY;
		}

		tipTab = sprite.t0;

		partsButtonContainer.cursor = 'pointer';
		partsButtonContainer.on('click',goPart);

		// 创建功能按钮，重置，上一页，下一页
		resetBtn = buttonContainer.addChild(sprite.reset.set({x:1072,y:593,funcName:'reset'}));
		prevBtn = buttonContainer.addChild(sprite.prev.set({x:234,y:381,funcName:'prev'}));
		nextBtn = buttonContainer.addChild(sprite.next.set({x:1113,y:381,funcName:'next'}));

		buttonContainer.cursor = 'pointer';
		buttonContainer.on('click',clickControl);

		// 按钮添加完毕，将按钮容器和背景添加到舞台
		container.addChild(partsButtonContainer,sprite.bg.set({x:722,y:348,scaleX:1.09}),mainContainer,rect,buttonContainer);
		sprite.bg.on('click',function(){});

		// 添加课程接口的shower
		manager.shower.set({scaleX:0.73,scaleY:0.73,x:218,y:117});
		mainContainer.addChild(manager.shower);

		// 修改后的返回按钮，在背景下面，单独写
		container.addChildAt(sprite.back,0).set({x:1184,y:621,cursor:'pointer'}).on('click',goback);


		//云朵
		staticCloud = sprite.staticCloud.clone().set({x:278,y:74});

		container.addChildAt(staticCloud,0);
		countClouds = container.addChildAt(new createjs.Container,0);


		manager.on('slidechange',nextSlide);	//监听页面改变
		manager.on('correct',quizResult); 		//监听答题正确
		manager.on('incorrect',quizResult);		//监听答题错误
		manager.on('finish',quizResult);		//监听问题完成

		manager.gotoPart(1);
		// sprite.t1.custom.tween.play();
		selectTab(sprite.t1);
		curTab = sprite.t1;
	}

	function goback(){
		window.location.href = 'index.html';
	}

	function goPart(e) {
		if(e.target===tipTab){
			manager.showTip('toggle');
			manager.isTip? selectTab(tipTab):unselectTab(tipTab);
		}else{
			if(manager.gotoPart(e.target.custom.part)){

				selectTab(e.target);
				unselectTab(curTab);
				curTab = e.target;
			}
			if(manager.isTip){
				manager.showTip('off');
				unselectTab(tipTab);
			}
		}
	}

	function selectTab(tab){
		if(!tab) return;
		tab.gotoAndStop(tab.custom.name + 'selected');
		tab.custom.tween.play();
	}

	function unselectTab(tab){
		tab.gotoAndStop(tab.custom.name);
		tab.custom.tween.reverse();
	}

	function nextSlide(e) {
		let slide = e.target.currentSlide;
		let lastSlide = e.target.lastSlide;
		let queue;

		resetBtn.visible = typeof(slide.reset)==='function'? true:false;
		prevBtn.visible = nextBtn.visible = slide.isSubPart();
		// staticCloud.visible = !slide.isSubPart();

		TweenLite.set(countClouds.children,{visible:false});


		if(slide.isSubPart()){
			prevBtn.visible = slide.getLocalID()===0? false:true;
			nextBtn.visible = slide.getLocalID()===slide.getQueue().length-1? false:true;

			queue = slide.getQueue();
			if(!queue.cloudQueue){
				createCloud(queue);
			}else{
				TweenLite.set(queue.cloudQueue,{visible:true});
				changeCloudState(queue.cloudQueue,slide.getLocalID(),'visited',true);
			}
		}

		// lastSlide && lastSlide.isSubPart() && changeCloudState(lastSlide.getQueue().cloudQueue,lastSlide.getLocalID(),lastSlide.custom.state==='finish'? 'finish':'normal');

		manager.preferSound('objIn');
	}

	function changeCloudState(cloudQueue,index,state){
		let scale = cloudQueueInfo.scale;
		let cloud = cloudQueue[index];

		if(state==='normal'){
			 cloud.gotoAndStop('cloudNormal');
		}else if(state==='visited'){
			cloud.gotoAndStop('cloudVisited');
		}else if(state==='finish'){
			// cloud.gotoAndStop('cloudFinish');
		}
	}

	function createCloud(queue){
		let len = queue.length;
		let cloud
		queue.cloudQueue = new Array;
		for(let i=0;i<len;i++){
			cloud = staticCloud.clone();
			cloud.x = cloudQueueInfo.beginX + cloudQueueInfo.sumX*i;
			cloud.y = cloudQueueInfo.targY;
			cloud.scaleX = cloud.scaleY = cloudQueueInfo.scale;
			cloud.visible = true;
			queue.cloudQueue.push(cloud);
			countClouds.addChild(cloud);
			changeCloudState(queue.cloudQueue,i,'normal');
		}

		changeCloudState(queue.cloudQueue,0,'visited');
	}

	function clickControl(e) {
		if(e.target.funcName==='reset'){
			manager.resetSlide();
		}else if(e.target.funcName==='prev' || e.target.funcName==='next'){
			manager.switchSubPart(e.target.funcName);
			if(manager.isTip){
				manager.showTip('off');
				tipTab.custom.tween.reverse();
			}
		}
	}

	function quizResult(e){
		if(e.type==='correct'){
			manager.preferSound('right');
		}else if(e.type==='incorrect'){
			manager.preferSound('wrong');
		}else if(e.type==='finish'){
			manager.preferSound('right');
			manager.playFire();
			e.slide.custom.state = 'finish';
		}
	}

	course1 = p;

})();