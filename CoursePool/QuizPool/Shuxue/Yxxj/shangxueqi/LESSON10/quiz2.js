(function() {
	let father = QuizPool;
	let p = new father.quiz(1);
	let q10 = father.quiz10;

	let jiashu1, jiashu2;
	let targCubes, val;
	let rd;
	let eles;
	let count = 0;

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
				{type:new father.cubeNumber,clone:10,addTo:'dragger'}
			],father.loader,p);

		jiashu1 = instance.jiashu1;
		jiashu2 = instance.jiashu2.hideValue();
		targCubes = [jiashu2,instance.targCube];

		q10.createObj(instance.jiashu1,sprite.obj1);
		q10.createObj(instance.jiashu2,sprite.obj1);

		for(let i=0;i<5;i++){
			initEle(instance.dragger.children[i],i);
			initEle(instance.dragger.children[i+5],i);
		}

		eles = instance.dragger.children;

		p.reset();

		delete p.go;

		function initEle(ele,val){
			ele.x = q10.dragPositionX[val];
			ele.y = q10.dragPositionY;
			ele.ox = ele.x;
			ele.oy = ele.y;
			ele.value(val+1);
			q10.createObj(ele,sprite.obj1,val+1).visible = false;
		}
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

		targCubes[0].val = n2;
		targCubes[1].val = n1 + n2;

		for(let i=0;i<eles.length;i++){
			eles[i].x = eles[i].ox;
			eles[i].y = eles[i].oy;
			eles[i].mouseEnabled = true;
			eles[i].objContainer.visible = false;
		}

		count = 0;
	}

	function drag(e){
		e.type === 'mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		for(let i=0;i<targCubes.length;i++){
			if(father.publicFunction.pointInRect(e.localX,e.localY,targCubes[i].getTransformedBounds())){
				if(e.target.value()===targCubes[i].val){
					q10.freshObj(e.target,rd);
					if(!(targCubes[i] instanceof father.cubeNumber)) e.target.objContainer.visible = true;
					e.target.x = targCubes[i].x;
					e.target.y = targCubes[i].y;
					e.target.mouseEnabled = false;
					p.dispatchEvent(father.ANSWER_CORRECT);
					count ++;
					count === targCubes.length && p.dispatchEvent(father.ANSWER_FINISH);
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