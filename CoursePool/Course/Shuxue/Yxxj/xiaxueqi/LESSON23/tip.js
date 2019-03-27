(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、了解知道图示统计表和条状统计表意义。\n2、能够填充条状统计表对事物进行统计。\n3、喜欢对生活中的事物进行统计。\n'
		let str2 = '活动准备：\n1、物质准备：配套卡纸23\n2、幼儿经验准备：会多角度分类。\n3、教师准备：熟悉教学用书及课件的操作。'
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		p.addChild(new father.textCover({w:202,h:42},{x:155,y:107}));
		p.addChild(new father.textCover({w:202,h:42},{x:155,y:405}));

		delete p.go;
	}
})();