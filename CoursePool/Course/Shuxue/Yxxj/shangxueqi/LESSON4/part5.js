(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {

		let str1 = '学习重点：本课着重培养了幼儿的空间方位\n的认知，增强了明确的方位词，通过直观感受，让幼儿得到空间方位的认知。';
		let str2 = '延伸练习：完成练习册第5页：第二题。';
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