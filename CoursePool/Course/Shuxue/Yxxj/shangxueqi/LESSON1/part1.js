(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson1.png','lesson1.json'],father.lessonPath);

	p.go = function() {
		new father.title('小朋友们，请你观察图画这里面藏着很多数学秘密，\n也很有趣哟！我们快来看一看吧！',p);
		let bg = father.loader.getSprite('lesson1',true).bg;
		p.addChild(bg).set({x:640,y:410,scaleX:0.7,scaleY:0.7});

		delete p.go;
	}
})();