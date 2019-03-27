
(function(){
	let father = projectData.courseInterface;
	let p = new father.part(4,2);
	p.regCount(4);

	father.loader.addLoadElement(['quiz3.png'],father.lessonPath);

	p.tipText = '请将照片与图形连线';
	
	p.go = function(){
		let d = {
			images:[father.loader.getImage('quiz3.png',1)],
			frames:{width:167,height:167,regX:83.5,regY:83.5,margin:1}
		}
		
		let sheet = new createjs.SpriteSheet(d);
		let sp1 = new myObject.shape('square',{x:229,y:554,diameter:120,color:'#B8DFCC'});
		let sp2 = new myObject.shape('triangle',{x:501,y:554,width:170,height:120,color:'#F6E49A'});
		let sp3 = new myObject.shape('rectangle',{x:773,y:554,width:80,height:120,color:'#E3AECE'});
		let sp4 = new myObject.shape('circle',{x:1045,y:554,diameter:120,color:'#BBE3F3'});
		p.addChild(sp1,sp2,sp3,sp4);

		p.thick = 3;

		let _x = 229;
		let _img, _sp, _line;
		let sprite = new createjs.Sprite(sheet);
		let frames = [0,2,3,1];
		let answers = [3,1,4,2];

		for(let i=0;i<4;i++)
		{	
			img = p.addChild(sprite.clone().set({x:_x,y:191,scaleX:1,scaleY:1,forquiz:true}));
			img.gotoAndStop(frames[i]);
			_sp = eval('sp' + answers[i]);
			_sp.forquiz = true;

			img.brother = _sp;
			_sp.brother = img;

			_line = p.addChild(new createjs.Shape);
			_line.graphics.s('black').ss(p.thick,1).mt(img.x,img.y).lt(_sp.x,_sp.y);
			_line.visible = false;
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

		p.addChild(new father.tipOnce('请你把相应的图形连起来吧！')).showOut();
		delete p.go;
	}

	p.reset = function(){
		let child;

		for(let i =0;i<p.numChildren;i++){
			child = p.getChildAt(i);
			child.forquiz? child.disable=false:child.visible = false;
		}

		p.line.visible = true;
		p.onDown = null;
	}

	function drawline(e)
	{
		if(e.target.disable || !e.target.forquiz)
		{
			return;
		}

		if(e.type=='mousedown'){
			p.onDown = e.target;
		}else if(e.type=='pressmove'){
			p.line.graphics.c().s('black').ss(p.thick,1).mt(p.onDown.x,p.onDown.y).lt(e.localX,e.localY);
		}else if(e.type=='pressup'){
			p.line.graphics.c();
			let gtl = p.onDown.brother.globalToLocal(e.stageX,e.stageY);
			if(p.onDown.brother.hitTest(gtl.x,gtl.y)){
				p.onDown.disable = true;
				p.onDown.brother.disable = true;
				p.onDown.line.visible = true;
				father.preferSound('right');
				p.count();
			}else{
				father.preferSound('wrong');
			}
		}
	}

})();

