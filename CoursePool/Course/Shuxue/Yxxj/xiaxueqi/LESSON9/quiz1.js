(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,0);

	let stuffTween;
	const clickArea = new createjs.Container;

	father.loader.addLoadElement(['quiz2.json','quiz2.png'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz2');
		let clickShape = new createjs.Shape(new createjs.Graphics().f('rgba(255,255,255,0.01)').r(0,0,490,120)).set({cursor:'pointer',x:136});
		let numbers  =[[3,7,9],[2,4,6],[1,5,8]];

		p.addChild(sprite.locker.set({x:110,y:115}),sprite.stuff.set({x:821,y:115}));
		stuffTween = TweenLite.from(sprite.stuff,0.7,{alpha:0});

		clickArea.addChild(
			bindAnimate(clickShape.clone().set({y:139}),numbers[0],176),
			bindAnimate(clickShape.clone().set({y:293}),numbers[1],326),
			bindAnimate(clickShape.clone().set({y:445}),numbers[2],480)
			);

		p.addChild(clickArea).set({cursor:'pointer'}).on('click',onclick);

		p.addChild(new father.tipOnce('请你根据类别填写序号。')).showOut();
		delete p.go;
	}

	p.reset = function() {
		stuffTween.restart();

		let an;

		for(let i=0;i<clickArea.children.length;i++){
			an = clickArea.children[i]._animate;
			!an.paused() && an.pause();
			an.seek(0);
		}
	}

	function bindAnimate(shape,numbers,y) {
		let txt = new father.text('',60,'#915DA2').set({y:y}), _txt;
		let _x = 303;
		shape._animate = new TimelineLite().pause();

		for(let i=0;i<numbers.length;i++){
			_txt = txt.clone().set({x:_x,text:numbers[i]})
			p.addChild(_txt);
			shape._animate.from(_txt,0.7,{alpha:0}).addPause();
			_x += 121;
		}


		return shape;
	}

	function onclick(e) {
		if(e.target._animate.paused()){
			e.target._animate.play();
			father.preferSound('click');
		}
		
	}	
})();