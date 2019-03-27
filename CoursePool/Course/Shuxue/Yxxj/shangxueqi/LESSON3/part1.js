(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson3.json','lesson3.png'],father.lessonPath);

	p.go = function() {
		let str = '小朋友们，老师带你们去看大森林里的小动物，\n它们在森林里不同的位置，你们愿意和他们成为\n朋友吗？现在我们一起来认识它们吧！';
		let txt = new father.text(str,35);

		txt.x = (1280-txt.getBounds().width)/2;
		txt.y = 70;

		p.addChild(txt);

		let sprite = father.loader.getSprite('lesson3',true);
		p.addChild(sprite.animals).set({x:640,y:420});

		delete p.go;
	}
})();