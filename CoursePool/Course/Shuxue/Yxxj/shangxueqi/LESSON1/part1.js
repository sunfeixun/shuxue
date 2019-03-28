(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson1.png','lesson1.json'],father.lessonPath);

	p.go = function() {
		new father.title('小朋友们，请你观察图画这里面藏着很多数学秘密，也很有趣哟！\n我们快来看一看吧！',p).set({scaleX:.7,scaleY:.7,x:230});
		let bg = father.loader.getSprite('lesson1').bg;
		p.addChildAt(bg,0).set({scaleX:1.66,scaleY:1.18});

		delete p.go;
	}
})();