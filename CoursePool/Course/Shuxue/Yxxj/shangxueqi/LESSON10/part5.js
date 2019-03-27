(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {

		let str1 = '学习重点：本课通过培养幼儿接触加法的含义；能正确读出加法算式；使幼儿体会\n生活中有许多问题要用加法来解决。认识“+”这个符号。培养幼儿初步的数学意识，\n使幼儿掌握“只要物品合起来就可以用加法算式来表示”的经验';
		let str2 = '延伸练习：完成练习册上的第13页，第2题；\n第14页，第2题的最后一道；\n第14页，第3题的第1道、第3道。';
		let attr = {x:70,lineHeight:45};

		let txt1 = new father.text(str1,30).set(attr).set({y:105});
		let bound = txt1.getTransformedBounds();

		let txt2 = new father.text(str2,30).set(attr).set({y:bound.y + bound.height + attr.lineHeight});

		let cover1 = new father.textCover(txt1,p);
		let cover2 = new father.textCover(txt2,p);

		cover1.alpha = cover2.alpha = 0.01;

		cover1.on('click',onclick);
		cover2.on('click',onclick);

		p.addChild(txt1,txt2);

		delete p.go;
	}

	function onclick(e){
		e.target.alpha = e.target.alpha > 0.5 ? 0.01:0.6;
	}

})();