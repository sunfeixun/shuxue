(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、学习整十数加减整十数的计算方法。\n2、运用整十加减解决生活中的问题。\n3、喜欢对生活中的事物进行整十加减。\n'
		let str2 = '活动准备：\n1、物质准备：卡纸16\n2、幼儿经验准备：会整十整十的数数。\n3、教师准备：熟悉教学用书及课件的操作。'
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		p.addChild(new father.textCover({w:202,h:42},{x:155,y:107}));
		p.addChild(new father.textCover({w:202,h:42},{x:155,y:405}));	

		delete p.go;
	}
})();