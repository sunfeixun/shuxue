(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、学习正方形、长方形、三角形、圆形的基本特点。\n2、通过直观感受，能够分辨图形的名称及特征。\n3、愿意观察生活中的图形，主动探索未知图形。\n'
		let str2 = '活动准备：\n1、教师准备：\n2、幼儿准备：知道立体图形长方体、正方体、圆柱体。'
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:139,lineHeight:60});

		p.addChild(txt);

		p.addChild(new father.textCover({w:202,h:42},{x:155,y:137}));
		p.addChild(new father.textCover({w:202,h:42},{x:155,y:435}));

		delete p.go;
	}
})();