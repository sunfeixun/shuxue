(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,1);

	let sprite;
	let range = 20;
	let objContainer = new createjs.Container;

	father.loader.addLoadElement(['quiz2.png','quiz2.json'],father.lessonPath);
	p.regCount(4);

	p.go = function() {
		sprite = father.loader.getSprite('quiz2',true);

		p.addChild(objContainer).set({cursor:'pointer'}).on('click',clickobj);
		addKnifeAnimate(objContainer.addChild(sprite.binggan1.set({x:377,y:241,scaleX:0.64,scaleY:0.64})),2);
		addKnifeAnimate(objContainer.addChild(sprite.binggan2.set({x:917,y:231,scaleX:0.61,scaleY:0.61})),1);
		addKnifeAnimate(objContainer.addChild(sprite.xigua.set({x:377,y:543,scaleX:0.61,scaleY:0.61})),1);
		addKnifeAnimate(objContainer.addChild(sprite.binggan3.set({x:917,y:556,scaleX:0.53,scaleY:0.53})),2);
		
		sprite = null;
		p.addChild(new father.tipOnce('请将下面的食物等分切开吧！')).showOut();

		delete p.go;
	}
	p.reset = function(){
		for(let i in objContainer.children){
			objContainer.children[i].mouseEnabled = true;
			objContainer.children[i]._animate.pause().seek(0);
		}
	}

	function clickobj(e){
		e.target.mouseEnabled = false;
		e.target._animate.restart();
	}

	function addKnifeAnimate(obj,mode){
		let knife = sprite.knife.clone();
		let graphic = new createjs.Graphics().s('black').ss(2);
		let line1, line2;
		let duration = 2;
		let lt1, lt2;
		let w = obj.getTransformedBounds().width/2, h = obj.getTransformedBounds().height/2;
		knife.set({scaleX:0.33,scaleY:0.33,regX:2,regY:2,x:obj.x,y:obj.y-h-range});
		
		line1 = new createjs.Shape(graphic.clone());
		lt1 = line1.graphics.mt(obj.x,obj.y-h-range).lt(obj.x,obj.y+h+range).command;
		obj._animate = new TimelineLite().set([knife,line1],{}).pause().set([knife,line1],{visible:true}).call(playsound).to(knife,duration,{y:obj.y+h+range}).from(lt1,duration,{y:obj.y-h-range},'-='+duration);
		p.addChild(line1);

		if(mode==2){
			line2 = new createjs.Shape(graphic.clone());
			lt2 = line2.graphics.mt(obj.x-w-range,obj.y).lt(obj.x+w+range,obj.y).command;
			obj._animate.set(knife,{x:obj.x-w-range,y:obj.y,delay:duration/2}).call(playsound).to(knife,duration,{x:obj.x+w+range}).from(lt2,duration,{x:obj.x-w-range},'-='+duration);
			p.addChild(line2);
		}

		obj._animate.eventCallback('onComplete',onComp);

		p.addChild(knife);
	}

	function playsound() {
		father.preferSound('objIn');
	}

	function onComp(){
		p.count();
	}

})();