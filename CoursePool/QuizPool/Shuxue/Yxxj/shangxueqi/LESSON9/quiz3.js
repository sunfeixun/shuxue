(function() {
	let father = QuizPool;
	let p = new father.quiz(2);

	let topObj = new father.group;
	let bottomObj = new father.group;
	let ansGroup = new father.group;
	let dynamicAns;
	let targRect;
	let draggers;

	p.go = function(){
		new father.title('小朋友，请你将正确的数字拖进去吧。',p);
		father.addSplitStar(p);

		let sprite = father.loader.getSprite('QUIZ9',true);
		let a1, a2, a3;

		let elements = [
			{type:sprite.obj1,clone:5,instance:'topobj',center:true},
			{type:sprite.obj1,clone:4,instance:'bottomobj'},
			{type:new father.cubeNumber(5),attr:{x:'center',y:250},instance:'ques'},
			{type:new father.Cube,attr:{x:'center-=150',y:480},instance:'ans1'},
			{type:new father.cubeNumber(2),attr:{x:'center+=150',y:480},instance:'ans2'},
			{type:'container',instance:'numCon',on:[['mousedown',drag],['pressmove',drag],['pressup',judge]]},
			{type:new father.cubeNumber(1),addTo:'numCon',attr:{y:660,x:200},clone:5,instance:'arr'}
		];

		elements = father.createElement(elements,father.loader,p);

		a1 = elements.ques;
		a2 = elements.ans1;
		a3 = elements.ans2;
		topObj.array = elements.topobj;
		bottomObj.array = elements.bottomobj;

		new father.Line([[a1.x-10,a1.bottom()+10,a2.x,a2.top()-10],[a1.x+10,a1.bottom()+10,a3.x,a3.top()-10]]).addTo(p);
		topObj.set({y:a1.top()-50}).sumAttr('x',428,106);

		ansGroup.array = [a2,a3];
		dynamicAns = a3;
		targRect = a2;
		bottomObj.sumAttr('x',0,106);
		bottomObj.con = bottomObj.mergeInContainer(p);
		bottomObj.con.y = dynamicAns.y + 70;

		for(let i=0;i<elements.arr.length;i++){
			elements.arr[i].x = 300 + i*170;
			elements.arr[i].value(i+1);
			elements.arr[i].ox = elements.arr[i].x;
			elements.arr[i].oy = elements.arr[i].y;
		}

		draggers = elements.arr;

		p.setChildIndex(elements.numCon,p.numChildren-1);

		fresh();

		delete p.go;
	}

	p.reset = function(){
		p.mouseEnabled = true;
		for(let i=0;i<draggers.length;i++){
			draggers[i].x = draggers[i].ox;
			draggers[i].y = draggers[i].oy;
		}
		fresh();
	}

	function fresh(){
		let n = father.publicFunction.random(6);
		let v = dynamicAns.value(father.publicFunction.random(4));
		ansGroup.freshAttr('x');
		bottomObj.set({visible:false});

		randomGo(topObj.array);
		randomGo(bottomObj.array);

		for(let i=0;i<v;i++){
			bottomObj.array[i].visible = true;
		}
		bottomObj.con.x = dynamicAns.x - bottomObj.con.getTransformedBounds().width/2 + bottomObj.array[0].getTransformedBounds().width/2;
	
		function randomGo(arr){
			for(let i=0;i<arr.length;i++){
				arr[i].gotoAndStop(n);
				arr[i].regX = arr[i].getBounds().width/2;
				arr[i].regY = arr[i].getBounds().height/2;
			}
		}

	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,targRect.getTransformedBounds())){
			if(e.target.value() === 5 - dynamicAns.value()){
				p.mouseEnabled = false;
				e.target.x = targRect.x;
				e.target.y = targRect.y;
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