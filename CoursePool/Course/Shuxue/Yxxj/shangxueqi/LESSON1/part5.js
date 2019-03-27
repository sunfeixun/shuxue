(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {

		let str1 = '学习重点：\n本单元学习数数，通过数数活动中，了解幼儿数数的水平以及对数数的基本方法的\n掌握情况，帮助幼儿初步了解计数物体个数的基本方法，生活到处都有数学，数学\n对我们每个人都很重要。';
		let str2 = '延伸练习：\n完成练习册第1页：第一题，第二题。\n第2页，第三题，第四题，第五题。';
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