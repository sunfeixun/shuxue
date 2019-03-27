(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {
		let texts = ['整十数加上整十数你会算了吗？','整十数减整十数你会算了吗？','整十数加减整十数你学会便捷的方法了吗？','生活中还有什么可以用来统计吗？'];
		p.addChild(new father.timelineText(texts));

		delete p.go;
	}
})();