(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	let girl;
	let tipText = new father.text('小朋友们，我们来听一听她拍的是什么样的节奏吧！',40).alignCenter().set({x:640,y:640});
	let showtext = undefined;

	p.on('removed',function() {girl.gotoAndStop("stand")});

	father.loader.add(['paishou.mp3','part1.jpg','girl.png','girl.json','arrow.png','part1_1.mp3','part1_2.mp3'],father.lessonPath);

	p.go = function() {
		p.addChild(father.loader.getImage('part1.jpg'));

		girl = father.loader.getSprite('girl').stand.set({scaleX:1.3,scaleY:1.3});

		p.addChild(girl.set({x:640,y:400}),tipText);

		girl.cursor = 'pointer';
		girl.on('click',onclick);

		p.addChild(father.loader.getImage('arrow.png')).set({x:445,y:407,scaleX:0.6,scaleY:0.6,rotation:300});
		// father.loader.playSound('part1_1.mp3');
		father.read('part1_1.mp3');

		delete p.go;
	}

	function onclick(e) {
		if(showtext && showtext.playState==='playSucceeded') return;
		showtext = father.loader.playSound('paishou.mp3');
		_showtxt && showtext.on('complete',_showtxt);
		_showtxt = null;

	}

	function _showtxt(){
		father.read('part1_1.mp3');
		// father.loader.playSound('part1_2.mp3');
		tipText.text = '小朋友们，你能拍出和她一样的节奏吗？';
		TweenLite.from(tipText,0.75,{alpha:0});
		father.preferSound('click');
	}
	
})();