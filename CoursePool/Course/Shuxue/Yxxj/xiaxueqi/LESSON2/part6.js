(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {
		let str1 = '学习重点：本单元学习规律，引导幼儿，总结归纳规律的特点。通过幼儿自主操\n作，获取相关的经验，让幼儿能够发现有规律的事物，并运用到生活当中。';
		let str2 = '延伸练习：完成练习册P4，第1题。';


		let str = str1 + '\n\n' + str2;

		let txt = new father.text(str,30).set({x:70,y:105,lineHeight:45});

		let shape = new createjs.Shape(new createjs.Graphics().f('#00FFFF').r(0,0,140,32)).set({alpha:0.6});

		p.addChild(shape.clone().set({x:68,y:103}));
		p.addChild(shape.clone().set({x:68,y:236}));

		p.addChild(txt);

		delete p.go;
	}
})();