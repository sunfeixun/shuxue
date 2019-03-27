
(function(){
	let father = projectData.courseInterface;
	let p = new father.part(4,3);
	let answers = new Array;
	const limitX = [544,1005];
	const beginX = 655, sumX = 120;

	p.regCount(7,function() {p.mouseEnabled = false});

	father.loader.addLoadElement(['quiz4.png','quiz4.json'],father.lessonPath);

	p.go = function(){
		let sprite = father.loader.getSprite('quiz4',true), _sp;

		let y = 100,x = [218,480,671,862,1110,218,450,690,914,1110];
		let shapeContainer = p.addChild(new createjs.Container);
		shapeContainer.cursor = 'pointer';
		shapeContainer.on('mousedown',drag);
		shapeContainer.on('pressmove',drag);
		shapeContainer.on('pressup',drag);

		for(i=1;i<=10;i++){
			_sp = sprite['quiz4'+i];

			shapeContainer.addChild(_sp.set({y:y,x:x[i-1],scaleX:0.45,scaleY:0.45}));
			_sp.ox = _sp.x;
			_sp.oy = _sp.y;

			if(i==5){y=238}
		}

		p.addChild(sprite.quiz4text).set({x:620,y:530,scaleX:0.58,scaleY:0.58});
		p.reset();
		p.addChild(new father.tipOnce('请你看一看，哪些是扇形，哪些是梯形，哪些是平行四边形')).showOut();

		setY([9,5],[366,378]);
		setY([4,10],[510,494]);
		setY([1,3,7],[632,630,617]);

		delete p.go;


		function setY(shapeid,ys){
			let group = {added:0};

			for(let i=0;i<shapeid.length;i++){
				sprite['quiz4'+shapeid[i]].set({ansY:ys[i],group:group});
			}
		}
	}

	p.reset = function(){
		TweenLite.killTweensOf(answers);
		for(let i in answers){
			answers[i].alpha = 0;
		}
	}

	function drag(e) {
		e.target.set({x:e.localX,y:e.localY});
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.type==='pressup' && judge(e.target);
	}

	function judge(shape) {
		if(!shape.ansY || shape.x<limitX[0] || shape.x>limitX[1]) {wrong();return};
		let ansY = shape.ansY;
		if(shape.y>ansY-40 && shape.y<ansY+40){
			shape.y = ansY;
			shape.mouseEnabled = false;
			shape.x = beginX + shape.group.added*sumX;
			shape.group.added ++;
			p.count();
			father.preferSound('right');
		}else{
			wrong();
		}

		function wrong() {
			father.preferSound('wrong');
			shape.x = shape.ox;
			shape.y = shape.oy;
		}
	}

})();