(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4);
	father.loader.add('zongjie.mp3',father.lessonPath);

	new father.part4Text('小朋友们，今天我们学习了按由小到大的顺序观察\n并数出图中内容的个数，或按方位数出周围物体。\n学习指物数数，认相应的数字。生活到处都有数\n学，数学对我们每个人都很重要。').addTo(p);
	p.go = function(){
		father.read('zongjie.mp3');
		delete p.go;
	}
})();