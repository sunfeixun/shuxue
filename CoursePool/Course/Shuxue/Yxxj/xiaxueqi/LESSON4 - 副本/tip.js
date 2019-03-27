(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str = '活动目标：\n1、逐步了解规律是按照一定的模式排成的。\n2、尝试识别、扩展、描述规律，并进行转换。\n3、喜欢规律游戏并愿意总结和归纳。\n活动准备：\n1、幼儿经验准备：玩过模仿拍手的游戏。\n2、教师准备：\n手拍节奏：X XX X XX\n脚踏节奏：X XX XXXX X XX XXXX'
		let txt = new father.text(str,40).set({x:257,y:139,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();