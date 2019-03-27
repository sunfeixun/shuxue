(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1.初步接触减法的含义。\n2.认识“—”这个符号。\n3.初步掌握“去掉”就是用减法算式的经验。\n';
		let str2 = '教学准备：\n多媒体课件。';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();