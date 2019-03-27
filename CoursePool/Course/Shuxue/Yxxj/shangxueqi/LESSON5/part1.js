(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson5.json','lesson5.png'],father.lessonPath);

	p.go = function() {
		new father.title('图中都有哪些事物？各有多少个？',p);

		let sprite = father.loader.getSprite('lesson5',true);

		p.addChild(sprite.landscape).set({x:640,y:380});

		delete p.go;
	}
})();