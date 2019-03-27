(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,1);

	p.regCount(4);
	father.loader.add(['quiz2.png','quiz2.json'],father.lessonPath);
	let timeline = new TimelineLite;

	p.go = function() {
		let sprite = father.loader.getSprite('quiz2',true);
		let scale = 0.91;
		let _x = 1150, _ys = [137,288,437,589];
		let nums = ['4','2','3','1'], num;
		let brackets;
		let attr = {scaleX:scale,scaleY:scale};

		p.addChild(sprite.bg.set({x:580,y:366,scaleX:scale,scaleY:scale}));
		

		for(let i=1;i<=4;i++){
			attr.x = _x;
			attr.y = _ys[i-1];

			num = sprite['n'+nums[i-1]].set(attr);
			brackets = sprite.brackets.clone().set(attr);

			p.addChild(num,brackets);
			timeline.from(num,0.75,{alpha:0,x:'+=50'}).addPause();
		}

		timeline.call(disable);
		timeline.pause();

		father.getClickBoard(p).on('click',onclick);
		p.addChild(new father.tipOnce('请你将长短不同的铅笔序号写在对应的括号里。')).showOut();
		delete p.go;
	}

	p.reset = function() {
		p.mouseEnabled =true;
		!timeline.paused() && timeline.pause();
		timeline.seek(0);
	}

	function disable(){
		p.mouseEnabled = false;
	}

	function onclick(e) {
		if(timeline.paused()){
			timeline.play();
			father.preferSound('click');
		}
	}
})();