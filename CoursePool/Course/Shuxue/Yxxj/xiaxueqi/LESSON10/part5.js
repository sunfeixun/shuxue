(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {
		let texts = ['按颜色顺序整理你学会了吗？','按大小顺序整理你学会了吗？','按形状顺序整理你学会了吗？','你愿意整理吗？'];
		p.addChild(new father.timelineText(texts));

		delete p.go;
	}
})();