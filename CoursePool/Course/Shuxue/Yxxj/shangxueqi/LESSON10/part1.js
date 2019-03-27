(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson10.png','lesson10.json'],father.lessonPath);

	p.go = function() {
		new father.title('小朋友，请你说出分别有几个图形。',p);
		p.addChild(father.loader.getSprite('lesson10',true).p1).set({x:640,y:400});

		delete p.go;
	}
})();