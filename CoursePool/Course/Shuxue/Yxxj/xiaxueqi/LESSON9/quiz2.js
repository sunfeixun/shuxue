(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,1);

	const linePool = [], inlinePool = [];
	const stuffs = [];
	let curline;

	p.regCount(5);
	p._autoReset = true;
	father.loader.addLoadElement(['quiz3.png','quiz3.json'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz3',true);
		let _x = 199;
		let eletric;

		for(let i=1;i<=5;i++){
			p.addChild(sprite['stuff'+i].set({y:149,x:_x}));
			stuffs.push(sprite['stuff'+i]);
			_x += 225;

			eletric = (i!==3&&i!==5)? sprite.eletric : sprite.noeletric;
			match(sprite['stuff'+i],eletric);
		}

		p.addChild(sprite.eletric.set({x:383,y:609}),sprite.noeletric.set({x:871,y:609}));

		p.on('mousedown',draw);
		p.on('pressmove',draw);
		p.on('pressup',draw);

		match = null;		

		p.addChild(new father.tipOnce('请你根据类别进行连线。')).showOut();
		delete p.go;
	}

	p.reset = function() {

		for(let i=0;i<stuffs.length;i++){
			stuffs[i].mouseEnabled = true;
		}

		while(inlinePool.length){
			linePool.push(inlinePool.pop().set({visible:false}));
		}
		curline = undefined;
	}

	function draw(e){
		if(linePool.length==0 && curline===undefined){
			return;
		}

		if(e.type=='mousedown'){
			takeLine();
			if(curline){
				curline._lt.x = curline._mt.x = e.target.x;
				curline._lt.y = curline._mt.y = e.target.y;				
			}
		}else if(e.type=='pressmove'){
			curline._lt.x = e.localX;
			curline._lt.y = e.localY;
		}else if(e.type=='pressup'){
			if(e.target._eletric){
				if(father.hitTestObject(e.target._eletric,e.stageX,e.stageY)){
					curline._lt.x = e.target._eletric.x;
					curline._lt.y = e.target._eletric.y;
					e.target.mouseEnabled = false;
					father.preferSound('right');
					p.count();
					return;
				}
			}else if(e.target._stuffs){
				for(let i=0;i<e.target._stuffs.length;i++){
					if(father.hitTestObject(e.target._stuffs[i],e.stageX,e.stageY) && e.target._stuffs[i].mouseEnabled){
						curline._lt.x = e.target._stuffs[i].x;
						curline._lt.y = e.target._stuffs[i].y;
						e.target._stuffs[i].mouseEnabled = false;
						p.count();
						father.preferSound('right');
						return;
					}
				}
			}

			putLine();
		}
	}

	function takeLine(){
		if(linePool.length==0){
			curline = undefined;
			return;
		}
		curline = linePool.pop();
		inlinePool.push(curline);
		curline.visible = true;
	}

	function putLine(){
		inlinePool.splice(inlinePool.indexOf(curline),1);
		linePool.push(curline);
		curline.visible = false;
		curline = undefined;
	}

	function match(stuff,eletric){
		let line = new createjs.Shape;
		line.graphics.s('#5C81CC').ss(3);
		line._mt = line.graphics.mt(0,0).command;
		line._lt = line.graphics.lt(0,0).command;
		line.visible = false;
		linePool.push(line);
		p.addChild(line);
		p.setChildIndex(line,0);

		eletric._stuffs = eletric._stuffs || new Array;
		eletric._stuffs.push(stuff);

		stuff._eletric = eletric;
	}	
})();