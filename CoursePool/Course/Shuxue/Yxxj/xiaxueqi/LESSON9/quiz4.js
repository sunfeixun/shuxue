(function() {
	return;
	let father = projectData.courseInterface;
	let p = new father.part(4,0);
	let timeline;

	father.loader.addLoadElement(['fish.png','quiz1.png','quiz1.json'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz1');
		let eles = [{img:'tip',x:160,y:356},{img:'bowl',x:569,y:413},{img:'fish',x:602,y:488}];
		let ele;
		const duration = 0.7;

		timeline = new TimelineLite().pause();

		p.addChild(father.loader.getImage('fish.png').set({x:188,y:95}));

		ele = sprite.tip.set({x:160,y:356});
		timeline.from(ele,duration,{alpha:0}).addPause();
		p.addChild(ele);

		ele = sprite.bowl.set({x:569,y:413});
		timeline.from(ele,duration,{alpha:0,y:'+=30'}).addPause();
		p.addChild(ele);

		ele = sprite.fish.set({x:602,y:488});
		timeline.from(ele,duration,{alpha:0,x:'+=30'}).addPause();
		p.addChild(ele);

		father.getClickBoard(p).on('click',onclick);

		p.addChild(new father.tipOnce('请你根据类别填写序号。')).showOut();
		delete p.go;
	}

	p.reset = function() {
		!timeline.paused() && timeline.pause();
		timeline.seek(0);
	}

	function onclick() {
		timeline.play();
	}

})();