(function() {
	let father = projectData.courseInterface;

	let p = new father.part(4);
	let button;
	let limit = 4;
	const timeline = new TimelineLite();

	father.loader.add('part4.mp3',father.lessonPath);

	p.go = function() {
		father.read('part4.mp3');
		// father.loader.playSound('part4.mp3');
		let texts = ['按颜色排序你学会了吗？','按大小排序你学会了吗？','按形状排序你学会了吗？','今天我们学习了，按颜色排序、按大小排序、\n按形状排序，你学会了吗？'];
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