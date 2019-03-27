(function() {
	let father = QuizPool;
	let p = new father.quiz(0);
	let q10 = father.quiz10;

	let jiashu1, jiashu2;
	let targCube, val;
	let selectCube;
	let rd;

	p.go = function(){
		new father.title('小朋友，请你将正确的数字拖进去吧。',p);
		father.addSplitStar(p);

		let sprite = father.loader.getSprite('QUIZ10',true);
		let y = 440;
		let instance = father.createElement([
				{type:new father.cubeNumber,attr:{x:'center-=226',y:y},instance:'jiashu1'},
				{type:'text',attr:{text:'+      =',size:60,y:y,x:'center'},center:true},
				{type:new father.cubeNumber,attr:{x:'center',y:y},instance:'jiashu2'},
				{type:new father.Cube,attr:{x:'center+=226',y:y},instance:'targCube'},
				{type:'container',instance:'dragger',on:[['mousedown',drag],['pressmove',drag],['pressup',judge]]},
				{type:new father.cubeNumber,clone:5,addTo:'dragger'}
			],father.loader,p);

		jiashu1 = instance.jiashu1;
		jiashu2 = instance.jiashu2;
		targCube = instance.targCube;

		q10.createObj(instance.jiashu1,sprite.obj1);
		q10.createObj(instance.jiashu2,sprite.obj1);

		for(let i=0;i<instance.dragger.children.length;i++){
			instance.dragger.children[i].x = q10.dragPositionX[i];
			instance.dragger.children[i].y = q10.dragPositionY;
			instance.dragger.children[i].ox = instance.dragger.children[i].x;
			instance.dragger.children[i].oy = instance.dragger.children[i].y;
			instance.dragger.children[i].value(i+1);
			q10.createObj(instance.dragger.children[i],sprite.obj1,i+1,p).visible = false;
		}

		p.reset();

		delete p.go;
	}

	p.reset = function(){
		rd = father.publicFunction.random(6);
		let n1 = jiashu1.value(), n2 = jiashu2.value();
		while(n1===jiashu1.value() && n2=== jiashu2.value()){
			n1 = father.publicFunction.random(4);
			n2 = father.publicFunction.random(5-n1);
		}

		jiashu1.value(n1);
		jiashu2.value(n2);

		q10.freshCount(jiashu1,rd);
		q10.freshCount(jiashu2,rd);

		val = n1 + n2;
		p.mouseEnabled = true;
		if(selectCube){
			selectCube.x = selectCube.ox;
			selectCube.y = selectCube.oy;
			selectCube.objContainer.visible = false;
		}
	}

	function drag(e){
		e.type === 'mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,targCube.getTransformedBounds())){
			if(e.target.value()===val){
				selectCube = e.target;
				q10.freshObj(selectCube,rd);
				e.target.objContainer.visible = true;
				e.target.x = targCube.x;
				e.target.y = targCube.y;
				p.mouseEnabled = false;
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