(function() {

	let father = projectData.courseInterface;
	let p = new father.part(4,2);
	const personPool = new Array, objPool = new Array;

	p.regCount(3);

	father.loader.addLoadElement(['quiz4.json','quiz4.png'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz4',true);
		let personX = 320, objX = 985, y = 133, sumY = 239;
		let orders = ['3','1','2'];

		for(let i=1;i<=3;i++){
			p.addChild(sprite['person'+i].set({x:personX,y:y}));
			p.addChild(sprite['obj'+orders[i-1]].set({x:objX,y:y}));

			personPool.push(sprite['person'+i]);
			objPool.push(sprite['obj'+orders[i-1]]);

			match(sprite['person'+i],sprite['obj'+i]);
			y += sumY;
		}

		p.on('mousedown',draw);
		p.on('pressmove',draw);
		p.on('pressup',draw);

		match = null;
		sprite = null;

		p.reset();		

		p.addChild(new father.tipOnce('请你选出谁最适合使用')).showOut();
		delete p.go;
	}

	p.reset = function() {
		for(let i=0;i<personPool.length;i++){

			personPool[i].mouseEnabled = true;
			objPool[i].mouseEnabled = true;

			personPool[i]._line.visible = false;
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
				line._lt.x = e.target.brother.x;
				line._lt.y = e.target.brother.y;
				p.count();
				father.preferSound('right');
				return;
			}

			line.visible = false;
		}
	}

	function match(person,obj){
		let line = new createjs.Shape;
		line.graphics.s('#5C81CC').ss(2);
		line._mt = line.graphics.mt(0,0).command;
		line._lt = line.graphics.lt(0,0).command;
		line.visible = false;

		person.brother = obj;
		obj.brother = person;
		person._line = obj._line = line;

		p.addChild(line);
		p.setChildIndex(line,0);
	}

})();