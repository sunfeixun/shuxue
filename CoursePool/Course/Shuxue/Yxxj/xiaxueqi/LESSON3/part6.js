(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {
		let str1 = '学习重点：本单元学习等分，等分的概念属于幼儿定量测量板块里的内容，幼儿通过\n自主操作，让幼儿掌握只有两个同等属性的事物才有对比性，才能做到找同，总结归\n纳事物的特点。通过幼儿自主操作，获取相关的经验，让幼儿能够发现等分的事物，\n并运用到生活当中。';
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