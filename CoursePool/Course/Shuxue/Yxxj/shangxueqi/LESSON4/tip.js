(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1.使幼儿初步了解左、右的基本含义，会用左、右\n描述物体的相对位置。\n2.使幼儿辩别位置方位能力，培养幼儿观察能力和\n语言表达能力。\n3、愿意发现生活中的位置。'
		let str2 = '教学准备：教学课件。';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();