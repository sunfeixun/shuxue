(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson6.png','lesson6.json'],father.lessonPath);

	p.go = function() {
		new father.title('美丽的小河里有很多小伙伴，小朋友们，河里都有什么呢？',p);

		let sprite = father.loader.getSprite('lesson6',true);

		p.addChild(sprite.bg).set({x:640,y:380});

		delete p.go;
	}
})();