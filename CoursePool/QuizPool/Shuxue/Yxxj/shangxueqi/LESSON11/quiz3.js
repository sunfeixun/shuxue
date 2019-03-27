(function() {
	let father = QuizPool;
	let p = new father.quiz(2);

	let q1, q2;
	let cn1, cn2, cn3, dragger;
	let targs;
	let count = 0;

	p.go = function(){
		new father.title('小朋友，请你将正确的数字拖进去吧。',p);
		father.addSplitStar(p);
		let sprite = father.Sprite();

		let instance = father.createElement([
				{type:sprite.b2.clone(),attr:{x:'center-=250',y:300},instance:'q1'},
				{type:sprite.b2.clone(),attr:{x:'center+=250',y:300},instance:'q2'},
				{type:sprite.arrow.clone(),attr:{x:'center',y:300}},
				{type:'text',center:true,attr:{text:'-       =',x:'center',y:520,size:60}},
				{type:new father.cubeNumber(1),attr:{x:'center-=230',y:520},instance:'cn1'},
				{type:new father.cubeNumber(1),attr:{x:'center',y:520},instance:'cn2'},
				{type:new father.Cube,attr:{x:'center+=230',y:520},instance:'cn3'}
			],father.loader,p);

		dragger = father.buildDragger(3);
		p.addChild(dragger).on('pressup',judge);

		q1 = instance.q1;
		q2 = instance.q2;
		cn1 = instance.cn1;
		cn2 = instance.cn2;
		cn3 = instance.cn3;

		cn1.hideValue();
		cn2.hideValue();
		targs = [cn1,cn2,cn3];

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
		cn3.val = n1 - n2;
		q1.gotoAndStop('b'+n1);
		q2.gotoAndStop('b'+n2);
		count = 0;
	}

	function judge(e){
		let v;
		for(let i=0;i<targs.length;i++){
			if(father.publicFunction.pointInRect(e.localX,e.localY,targs[i].getTransformedBounds())){
				v = targs[i] instanceof father.cubeNumber? targs[i].value():targs[i].val;
				if(e.target.value()===v){
					e.target.mouseEnabled = false;
					e.target.x = targs[i].x;
					e.target.y = targs[i].y;
					count ++;
					p.dispatchEvent(father.ANSWER_CORRECT);
					count === targs.length && p.dispatchEvent(father.ANSWER_FINISH);
					return;
				}else{
					p.dispatchEvent(father.ANSWER_INCORRECT);
					break;
				}
			}
		}

		e.target.x = e.target.ox;
		e.target.y = e.target.oy;
	}
})();