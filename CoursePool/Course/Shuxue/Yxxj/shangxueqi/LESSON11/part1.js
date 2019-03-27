(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson11.png','lesson11.json'],father.lessonPath);

	p.go = function() {
		new father.title('小朋友，请你说出分别有几个图形',p);
		p.addChild(father.loader.getSprite('lesson11',true).p1).set({x:640,y:400,scaleX:0.8,scaleY:0.8});

		delete p.go;
	}
})();