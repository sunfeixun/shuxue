(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add('part1.jpg',father.lessonPath);

	p.go = function() {
		let str = '小朋友们，今天老师给小朋友们带来了一个故事，你们想听吗？\n这个故事的名字就叫《比一比》。 小朋友要边听边回答问题哦！\n天气晴朗的早晨，小动物们来到河边郊游，它们还带来很多自己\n喜欢的美食，我们一起来看看他们的食物够不够分呢？'

		p.addChild(father.loader.getImage('part1.jpg','center')).set({x:640,y:240,scaleX:0.7,scaleY:0.7});
		p.addChild(new father.text(str,30)).set({x:230,y:462});

		delete p.go;
	}
})();