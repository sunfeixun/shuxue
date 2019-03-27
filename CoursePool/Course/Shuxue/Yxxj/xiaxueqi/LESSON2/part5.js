(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	let button;
	let limit = 3;
	const timeline = new TimelineLite();

	p.go = function() {
		let texts = ['你能说出这些图形的名字吗？','你能用图形摆出新的造型吗？','你还知道别的图形吗？'];

		p.addChild(new father.timelineText(texts));

		delete p.go;
	}

})();