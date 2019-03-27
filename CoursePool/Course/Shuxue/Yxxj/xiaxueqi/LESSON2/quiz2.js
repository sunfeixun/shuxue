let quiz2;


(function(){
	let father = projectData.courseInterface;
	let p = new father.part(4,1);

	p.regCount(3);

	father.loader.addLoadElement(['1','2','3'],father.lessonPath,'.png');

	p.go = function(){
		let quizContainer = p.addChild(new createjs.Container);

		let a = {y:157,scaleX:0.9,scaleY:0.9};

		let img1 = father.loader.getImage('1.png').set(a).set({x:870});
		let img2 = father.loader.getImage('2.png').set(a).set({x:487});
		let img3 = father.loader.getImage('3.png').set(a).set({x:104});

		let semi = new myObject.shape('semiCircle',{x:250,y:621,diameter:212,color:'#F4B4D0'});
		let trap = new myObject.shape('trapezium',{x:1025,y:563,width:262,height:115,skew:85,color:'#BAE3F9'});
		let para = new myObject.shape('parallelogram',{x:651,y:566,width:268,height:109,skew:85,color:'#FFE792'});

		center(img1,img2,img3);
		
		quizContainer.addChild(img1,img2,img3,semi,trap,para);
		semi._ly = semi.y - semi._radius/2;
		brotherLine([img3,trap],[img2,semi],[img1,para]);
		brotherLine = null;

		quizContainer.on('mousedown',draw);
		quizContainer.on('pressmove',draw);
		quizContainer.on('pressup',draw);

		let linestyle = new createjs.Graphics.StrokeStyle(2);
		p._line = quizContainer.addChild(new createjs.Shape);
		p._line.graphics.s('black').append(linestyle);

		p._lineMT = p._line.graphics.mt(0,0).command;
		p._lineLT = p._line.graphics.lt(0,0).command;
		p._shapePool = [img1,img2,img3,semi,trap,para];
		p.addChild(new father.tipOnce('请你仔细观察，有哪两个图形是一样的，把它们连起来吧')).showOut();

		delete p.go;
	}

	p.reset = function(){
		for(let i in p._shapePool){
			p._shapePool[i].mouseEnabled = true;
			p._shapePool[i]._line.visible = false;
		}
	}

	function draw(e){
		if(e.type=='mousedown'){
			p._line.visible = true;
			p._lineLT.x = p._lineMT.x = e.target.x;
			p._lineLT.y = p._lineMT.y = e.target._ly ||e.target.y;
		}else if(e.type=='pressmove'){
			p._lineLT.x = e.localX;
			p._lineLT.y = e.localY;
		}else if(e.type=='pressup'){
			p._line.visible = false;
			let glt = e.target._brother.globalToLocal(e.stageX,e.stageY);
			if(e.target._brother.hitTest(glt.x,glt.y)){
				e.target._line.visible = true;
				e.target.mouseEnabled = e.target._brother.mouseEnabled = false;
				father.preferSound('right');
				p.count();
			}else{
				father.preferSound('wrong');
			}
		}
	}

	function center(){
		let obj, bound;
		for(let i in arguments){
			bound = arguments[i].getBounds();
			obj = arguments[i];
			obj.x += obj.regX = bound.width/2;
			obj.y += obj.regY = bound.height/2;
		}
	}

	function brotherLine(){
		let _parent = arguments[0][0].parent;
		let line;
		
		for(let i in arguments){
			line = new createjs.Shape;
			line.visible = false;
			line.graphics.s('black').ss(2).mt(arguments[i][0].x,arguments[i][0].y).lt(arguments[i][1].x,arguments[i][1]._ly||arguments[i][1].y);
			_parent.addChild(line);
			arguments[i][0]._brother = arguments[i][1];
			arguments[i][1]._brother = arguments[i][0];
			arguments[i][0]._line = arguments[i][1]._line = line;
		}
	}

	quiz2 = p;
})();