(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {
		let str1 = '';
		let str2 = '';
		
		let str = str1 + '\n\n' + str2;
		let txt = new father.text(str,30).set({x:70,y:105,lineHeight:45});
		let shape = new father.textCover({w:140,h:32},{x:68});

		p.addChild(shape.clone().set({y:103}));
		p.addChild(shape.clone().set({y:282}));

		p.addChild(txt);

		delete p.go;
	}
})();