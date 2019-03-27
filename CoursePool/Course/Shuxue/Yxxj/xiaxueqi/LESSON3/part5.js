(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {
		let texts = ['你知道什么是同样大小了吗？','你知道只有相同的东西才能比大小吗？','你知道如何等分了吗？'];
		p.addChild(new father.timelineText(texts));

		delete p.go;
	}

})();