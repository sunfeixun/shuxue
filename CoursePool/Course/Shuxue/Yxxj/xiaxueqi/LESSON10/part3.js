(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	father.loader.add(['part3.png','part3.json'],father.lessonPath);

	const texts = ['请你将它们按从小到大的方式排整齐。','请你按照我的整理方式，把下面的整理出来吗？','你可以按什么方法整理这些食物呢？'];
	const txt = new father.text(texts[0],35).set({x:640,y:70,textAlign:'center',textBaseline:'middle'});
	const fruitCon = new createjs.Container;
	const orderArr = new father.orderContent([[],[],[]]);
	let prevnext;
	let order = 0;

	p.go = function() {
		let sprite = father.loader.getSprite('part3',true,{scaleX:0.65,scaleY:0.65});
		let prevnextCon = p.addChild(new createjs.Container);
		let i,j;


		//第一题
		let lajiao = sprite.f1.clone().set({y:566}), _lajiao;
		let lajiaoX = 292, sumX = 169;
		let scaY = [-0.3,0.3,-0.15,0,0.15];
		let clickboard = father.getClickBoard();
		let _lajiaos = [];

		p.addChildAt(clickboard,0);
		clickboard.on('click',onclick);
		orderArr.getContentAt(0).push(clickboard);
		orderArr.getContentAt(0).objs = {lajiaos:_lajiaos,clickboard:clickboard};

		for(i=0;i<5;i++){
			_lajiao = lajiao.clone().set({x:lajiaoX+i*sumX,ox:lajiaoX});
			_lajiao.scaleY += scaY[i];
			orderArr.getContentAt(0).push(_lajiao);
			p.addChild(_lajiao);
			_lajiaos.push(_lajiao);
		}

		let lajiaoTargXorder = [0,2,3,4,1];

		for(i=0;i<lajiaoTargXorder.length;i++){
			_lajiaos[lajiaoTargXorder[i]].targx = lajiaoX+i*sumX;
		}

		//第二题
		let rect = new createjs.Shape(new createjs.Graphics().s('black').ss(2).rr(0,0,1135,200,15)).set({x:72,y:121,alpha:0});
		let fpos = [[141,248,367,516],[495,674,837,982]], ys = [230,469];
		let _fruits = [['6','9','10','13'],['2','7','11','3']];
		let drager = p.addChild(new createjs.Container);
		let fruit;
		p.addChild(rect);
		orderArr.getContentAt(1).push(rect);
		drager.cursor = 'pointer';
		drager.on('mousedown',drag);
		drager.on('pressmove',drag);

		for(i=0;i<_fruits.length;i++){
			for(j=0;j<_fruits[i].length;j++){
				fruit = sprite['f'+_fruits[i][j]].clone().set({x:fpos[i][j],y:ys[i]});
				i===0? p.addChild(fruit):drager.addChild(fruit);
				orderArr.getContentAt(1).push(fruit);
			}
		}

		TweenLite.set(orderArr.getContentAt(1),{alpha:0});

		//第三题
		fpos = [[109,530],[141,646],[216,539],[330,621],[346,500],[589,650],[482,532],[599,562],[710,480],[768,634],[811,504],[953,527],[1155,630],[1040,587]];

		for(i=1;i<=14;i++){
			fruit = sprite['f'+i].clone().set({x:fpos[i-1][0],y:fpos[i-1][1],alpha:0});
			fruitCon.addChild(fruit);
			orderArr.getContentAt(2).push(fruit);
		}	

		p.addChild(fruitCon,txt);

		fruitCon.cursor = 'pointer';
		fruitCon.on('mousedown',drag);
		fruitCon.on('pressmove',drag);

		prevnext = new father.prevNext;
		prevnext.addTo(prevnextCon);
		prevnextCon.cursor = 'pointer';
		prevnextCon.on('click',swip);


		delete p.go;
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function onclick(e){
		let objs = orderArr.getContentAt(0).objs;
		objs.clickboard.mouseEnabled = false;
		TweenMax.staggerTo(objs.lajiaos,2,{cycle:{x:function(i){return objs.lajiaos[i].targx}}});
	}

	function swip(e){
		if(orderArr.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !orderArr.isHead();
		prevnext.next.visible = !orderArr.isEnd();
	}
})();