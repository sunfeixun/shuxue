(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1.使幼儿了解1——5以内数的排列顺序和区分几个、\n第几个，知道每个数的前面是几，后面是几。\n2.根据学习第几让幼儿知道在生活中排队是要按顺序的，\n从中可以用第几数数可以很快的数出来的经验。\n3.让幼儿感受到生活中处处有数学，增强学习的乐趣的\n自信心。';
		let str2 = '教学准备：\n多媒体课件、数字卡片等';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();