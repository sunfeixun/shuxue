(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {
		let texts = ['','',''];
		p.addChild(new father.timelineText(texts));

		delete p.go;
	}
})();