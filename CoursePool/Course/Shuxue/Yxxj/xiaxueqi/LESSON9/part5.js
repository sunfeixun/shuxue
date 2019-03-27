(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {
		let texts = ['按颜色分类你学会了吗？','按大小分类你学会了吗？','按形状分类你学会了吗？','按属性分类你学会了吗？'];
		p.addChild(new father.timelineText(texts));

		delete p.go;
	}
})();