(function() {
	let father = projectData.courseInterface;

	let p = new father.part(5);
	let button;
	let limit = 4;
	const timeline = new TimelineLite();

	p.go = function() {
		let texts = ['按颜色排序你学会了吗？','按大小排序你学会了吗？','按形状排序你学会了吗？','你还会按什么规律排序呢？'];
		p.addChild(new father.timelineText(texts));

		delete p.go;
	}

})();