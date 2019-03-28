(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add('part1.jpg',father.lessonPath);

	p.go = function() {
		new father.title('它们的食物够不够分呢？',p);
		p.addChildAt(father.loader.getImage('part1.jpg')).set({scaleX:1.16,scaleY:1.16,x:-20,y:220},0);

		delete p.go;
	}
})();