(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);
	father.loader.add(['lesson4.png','lesson4.json'],father.lessonPath);

	p.go = function() {
		new father.title('请小朋友们仔细观察，你都发现了什么？你想告诉大家什么呢？',p);
		let sprite = father.loader.getSprite('lesson4',true);

		p.addChild(sprite.room).set({x:640,y:420,scaleX:0.8,scaleY:0.8});

		delete p.go;
	}
})();