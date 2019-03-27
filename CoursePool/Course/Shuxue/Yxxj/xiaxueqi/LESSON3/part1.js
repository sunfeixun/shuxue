(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['boyEye.png','boyEye.json','others.png','others.json'],father.lessonPath);
	let boyEye, others;
	const animateCon = new createjs.Container;
	const timeline = new TimelineLite;
	let resetAnimate;

	p.custom.noFade = true;

	p.go = function() {
		//人物动画
		let boyMove = father.loader.getResult('boyEye.json');
		let eyeRoll;
		boyMove.images[0] = father.lessonPath + boyMove.images[0];
		boyMove.framerate = 25
		boyMove = new createjs.Sprite(new createjs.SpriteSheet(boyMove));
		eyeRoll = boyMove.clone();

		boyMove.gotoAndStop('boyMove');
		eyeRoll.gotoAndStop('eyeRoll');

		setWidth(boyMove,174).set({x:532,y:269});
		setWidth(eyeRoll,71).set({x:586,y:332}).gotoAndPlay('eyeRoll');

		animateCon.addChild(boyMove,eyeRoll);

		//桥和问号和箱子
		let cubes = father.loader.getSprite('others');
		let cubArr = [];
		let bridge = father.loader.getResult('others.json'), ques;
		bridge.images[0] = father.lessonPath + bridge.images[0];
		bridge = new createjs.Sprite(new createjs.SpriteSheet(bridge));
		ques = bridge.clone();

		bridge.gotoAndPlay('bridgeWiggle');
		ques.gotoAndPlay('quesWiggle');

		setWidth(bridge,613).set({x:346,y:29,framerate:25});
		setWidth(ques,59).set({x:727,y:248,framerate:8});

		setWidth(cubes.cube1,171,cubArr).set({x:292,y:362});
		setWidth(cubes.cube2,133,cubArr).set({x:309,y:457});
		setWidth(cubes.cube3,160,cubArr).set({x:830,y:266});
		setWidth(cubes.cube4,224,cubArr).set({x:802,y:372});
		

		for(let i=cubArr.length-1;i>=0;i--){
			animateCon.addChild(cubArr[i]);
		}

		animateCon.addChild(bridge,ques);


		father.getClickBoard(p).on('click',onclick);



		p.addChild(animateCon);

		//小人手里拿着的箱子
		let finalCube = cubes.cube2.clone().set({x:590,y:424,visible:false}),_finalcube;

		timeline.pause();
		timeline.to(ques,0.75,{alpha:0}).to(cubes.cube1,1,{x:'-=150',alpha:0},'+=1');

		_finalcube = animateCon.addChild(finalCube.clone());
		timeline.to(_finalcube,0.75,{x:309,y:370,visible:true},'+=0.5').call(controlBridge,[bridge,0]);

		timeline.to(cubes.cube4,0.75,{x:'+=150',alpha:0},'+=0.5');
		_finalcube = animateCon.addChild(finalCube.clone());
		timeline.to(_finalcube,0.75,{x:879,y:469,visible:true},'+=0.5');

		timeline.to(cubes.cube3,0.75,{x:'+=150',alpha:0},'+=0.5');
		_finalcube = animateCon.addChild(finalCube.clone());
		timeline.to(_finalcube,0.75,{x:879,y:376,visible:true},'+=0.5').call(function(){boyMove.gotoAndPlay('boyMove');},null,null,'-=0.6').call(controlBridge,[bridge,1]);

		animateCon.setChildIndex(bridge,animateCon.numChildren-1);

		resetAnimate = function(){
			bridge.gotoAndPlay('bridgeWiggle');
			boyMove.gotoAndStop('boyMove');
			ques.gotoAndPlay('quesWiggle');
		}

		delete p.go;

		function onclick(){
			eyeRoll.stop();
			eyeRoll.visible = false;
			ques.stop();
			timeline.play();
			p.mouseEnabled = false;
		}
	}

	p.reset = function(){
		p.mouseEnabled = true;
		timeline.restart();
		!timeline.paused() && timeline.pause();
		resetAnimate();
	}

	function test(e){
		e.type=='pressmove' && e.target.set({x:e.localX,y:e.localY});
		e.type=='pressup' && console.log(e.localX,e.localY);
	}

	function setWidth(obj,width,addto){
		obj.scaleX = obj.scaleY = width/obj.getBounds().width;
		addto && addto.push(obj);
		return obj;
	}

	function controlBridge(bridge,mode){
		if(mode===0){
			bridge.gotoAndStop('bridgeMove');
		}else if(mode===1){
			bridge.gotoAndPlay('bridgeMove');
		}
	}

})();