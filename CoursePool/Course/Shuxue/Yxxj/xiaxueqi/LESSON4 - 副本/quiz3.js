
(function(){
	let father = projectData.courseInterface;


	let p = new father.part(4,2);
	let sprite;
	let tableShape = new createjs.Shape;
	let tableContainer = new createjs.Container;

	father.loader.addLoadElement(['quiz3.png','quiz3.json'],father.lessonPath);
	//BaseFunc.regCounter(p,12);

	p.go = function(){
		sprite = father.loader.getSprite('quiz3',true);
		tableShape.graphics.f('rgba(255,255,255,0.01)').r(-95,-38,190,76);

		for(let i in sprite){
			sprite[i].scaleX = sprite[i].scaleY = 0.85;
		}

		p.addChild(sprite.bg.set({x:640,y:360}));

		orderShape('trian',400);
		orderShape('circle',480);
		orderShape('rect',558);
		orderShape('square',635);

		p.addChild(tableContainer).set({cursor:'pointer'}).on('click',clicktable);
		p.reset();

		p.addChild(new father.tipOnce('请你找出图中规律后，接着往下画')).showOut();

		sprite = null;
		tableShape = null;
		orderShape = null;
		delete p.go;
	}

	p.reset = function(){
		for(let i in tableContainer.children){
			TweenLite.getTweensOf(tableContainer.children[i]._targ).length && TweenLite.killTweensOf(tableContainer.children[i]._targ)
			tableContainer.children[i]._targ.alpha = 0;
			tableContainer.children[i].mouseEnabled = true;
		}
	}

	function clicktable(e){
		//BaseFunc.count(p);
		e.target.mouseEnabled = false;
		TweenLite.to(e.target._targ,1,{alpha:1});
		father.preferSound('right');
	}


	function orderShape(shape,y){
		let x = [550,736,927];
		let _sp;
		let attr = {};
		for(let i =0;i<3;i++){
			attr.x = x[i];
			attr.y = y;
			_sp = sprite[shape].clone().set(attr);
			attr._targ = _sp;
			tableContainer.addChild(tableShape.clone().set(attr));
			p.addChild(_sp);
		}
	}
})();