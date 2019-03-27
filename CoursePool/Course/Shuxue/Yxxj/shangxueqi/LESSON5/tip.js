(function() {
	let father = projectData.courseInterface;

	let p = new father.tip();

	p.go = function() {
		let str1 = '活动目标：\n1.使幼儿会用1－5各数表示物体的个数，知道1－5中的\n数序，能认、读、写1－5各数,并注意书写工整。\n2.培养幼儿认真观察、积极动手操作和认真书写的习惯。\n3.对数的概念理解能够掌握初步的体验和理解的经验。';
		let str2 = '教学准备：\n教学课件。1-5的数字卡。';
		let str3 = str1 + '\n' + str2;

		let txt = new father.text(str3,40).set({x:157,y:109,lineHeight:60});

		p.addChild(txt);

		delete p.go;
	}
})();