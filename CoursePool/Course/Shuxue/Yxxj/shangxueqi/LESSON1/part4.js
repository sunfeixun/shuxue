(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4);

	p.go = function() {
		let texts = ['小朋友们，今天我们学习了按由小到大的顺序观察并数出图中\n内容的个数，或按方位数出周围物体。学习指物数数，认相应\n的数字。生活到处都有数学，数学对我们每个人都很重要。'];
		let textCon = p.addChild(new createjs.Container);
		let txt;

		for(let i=0;i<texts.length;i++){
			txt = new father.text(texts[i],40);
			txt.y = i*txt.size*1.5;
			textCon.addChild(txt);
		}

		textCon.x = (1280-textCon.getBounds().width)/2;
		textCon.y = (720-textCon.getBounds().height)/2-50;

		p.addChild(textCon);

		delete p.go;
	}
})();