(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {
		let str1 = '学习重点：本节课学习了分类，引导幼儿寻找分类的规则，再将分类以此类推，通过幼\n儿的动手操作，发现幼儿对类别的掌握，最终，让幼儿能够发现事物的属性，并进行分\n类。';
		let str2 = '延伸练习：完成练习册P  ，第  题.....。';
		
		let str = str1 + '\n\n' + str2;
		let txt = new father.text(str,30).set({x:70,y:105,lineHeight:45});
		let shape = new father.textCover({w:140,h:32},{x:68});

		p.addChild(shape.clone().set({y:103}));
		p.addChild(shape.clone().set({y:282}));

		p.addChild(txt);

		delete p.go;
	}
})();