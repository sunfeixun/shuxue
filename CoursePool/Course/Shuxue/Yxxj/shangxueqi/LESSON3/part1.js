(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson3.json','lesson3.png'],father.lessonPath);

	p.go = function() {
		let str = '森林里有哪些小动物呢？';
		let title = new father.title(str,p);
		title.color = 'white';

		let sprite = father.loader.getSprite('lesson3');
		let scale = 2;
		sprite.animals.scaleX = 1280/sprite.animals.getBounds().width;
		sprite.animals.scaleY = 720/sprite.animals.getBounds().height;
		sprite.animals.y = 15;
		p.addChildAt(sprite.animals,0);

		delete p.go;
	}
})();