(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、使幼儿初步认识一一对应，知道“同样多”的含义。\n2、初步学会用一一应的方法比较物体的多少，知道多、\n少的含义。\n3、愿意发现生活中的多少。\n'
		let str2 = '活动准备：\n教学课件。'
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:139,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();