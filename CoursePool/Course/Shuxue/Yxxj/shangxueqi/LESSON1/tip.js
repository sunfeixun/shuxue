(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1、初步学习按由小到大的顺序观察并数出图中内容\n的个数，或按方位数出周围物体。\n2、学习指物数数，认相应的数字。\n3、愿意发现生活中的数的存在。';
		let str2 = '教学准备：\n教学课件。 ';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();