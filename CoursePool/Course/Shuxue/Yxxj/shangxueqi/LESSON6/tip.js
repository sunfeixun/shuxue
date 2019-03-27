(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1.使幼儿掌握1—5各数比较大小，初步认识“＞”“＜”、\n“=”符号。\n2.使幼儿获得对数感的经验，对以后统计题目的理解\n做准备。\n3.结合插图培养幼儿良好的学习习惯，激发幼儿的求知欲。';
		let str2 = '教学准备：\n教学课件。大于、小于、等于号卡片等。幼儿准备1—5\n的数字卡片，大于、小于、等于号卡片等。';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();