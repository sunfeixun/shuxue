(function() {
	let father = QuizPool;
	let p = new father.quiz(0);

	let cubes1 = new father.group, cubes2 = new father.group;
	let lines = [];
	let count = 0;

	p.go = function(){
		new father.title('请你把数量相同的两个连起来',p);
		father.read('lijie1.mp3');
		let sprite = father.loader.getSprite('QUIZ1',true,{scaleX:0.5,scaleY:0.5});
		let y1 = 250, y2 = 550;
		let elemens1 = ['daxiang','bear','yingtao'];
		let elemens2 = ['pangxie','mihoutao','banana'];
		let cube = new father.Cube({width:150,height:150,fillColor:'white'});
		let _t1, _t2;
		let quesCon = p.addChild(new createjs.Container);
		let xpos = [240,640,1040];

		for(let i=0;i<elemens1.length;i++){
			_t1 = new createjs.Container;
			_t2 = new createjs.Container;

			_t1.y = y1;
			_t2.y = y2;

			_t1.x = _t2.x = xpos[i];

			_t1.addChild(cube.clone(),sprite[elemens1[i]]);
			_t2.addChild(cube.clone(),sprite[elemens2[i]]);

			quesCon.addChild(_t1,_t2);

			cubes1.array.push(_t1);
			cubes2.array.push(_t2);
			brother(_t1,_t2);
		}

		quesCon.on('mousedown',draw);
		quesCon.on('pressmove',draw);
		quesCon.on('pressup',judge);

		p.reset();

		delete p.go;
		brother = null;
	}

	p.reset = function(){
		cubes1.freshAttr('x').set({mouseEnabled:true});
		cubes2.freshAttr('x').set({mouseEnabled:true});
		TweenLite.set(lines,{visible:false});
		count = 0;
	}

	function draw(e){
		let line = e.target.line;
		if(!line) return;

		if(e.type==='mousedown'){
			line.visible = true;
			line._mt.x = e.target.x;
			line._mt.y = e.target.y;
		}

		line._lt.x = e.localX;
		line._lt.y = e.localY;
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,e.target.brother.getTransformedBounds())){
			count ++;
			e.target.mouseEnabled = false;
			e.target.brother.mouseEnabled = false;
			e.target.line._lt.x = e.target.brother.x;
			e.target.line._lt.y = e.target.brother.y;
			p.dispatchEvent(father.ANSWER_CORRECT);
			count === lines.length && p.dispatchEvent(father.ANSWER_FINISH);
			return;
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
			e.target.line.visible = false;
		}
	}

	function brother(t1,t2){
		let line = new createjs.Shape;
		line._mt = line.graphics.s('black').ss(2).mt(0,0).command;
		line._lt = line.graphics.lt(0,0).command;
		line.visible = false;
		line.mouseEnabled = false;
		lines.push(line);

		p.addChild(line);

		t1.brother = t2;
		t2.brother = t1;

		t1.mouseChildren = t2.mouseChildren = false;

		t1.line = t2.line = line;
	}
})();