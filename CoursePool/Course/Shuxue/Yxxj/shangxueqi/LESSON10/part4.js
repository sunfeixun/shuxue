(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4);

	p.go = function() {
		let texts = ['比较的时候，同样多你会了吗？','比较的时候，谁比谁多几你会了吗？','比较的时候，谁比谁少几你会了吗？',
		'小朋友们，今天我们学习了“比一比”，知道在比较时，一定\n要一个对着一个比，就会得到正确的结果，你学会了吗？'];
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