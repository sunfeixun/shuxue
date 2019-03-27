(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {
		let str1 = '学习重点：本单元学习了100以内的加减，引导幼儿对运算的理解，并能发现整十数\n运算的特征，总结归纳整十的特点。通过幼儿自主操作，获取相关的经验，让幼儿能\n够发现生活中的事物都可以用计算来解决，逐步对数的运算感兴趣。';
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