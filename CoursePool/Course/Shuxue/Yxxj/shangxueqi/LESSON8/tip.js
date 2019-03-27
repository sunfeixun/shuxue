(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1.使幼儿掌握2、3的分解组成。\n2.培养幼儿的观察能力和分析能力。\n3.使幼儿掌握数字都可以用其他的两个数组成的经验。';
		let str2 = '教学准备：\n多媒体课件。';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();