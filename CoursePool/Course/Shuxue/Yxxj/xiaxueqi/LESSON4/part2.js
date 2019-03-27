(function(){
	let father = projectData.courseInterface;
	let imgPosition = {x:640,y:360};
	let texts = ['你注意到有什么重复吗？','这队小鱼有什么重复的地方？\n它们是按什么要求排队的呢？','这队小鱼按什么规律排队的呢？',
				'这队小鱼是按什么规律排队的呢？','这四条鱼怎么排队呢？'];
	let sprite;

	father.loader.add(['part2.json','part2.png','part2_1.mp3','part2_2.mp3','part2_3.mp3','part2_4.mp3'],father.lessonPath);

(function() {
	let p = new father.part(2,0);

	p.go = function() {
		// father.loader.playSound('part2_1.mp3');
		father.read('part2_1.mp3');
		sprite = sprite || father.loader.getSprite('part2',true);
		new father.title(texts[0],p);
		p.addChild(sprite.fish1).set(imgPosition);

		delete p.go;
	}
})();

(function() {

	let p = new father.part(2,1);

	p.go = function() {
		// father.loader.playSound('part2_2.mp3');
		father.read('part2_2.mp3');
		sprite = sprite || father.loader.getSprite('part2',true);
		new father.title(texts[1],p);
		p.addChild(sprite.fish2).set(imgPosition);

		delete p.go;
	}
})();

(function() {
	let p = new father.part(2,2);

	p.go = function() {
		// father.loader.playSound('part2_3.mp3');
		father.read('part2_3.mp3');
		sprite = sprite || father.loader.getSprite('part2',true);
		new father.title(texts[2],p);
		p.addChild(sprite.fish3).set(imgPosition);

		delete p.go;
	}
})();

(function() {
	let p = new father.part(2,3);

	p.go = function() {
		// father.loader.playSound('part2_3.mp3');
		father.read('part2_3.mp3');
		sprite = sprite || father.loader.getSprite('part2',true);
		new father.title(texts[3],p);
		p.addChild(sprite.fish4).set(imgPosition);
		delete p.go;
	}
})();

(function() {
	let p = new father.part(2,4);

	p.go = function() {
		// father.loader.playSound('part2_4.mp3');
		father.read('part2_4.mp3');
		sprite = sprite || father.loader.getSprite('part2',true);
		new father.title(texts[4],p);

		let beginX = 348,sumX = 194;
		
		for(let i=1;i<=4;i++){
			p.addChild(sprite['f'+i]).set({y:360,x:beginX + sumX*(i-1)});
			p.addChild(sprite['f'+i].clone());
		}

		p.on('mousedown',drag);
		p.on('pressmove',drag);

		delete p.go;
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}
})();

})();
