(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {
		let str1 = '学习重点：本单元学习规律，引导幼儿学习正方形、长方形、三角形、圆形的基本特\n点，通过直观感受，能够分辨图形的名称及特征，并总结归纳图形的特点。通过幼儿\n自主操作，获取相关的经验，让幼儿能够发现平面图形与立体图形的区别，并运用到\n生活当中。';
		let str2 = '延伸练习：完成练习册P  ，第  题.....。';
		
		let str = str1 + '\n\n' + str2;
		let txt = new father.text(str,30).set({x:70,y:105,lineHeight:45});
		let shape = new father.textCover({w:140,h:32},{x:68});

		p.addChild(shape.clone().set({y:103}));
		p.addChild(shape.clone().set({y:328}));

		p.addChild(txt);

		delete p.go;
	}
})();