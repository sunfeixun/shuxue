(function() {
	let father = QuizPool;
	let p = new father.quiz(3);

	let cubeGroup = new father.group;
	let positions = [];
	let values = new father.group([1,4],[2,3]);
	let draggers;
	let centerRect, dynamicRect;
	let count = 0;
	let randomFrame;

	p.go = function(){
		new father.title('小朋友，请你将正确的数字拖进去吧',p);
		father.addSplitStar(p);
		let sprite = father.loader.getSprite('QUIZ9',true);
		let up = 360 - 120, down = 360 + 120, left = 'center-=150', right = 'center+=150';

		let elements = [
			{type:new father.Cube,attr:{x:'center',y:'center'},instance:'centerRect'},
			{type:new father.Cube,attr:{x:left,y:up},instance:'dynamicRect'},
			{type:new father.cubeNumber(1),attr:{x:left,y:down},instance:'num1'},
			{type:new father.cubeNumber(2),attr:{x:right,y:up},instance:'num2'},
			{type:new father.cubeNumber(3),attr:{x:right,y:down},instance:'num3'},
			{type:'container',instance:'numCon',on:[['mousedown',drag],['pressmove',drag],['pressup',judge]]},
			{type:new father.cubeNumber(1),addTo:'numCon',attr:{y:660},clone:5,instance:'arr'}
		];

		let arr, t, linedata = [], cr;

		elements = father.createElement(elements,father.loader,p);

		centerRect = elements.centerRect;
		dynamicRect = elements.dynamicRect;
		draggers = new Array().concat(elements.arr);

		arr = [elements.dynamicRect,elements.num1,elements.num2,elements.num3];
		cr = elements.centerRect;
		cubeGroup.array = new Array().concat(arr);

		for(let i=0;i<arr.length;i++){
			t = arr[i];
			positions.push([arr[i].x,arr[i].y]);
			linedata.push([t.x<cr.x? t.right()+10:t.left()-10, t.y,
							t.x<cr.x? cr.left()-10:cr.right()+10,
							t.y<cr.y? cr.y-10:cr.y+10]);
		}

		new father.Line(linedata).addTo(p);

		// 给数字方块添加物体
		let c, s;

		for(let i=1;i<=3;i++){
			t = elements['num'+i];
			c = new createjs.Container;
			for(let j=0;j<4;j++){
				s = sprite.obj1.clone();
				s.x = 70*j;
				c.addChild(s);
			}
			c.x = t.x;
			c.y = t.y;
			t.objs = p.addChild(c);
		}

		// 五个拖拽的
		
		for(let i=0;i<draggers.length;i++){
			draggers[i].x = 300 + i*170;
			draggers[i].value(i+1);
			draggers[i].ox = draggers[i].x;
			draggers[i].oy = draggers[i].y;
		}

		p.reset();

		delete p.go;
	}

	p.reset = function(){
		count = 0;
		randomFrame = father.publicFunction.random(6);
		p.mouseEnabled = true;
		let v1 = values.chooseOne(true);
		let v2 = values.array[values.array.indexOf(v1) === 0? 1:0];

		v1 = new Array().concat(v1);
		v2 = new Array().concat(v2);

		cubeGroup.randomOrder();

		for(let i=0;i<2;i++){
			setValue(cubeGroup.array[i],v1);
			setValue(cubeGroup.array[i+2],v2);
		}

		for(let i=0;i<cubeGroup.array.length;i++){
			cubeGroup.array[i].x = positions[i][0];
			cubeGroup.array[i].y = positions[i][1];
			freshObjs(cubeGroup.array[i]);
		}

		for(let i=0;i<draggers.length;i++){
			draggers[i].mouseEnabled = true;
			draggers[i].x = draggers[i].ox;
			draggers[i].y = draggers[i].oy;
		}


		function setValue(targ,vals){
			if(targ instanceof father.cubeNumber){
				targ.value(cubeGroup.chooseOne.apply(vals));
			}else{
				targ.value = cubeGroup.chooseOne.apply(vals);
			}
		}
	}


	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		let targ, val;

		if(father.publicFunction.pointInRect(e.localX,e.localY,centerRect.getTransformedBounds())){
			targ = centerRect;
			val = 5;
		}else if(father.publicFunction.pointInRect(e.localX,e.localY,dynamicRect.getTransformedBounds())){
			targ = dynamicRect;
			val = targ.value;
		}

		if(!targ){
			e.target.x = e.target.ox;
			e.target.y = e.target.oy;		
		}else if(e.target.value()===val){
			count ++;
			e.target.mouseEnabled = false;
			e.target.x = targ.x;
			e.target.y = targ.y;
			p.dispatchEvent(father.ANSWER_CORRECT);
			if(count === 2){
				p.dispatchEvent(father.ANSWER_FINISH);
				p.mouseEnabled = false;
			}
		}else{
			e.target.x = e.target.ox;
			e.target.y = e.target.oy;
			p.dispatchEvent(father.ANSWER_INCORRECT);
		};
	}

	function freshObjs(cubenum){
		if(!cubenum.objs) return;

		let n = cubenum.value();
		let con = cubenum.objs;
		let children = cubenum.objs.children;

		for(let i=0;i<children.length;i++){
			children[i].visible = i < n;
			children[i].gotoAndStop(randomFrame);
			children[i].regX = children[i].getBounds().width/2;
			children[i].regY = children[i].getBounds().height/2;
		}

		con.x = cubenum.x - con.getTransformedBounds().width/2 + children[0].getTransformedBounds().width/2;
		con.y = cubenum.y < centerRect.y? cubenum.y - 70:cubenum.y + 70;
	}
})();