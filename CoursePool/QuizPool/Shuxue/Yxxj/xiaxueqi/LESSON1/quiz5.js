
(function(){
	let father = QuizPool;
	let p = new father.quiz(4);

	father.loader.add(['quiz5.png'],father.quizPath);
	let counter = 0;
	const imgGroup = new father.group, shapeGroup = new father.group;
	
	p.go = function(){
		new father.title('请将照片与图形连线',p);

		let d = {
			images:[father.loader.getImage('quiz5.png',1)],
			frames:{width:167,height:167,regX:83.5,regY:83.5,margin:1}
		}
		
		let sheet = new createjs.SpriteSheet(d);
		let sp1 = new myObject.shape('square',{x:229,y:554,diameter:120,color:'#B8DFCC'});
		let sp2 = new myObject.shape('triangle',{x:501,y:554,width:170,height:120,color:'#F6E49A'});
		let sp3 = new myObject.shape('rectangle',{x:773,y:554,width:80,height:120,color:'#E3AECE'});
		let sp4 = new myObject.shape('circle',{x:1045,y:554,diameter:120,color:'#BBE3F3'});
		p.addChild(sp1,sp2,sp3,sp4);
		shapeGroup.array.push(sp1,sp2,sp3,sp4);

		p.thick = 3;

		let _x = 229;
		let _img, _sp, _line;
		let sprite = new createjs.Sprite(sheet);
		let frames = [0,2,3,1];
		let answers = [3,1,4,2];

		for(let i=0;i<4;i++)
		{	
			img = p.addChild(sprite.clone().set({x:_x,y:250,scaleX:1,scaleY:1,forquiz:true}));
			img.gotoAndStop(frames[i]);
			_sp = eval('sp' + answers[i]);
			_sp.forquiz = true;

			img.brother = _sp;
			_sp.brother = img;

			_line = p.addChild(new createjs.Shape);
			_line.graphics.s('black').ss(p.thick,1);
			_line.mt = _line.graphics.mt(0,0).command;
			_line.lt = _line.graphics.lt(0,0).command;
			_line.mouseEnabled = false;
			_line.visible = false;
			imgGroup.array.push(img);
			img.line = _sp.line = _line;
			_x += 272;
		}

		for(i=1;i<=4;i++)
		{
			p.addChild(eval('sp'+i).line);
		}

		p.on('mousedown',drawline);
		p.on('pressmove',drawline);
		p.on('pressup',drawline);

		p.line = p.addChild(new createjs.Shape);
		sprite = null;
		sheet = null;
		p.onDown = null;

		delete p.go;
	}

	p.reset = function(){
		for(let i=0;i<imgGroup.array.length;i++){
			imgGroup.array[i].line.visible = false;
		}

		imgGroup.freshAttr('x').set({mouseEnabled:true});
		shapeGroup.freshAttr('x').set({mouseEnabled:true});
		counter = 0;
	}

	function drawline(e)
	{
		let line = e.target.line;

		if(e.type=='mousedown'){
			line.visible = true;
			line.mt.x = line.lt.x = e.target.x;
			line.mt.y = line.lt.y = e.target.y;
		}else if(e.type=='pressmove'){
			line.lt.x = e.localX;
			line.lt.y = e.localY;
		}else if(e.type=='pressup'){
			let gtl = e.target.brother.globalToLocal(e.stageX,e.stageY);
			if(e.target.brother.hitTest(gtl.x,gtl.y)){
				line.lt.x = e.target.brother.x;
				line.lt.y = e.target.brother.y;
				e.target.mouseEnabled = false;
				e.target.brother.mouseEnabled = false;
				p.dispatchEvent(father.ANSWER_CORRECT);
				counter ++;
				counter === 4 && p.dispatchEvent(father.ANSWER_FINISH);
			}else{
				line.visible = false;
				p.dispatchEvent(father.ANSWER_INCORRECT);
			}
		}
	}

})();

