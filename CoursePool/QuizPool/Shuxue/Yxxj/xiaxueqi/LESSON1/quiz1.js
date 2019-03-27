(function(){
	let father = QuizPool;
	let p = new father.quiz(0);

	father.loader.add('customShape.js',father.quizPath);

	const dragShapes = new father.group, dragTargets = new father.group;
	const pos = new father.group, scales = new father.group(0.8,0.9,1,1.1,1.2);

	p.go = function(){
		new father.title('你能找出对应的图形吗？',p);

		//创建坐标
		let beginX = 73, sumX = 87;
		for(let i=0;i<14;i++){
			pos.array.push(beginX + i*sumX);
		}

		//创建图形
		let shape;
		let shapeContainer = p.addChild(new createjs.Container);
		let datas = [['triangle','yellow'],['rectangle','#7030A0'],['triangle','red'],['circle','green'],['rectangle','red'],
					['square','blue'],['square','#7030A0'],['triangle','blue'],['triangle','green'],['circle','blue'],
					['triangle','#7030A0'],['circle','yellow'],['circle','red'],['rectangle','green']];

		let ref = {
			triangle:{width:60,height:40},
			square:{diameter:60},
			rectangle:{width:40,height:80},
			circle:{diameter:60}
		};

		let str;

		pos.array = [[1103.45,605.2],[1036.15,535.3],[983.9,654.05],[902.15,565.35],[822.1,628.35],
		[737.6,541.8],[682.45,635.25],[602.75,544.8],[506.45,590.3],[416.4,654.05],[346.4,565.35],
		[141.2,628.8],[255.95,603.95],[161.2,530.25]];

		for(let i=0;i<datas.length;i++){
			str = datas[i][0];
			ref[str].color = datas[i][1];
			shape = new myObject.shape(str,ref[str]);
			shape.x = pos.array[i][0];
			shape.y = pos.array[i][1];
			shapeContainer.addChild(shape);
			dragShapes.array.push(shape);
		}

		shapeContainer.on('mousedown',drag);
		shapeContainer.on('pressmove',drag);
		shapeContainer.on('pressup',judge);

		// 创建目标框
		let dragTarg = new createjs.Container, _dragTarg;
		let txt = new father.text('',35).alignCenter();
		let rect = new createjs.Shape;
		let rectWidth = 200, rectHeight = 253;
		let cls = [['circle','圆形'],['triangle','三角形'],['square','正方形'],['rectangle','长方形']];
		rect.graphics.s('black').ss(3).rr(0,0,rectWidth,rectHeight,10);

		rect.x = -rectWidth/2;
		rect.y = -rectHeight/2;
		txt.x = 0;
		txt.y = -170;
		txt.color = 'red';
		dragTarg.addChild(rect,txt);

		for(let i=0;i<cls.length;i++){
			_dragTarg = dragTarg.clone(true);
			_dragTarg.shapeName = cls[i][0];
			_dragTarg.getChildAt(1).text = cls[i][1];
			_dragTarg.rect = _dragTarg.getChildAt(0);
			_dragTarg.setBounds(-rectWidth/2,-rectHeight/2,rectWidth,rectHeight);
			dragTargets.array.push(_dragTarg);
			p.addChild(_dragTarg);
		}

		dragTargets.set({y:335}).sumAttr('x',200,280);

		fresh();

		delete p.go;
	}

	p.reset = function(){
		fresh();
	}

	function fresh(){
		pos.randomOrder();
		dragShapes.setAttrFromArray(['x','y'],pos.array);
		dragShapes.setAttrFromSelf({ox:'x',oy:'y'});
		dragShapes.set({mouseEnabled:true});
		dragTargets.freshAttr('x');
		for(let i=0;i<dragShapes.array.length;i++){
			dragShapes.array[i].scaleX = dragShapes.array[i].scaleY = scales.chooseOne(true);
		}
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		let curTarg;
		for(let i=0;i<dragTargets.array.length;i++){
			curTarg = dragTargets.array[i];
			if(father.publicFunction.pointInRect(e.localX,e.localY,curTarg.getTransformedBounds())){
				 if(curTarg.shapeName===e.target.shapeName){
				 	e.target.mouseEnabled = false;
				 	p.dispatchEvent(father.ANSWER_CORRECT);
				 	dragShapes.countAttr('mouseEnabled',false)==='all' && p.dispatchEvent(father.ANSWER_FINISH);
				 	return;
				 }else{
				 	p.dispatchEvent(father.ANSWER_INCORRECT);
				 }
			}
		}

		e.target.x = e.target.ox;
		e.target.y = e.target.oy;
	}
})();