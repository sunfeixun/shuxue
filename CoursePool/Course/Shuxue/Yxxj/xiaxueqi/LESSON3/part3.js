(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	let prevnext;
	let txt;
	let order = 0;
	let event;
	const dragCon = new createjs.Container;
	const shapes = new father.orderContent;
	const texts = ['这两个事物可以比大小吗？','这两个事物怎么样才能弄成一样大小呢？','它们是一样大的吗？','它们属于等分吗？二等分？四等分？'];

	father.loader.addLoadElement(['part3.png','part3.json'],father.lessonPath);

	p.go = function() {
		let nextCon = new createjs.Container;
		let sprite = father.loader.getSprite('part3',true);

		for(let i in sprite){
			dragCon.addChild(sprite[i]);
		}

		dragCon.cursor = 'pointer';
		dragCon.on('mousedown',drag);
		dragCon.on('pressmove',drag);

		shapes.push(align(sprite.q1a,sprite.q1b));
		shapes.push(align(sprite.q2a,sprite.q2b));
		shapes.push(align(sprite.q3a,sprite.q3b));
		shapes.push(align(sprite.q4a,sprite.q4b,sprite.q4c,sprite.q4d));
		align = null;
		shapes.init();

		txt = new father.text(texts[0],40).set({x:640,y:150,textAlign:'center',textBaseline:'middle'});

		p.addChild(nextCon,txt,dragCon);

		prevnext = new father.prevNext;

		prevnext.addTo(nextCon).set({cursor:'pointer'}).on('click',swip);

		sprite.q2a.on('click',onclick,null,false,0);
		sprite.q2b.on('click',onclick,null,false,0);

		sprite.q4a.on('click',onclick,null,false,1);
		sprite.q4b.on('click',onclick,null,false,1);
		sprite.q4c.on('click',onclick,null,false,1);
		sprite.q4d.on('click',onclick,null,false,1);

		//showContent();

		delete p.go;
	}

	function drag(e) {  
		 e.type==='mousedown'&& e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		 e.type==='pressmove'&&  e.target.set({x:e.localX,y:e.localY});
		 event = e.type;
	}

	function swip(e) {
		if(shapes.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !shapes.isHead();
		prevnext.next.visible = !shapes.isEnd();
		txt.text = texts[shapes.order];
	}

	function align() {
		let pos = arguments.length===2? [435,798]:[264,515,767,1018];
		let y = 450;
		let arr = [];
		for(let i=0;i<arguments.length;i++){
			arguments[i].set({x:pos[i],y:y});
			arr.push(arguments[i]);
		}

		return arr;
	}

	function onclick(e,mode){
		if(event==='pressmove')  return;
		if(mode===0){
			e.target.gotoAndStop(e.target.currentAnimation==='q2a'? 'q2b':'q2a');
			e.target.regX = e.target.getBounds().width/2;
			e.target.regY = e.target.getBounds().height/2;
		}else if(mode===1){
			e.target.rotation += 90;
			if(e.target.rotation===360) e.target.rotation = 0;
		}
	}
})();