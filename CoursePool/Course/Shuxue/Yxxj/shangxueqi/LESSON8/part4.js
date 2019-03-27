(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4);

	p.go = function() {
		let texts = ['小朋友们，今天我们学习了2和3的分解，今天我们\n学习了哪些内容？2的组成有几种？哪几种？3的组\n成有几种？哪几种？你学会了吗？'];
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