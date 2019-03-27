(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、知道什么是事物的属性，了解类别名称。\n2、通过直观感受，尝试根据事物属性进行分类。\n3、培养幼儿仔细观察的意志品质。\n'
		let str2 = '活动准备：\n1、物质准备：配套卡纸9。\n2、幼儿经验准备：能区分红黄绿，认识简单的图形。\n3、教师准备：熟悉书上元素的属性及类别名称。'
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		p.addChild(new father.textCover({w:202,h:42},{x:155,y:107}));
		p.addChild(new father.textCover({w:202,h:42},{x:155,y:405}));		

		delete p.go;
	}
})();