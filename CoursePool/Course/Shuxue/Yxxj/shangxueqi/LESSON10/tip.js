(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1.初步接触加法的含义；能正确读出加法算式；使幼儿\n初步体会生活中有许多问题要用加法来解决。认识“+”\n这个符号。\n2.通过幼儿操作、表述，培养幼儿动手操作能力、语言\n表达能力；培养幼儿初步的数学交流意识。\n3.使幼儿掌握只要物品合起来就可以用加法算式来表示\n的经验。';
		let str2 = '教学准备：多媒体课件。';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();