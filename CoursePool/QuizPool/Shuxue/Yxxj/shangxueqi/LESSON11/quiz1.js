(function() {
	let father = QuizPool;
	let p = new father.quiz(0);

	let q1, q2;
	let cn1, cn2, cn3, dragger;

	p.go = function(){
		new father.title('小朋友，请你将正确的数字拖进去吧。',p);
		father.addSplitStar(p);
		let sprite = father.Sprite();

		let instance = father.createElement([
				{type:sprite.ha2.clone(),attr:{x:'center-=250',y:300},instance:'q1'},
				{type:sprite.hb2.clone(),attr:{x:'center+=250',y:300},instance:'q2'},
				{type:sprite.arrow.clone(),attr:{x:'center',y:300}},
				{type:'text',center:true,attr:{text:'-       =',x:'center',y:520,size:60}},
				{type:new father.cubeNumber(1),attr:{x:'center-=230',y:520},instance:'cn1'},
				{type:new father.cubeNumber(1),attr:{x:'center',y:520},instance:'cn2'},
				{type:new father.Cube,attr:{x:'center+=230',y:520},instance:'cn3'}
			],father.loader,p);

		dragger = father.buildDragger();
		p.addChild(dragger).on('pressup',judge);

		q1 = instance.q1;
		q2 = instance.q2;
		cn1 = instance.cn1;
		cn2 = instance.cn2;
		cn3 = instance.cn3;

		p.reset();

		delete p.go;
	}

	p.reset = function(){
		dragger._rs();
		let n1 = cn1.value();
		let n2 = cn2.value();
		
		while(n1===cn1.value()&&n2===cn2.value()){
			n1 = father.publicFunction.random(2,5);
			n2 = father.publicFunction.random(n1-1);
		}

		cn1.value(n1);
		cn2.value(n2);
		q1.gotoAndStop('ha'+n1);
		q2.gotoAndStop('hb'+n2);
		p.mouseEnabled = true;
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,cn3.getTransformedBounds())){
			if(e.target.value()===cn1.value()-cn2.value()){
				p.mouseEnabled = false;
				e.target.x = cn3.x;
				e.target.y = cn3.y;
				p.dispatchEvent(father.ANSWER_CORRECT);
				p.dispatchEvent(father.ANSWER_FINISH);
				return;
			}else{
				p.dispatchEvent(father.ANSWER_INCORRECT);
			}
		}
		e.target.x = e.target.ox;
		e.target.y = e.target.oy;
	}
})();