(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {
		let texts = ['你能说出这些图形的名字吗？','你会摆出新的造型吗？','这些图形可以单独立起来吗？'];
		let timelinetext = new father.timelineText(texts);
		let button = timelinetext.getDefaultButton();

		twoButton = new createjs.Container;
		timelinetext.otherButton(2,twoButton);

		twoButton.addChild(button.clone(true),button.clone(true));

		twoButton.getChildAt(0).x -= 150;
		twoButton.getChildAt(0).mouseChildren = false;
		twoButton.getChildAt(0).getChildAt(1).text = '不可以';

		twoButton.getChildAt(1).x += 150;
		twoButton.getChildAt(1).mouseChildren = false;
		twoButton.getChildAt(1).getChildAt(1).text = '可 以';

		twoButton.getChildAt(1).on('click',function() {father.preferSound('wrong')});

		timelinetext.noAct(twoButton.getChildAt(1));

		p.addChild(timelinetext);
		delete p.go;
	}
})();