(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、学习平行四边形、扇形、梯形的基本特征。\n2、通过直观感受，能够分辨图形的名称及特征。\n3、愿意观察生活中的图形，主动探索未知图形。'
		let str2 = '活动准备：\n1、教师准备：熟悉课件顺序及功能。\n2、幼儿准备：认识扇子、滑滑梯。'
		let str3 = str1 + '\n\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:139,lineHeight:60});

		p.addChild(txt);

		p.addChild(new father.textCover({w:202,h:42},{x:155,y:137}));
		p.addChild(new father.textCover({w:202,h:42},{x:155,y:435}));

		delete p.go;
	}
})();