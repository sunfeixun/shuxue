(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {
		let str1 = '学习重点：本节课学习了分类整理，引导幼儿按照分类的规则，将整理的概念深入生活，\n以此类推，通过幼儿的操作直观感受发现整理的好处及意义，最终，让幼儿能够运用到\n实际生活中，并进行分类整理。';
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