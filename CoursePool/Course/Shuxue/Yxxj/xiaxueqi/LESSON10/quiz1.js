(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,0);

	const objs = new Array;
	father.loader.add(['quiz1.png','quiz1.json'],father.lessonPath);
	p.regCount(3);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz1',true);
		let xs = [278,640,1001], y1 = 175, y2 = 600;
		let _targ;
		let targsOrder = ['2','3','1'];

		for(let i=1;i<=3;i++){
			p.addChild(sprite['obj'+i]).set({x:xs[i-1],y:y1});
			_targ = sprite['targ'+targsOrder[i-1]];
			p.addChild(_targ).set({x:xs[i-1],y:y2});
			Brother(sprite['obj'+i],sprite['targ'+i]);
			objs.push(sprite['obj'+i]);
		}

		p.on('mousedown',draw);
		p.on('pressmove',draw);
		p.on('pressup',draw);

		function Brother(obj,targ) {
			let line = new createjs.Shape;
			line.graphics.s('#F59DD2').ss(2);
			line._mt = line.graphics.mt(0,0).command;
			line._lt = line.graphics.lt(0,0).command;
			line.visible = false;

			obj._line = targ._line = line;
			p.addChild(line);
			p.setChildIndex(line,0);

			obj.brother = targ;
			targ.brother = obj;
		}

		p.addChild(new father.tipOnce('请你帮垃圾找出对应的垃圾桶并连线。')).showOut();
		delete p.go;
	}

	p.reset = function() {
		for(let i=0;i<objs.length;i++){
			objs[i].mouseEnabled = true;
			objs[i].brother.mouseEnabled = true;
			objs[i]._line.visible = false;
		}
	}

	function draw(e) {
		if(!e.target._line){
			return;
		}
		let line = e.target._line;

		if(e.type=='mousedown'){
			line.visible = true;
			line._lt.x = line._mt.x = e.target.x;
			line._lt.y = line._mt.y = e.target.y;
		}else if(e.type=='pressmove'){
			line._lt.x = e.localX;
			line._lt.y = e.localY;
		}else if(e.type=='pressup'){
			if(father.hitTestObject(e.target.brother,e.stageX,e.stageY)){
				e.target.mouseEnabled = false;
				e.target.brother.mouseEnabled = false;
				p.count();
				father.preferSound('right');
			}else{
				line.visible = false;
			}

		}
	}

})();