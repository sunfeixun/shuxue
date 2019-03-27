(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {

		let str1 = '学习重点：\n本单元学习数数，通过比较物品多少的活动中，使幼儿掌握1—5各数比较大小，\n初步认识“＞”“＜”、“=”符号，帮助幼儿体验一些具体的比较方法。';
		let str2 = '延伸练习：\n完成练习册第9页：第一题，第二题。\n第10页，第三题，第四题。';
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