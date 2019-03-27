(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,0);

	father.loader.add(['quiz1.png','quiz1.json'],father.lessonPath);
	p.regCount(4);

	const lineArr = new Array;
	let curline, Contain;

	p.go = function() {
		
		let quesNum = [40,80,50,20], ansNum = ['30+50','90-70','40+10','60-20'];
		let beginx, sumX, y;
		let sprite = father.loader.getSprite('quiz1',true);
		let withNum = new createjs.Container, _withNum;
		let txt = new father.text('',33);

		Contain = p.addChild(new createjs.Container);
		txt.set({x:0,y:6});
		beginx = 230;
		y = 177;
		sumX = 265;
		withNum.addChild(sprite.bee,txt);
		withNum.set({x:beginx,y:y});

		for(let i=0;i<4;i++){
			_withNum = withNum.clone(true);
			_withNum.getChildAt(1).text = quesNum[i].toString();
			_withNum.val = quesNum[i];
			_withNum.mouseChildren = false;
			Contain.addChild(_withNum);
			withNum.x += sumX;
		}

		beginx = 238;
		y = 528;
		sumX = 268;

		withNum = new createjs.Container;
		withNum.set({x:beginx,y:y});
		withNum.addChild(sprite.flower,txt);
		txt.set({x:5,y:5}).alignCenter();

		for(i=0;i<4;i++){
			_withNum = withNum.clone(true);
			_withNum.getChildAt(1).text = ansNum[i];
			_withNum.val = eval(ansNum[i]);
			_withNum.mouseChildren = false;
			Contain.addChild(_withNum);
			withNum.x += sumX;
		}

		let line;

		for(i=0;i<4;i++){
			line = new createjs.Shape;
			line.graphics.s('#5C81CC').ss(3);
			line.mt = line.graphics.mt(0,0).command;
			line.lt = line.graphics.lt(0,0).command;
			line.mouseEnabled = false;
			line.visible = false;
			Contain.addChildAt(line,0);
			lineArr.push(line);
		}

		Contain.on('mousedown',draw);
		Contain.on('pressmove',draw);
		Contain.on('pressup',draw);

		p.addChild(new father.tipOnce('请帮小蜜蜂采蜜吧。')).showOut();
		delete p.go;
	}

	p.reset = function(){
		for(let i=0;i<Contain.children.length;i++){
			Contain.children[i].mouseEnabled = true;
		}

		for(i=0;i<lineArr.length;i++){
			lineArr[i].set({visible:false,mouseEnabled:false});
		}
	}

	function draw(e){
		if(e.type==='mousedown'){
			for(let i=0;i<lineArr.length;i++){
				if(!lineArr[i].visible){
					curline = lineArr[i];
					curline.visible = true;
					break;
				}
			}

			if(!curline)  return;
			curline.lt.x = curline.mt.x = e.target.x;
			curline.lt.y = curline.mt.y = e.target.y;
		}else if(e.type==='pressmove'){
			if(!curline)  return;
			curline.lt.x = e.localX;
			curline.lt.y = e.localY;
		}else if(e.type==='pressup'){
			let targ = e.target.parent.getObjectUnderPoint(e.localX,e.localY,1);
			if(targ && targ!==e.target && targ.val===e.target.val){
				curline.lt.x = targ.x;
				curline.lt.y = targ.y;
				targ.mouseEnabled = e.target.mouseEnabled = false;
				p.count();
				father.preferSound('right');
			}else{
				curline.visible = false;
			}
		}
	}

})();