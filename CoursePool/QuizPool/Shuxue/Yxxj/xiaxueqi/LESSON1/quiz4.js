
(function(){
	let father = QuizPool;
	let p = new father.quiz(3);

	father.loader.add(['house.png'],father.quizPath);
	father.loader.add('customShape.js',father.quizPath);

	let counter = 0;
	const shiftY = 50;

	p.go = function(){
		new father.title('请找出图中的形状并拖到横线上',p);

		p.addChild(father.loader.getImage('house').set({x:21,y:136}));

		let circleStage = new createjs.Container;

		circleStage.addChild(
			new myObject.shape('circle',{diameter:39,x:642,y:350,color:'white'}),
			new myObject.shape('circle',{diameter:20,x:626,y:390,color:'white'})
			);

		let squa = new myObject.shape('square',{diameter:34,color:'white'});
		let squareStage = new createjs.Container;

		squareStage.addChild(
			squa.clone().set({x:537,y:347}),
			squa.clone().set({x:573,y:347}),
			squa.clone().set({x:537,y:387}),
			squa.clone().set({x:573,y:387}),

			squa.clone().set({x:702,y:347}),
			squa.clone().set({x:738,y:347}),
			squa.clone().set({x:702,y:387}),
			squa.clone().set({x:738,y:387}),
			);

		let trian = new myObject.shape('triangle',{height:22.8,width:28.4,color:'rgba(244,216,162,.01)'});
		let triangleStage = new createjs.Container;

		let rec = new myObject.shape('rectangle',{width:28,height:56,color:'rgba(244,216,162,.01)'});
		let rectangleStage = new createjs.Container;

		trian.graphics.s('#E60012').ss(1,1,1);
		trian.updater();
		rec.graphics.s('#E60012').ss(1,1,1);
		rec.updater();

		let _x = 43.8;
		for(let i =1;i<=24;i++)
		{
			if(i==13){_x=825.05};
			triangleStage.addChild(trian.clone().set({x:_x,y:382.55,_width:28.4,_height:22.8}));
			rectangleStage.addChild(rec.clone().set({x:_x,y:421.2}));
			_x += 37.45;
		}

		triangleStage.addChild(new myObject.shape('triangle',{width:94,height:36,x:642,y:262,color:'red'},{alpha:.01}));

		p.shapeStage = [circleStage,squareStage,triangleStage,rectangleStage];


		circleStage.dragShape = new myObject.shape('circle',{diameter:100,color:'blue'},{dropY:605});
		squareStage.dragShape = new myObject.shape('square',{diameter:34,color:'blue'});
		triangleStage.dragShape = new myObject.shape('triangle',{width:28,height:23,color:'blue'});
		rectangleStage.dragShape = new myObject.shape('rectangle',{width:28,height:59,color:'blue'},{dropY:600});

		for(let i=0;i<p.shapeStage.length;i++)
		{
			p.addChild(p.shapeStage[i]);
			p.shapeStage[i].cursor = 'pointer';
			p.shapeStage[i].on('mousedown',drag);
			p.shapeStage[i].on('pressmove',drag);
			p.shapeStage[i].on('pressup',drag);
			p.shapeStage[i].addChild(p.shapeStage[i].dragShape.set({visible:false}));
		}

		let txt = new createjs.Text('有','50px Kaiti');
		let line = new createjs.Shape;
		line.graphics.s('#6C9BD2').ss(2,1).mt(48,47).lt(200,47);

		let _t = new createjs.Container;
		_t.addChild(txt,line);
		_t.y = 586;
		p.judgeStages = new Array;

		_x = 100;
		for(let i=1;i<=4;i++)
		{
			p.judgeStages.push(p.addChild(_t.clone(true).set({x:_x})));
			_x += 292;
		}

		_t.removeAllChildren();
		_t = null;
		

		delete p.go;
	}

	p.reset = function(){
		for(let i=0;i<4;i++)
		{
			p.judgeStages[i].judged = false;
			p.shapeStage[i].dragShape.visible = false;
			p.shapeStage[i].mouseEnabled = true;
		}

		counter = 0;
	}

	function drag(e)
	{
		let dragshape = e.currentTarget.dragShape;
		if(e.type=='mousedown'){
			dragshape.visible = true;
			if(e.target._radius){
				dragshape.scaleX = dragshape.scaleY = e.target._radius / dragshape._radius;
			}else if(e.target._width){
				dragshape.scaleX = e.target._width / dragshape._width;
				dragshape.scaleY = e.target._height / dragshape._height;
			}
			dragshape.x = e.localX;
			dragshape.y = e.localY;
		}else if(e.type=='pressmove'){
			dragshape.x = e.localX;
			dragshape.y = e.localY;
		}else if(e.type=='pressup'){
			dragshape.visible = false;
			judge(dragshape);
		}
	}

	function judge(s)
	{
		for(let i=0;i<p.judgeStages.length;i++){
			if(!p.judgeStages[i].judged && s.x>p.judgeStages[i].x && s.x<p.judgeStages[i].x+250 && s.y>p.judgeStages[i].y-10 && s.y<p.judgeStages[i].y+50){
				s.parent.mouseEnabled = false;
				s.visible = true;
				s.x = p.judgeStages[i].x + 125;
				s.y = s.dropY || 607;
				p.dispatchEvent(father.ANSWER_CORRECT);
				counter ++;
				counter === 4 && p.dispatchEvent(father.ANSWER_FINISH);
				return;
			}
		}
	}

})();