(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、知道测量规则的统一性即均等的概念。\n2、通过直观感受，掌握均等分开的方法。\n3、愿意从等分的角度，测量生活的中的事物。\n'
		let str2 = '活动准备：\n1、教师准备：熟悉课件顺序及功能。\n2、幼儿准备：知道大小不一样。'
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:139,lineHeight:60});

		p.addChild(txt);

		p.addChild(new father.textCover({w:202,h:42},{x:155,y:137}));
		p.addChild(new father.textCover({w:202,h:42},{x:155,y:435}));

		delete p.go;
	}
})();