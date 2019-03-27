(function() {
	let father = projectData.courseInterface;

	let p = new father.part(1);

	let girl;
	let tipText = new father.text('小朋友们，你能拍出和她一样的节奏吗？').alignCenter().set({x:640,y:640});

	p.on('removed',function() {girl.gotoAndStop("stand")});

	father.loader.addLoadElement(['paishou.mp3','duojiao.mp3','part1.jpg','girl.png','girl.json','arrow.png'],father.lessonPath);

	p.go = function() {
		p.addChild(father.loader.getImage('part1.jpg'));

		let arrow = father.loader.getImage('arrow.png').set({scaleX:0.3,scaleY:0.3});
		let clickArea = p.addChild(new createjs.Container);
		let rect = father.getClickBoard(clickArea,{width:80,height:82}).set({x:570,y:405,cursor:'',cls:'hand'});

		girl = father.loader.getSprite('girl').stand;
		girl.framerate = 24;

		clickArea.addChild(rect.clone().set({x:687,cls:'hand'}));

//		father.getClickBoard(clickArea,{width:38,height:106}).set({x:601,y:482,cursor:'',cls:'footleft'});
//		father.getClickBoard(clickArea,{width:38,height:106}).set({x:640,y:482,cursor:'',cls:'footright'});

		p.addChild(girl.set({x:640,y:438}));

		clickArea.cursor = 'pointer';
		clickArea.on('click',onclick);

		p.addChild(arrow.clone().set({x:524,y:459,rotation:-45}));
//		p.addChild(arrow.clone().set({x:723,y:540,rotation:90}));

		delete p.go;
	}

	function onclick(e) {
		if(e.target.cls=='hand'){
			father.loader.playSound('paishou.mp3');
			if(tipText.parent===null){
				p.addChild(tipText);
				TweenLite.from(tipText,0.75,{alpha:0});
			}
			//girl.gotoAndPlay('paishou');
		}else{
			father.loader.playSound('duojiao.mp3');
			//girl.gotoAndPlay(e.target.cls);
		}
	}
})();