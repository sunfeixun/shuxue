(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,3);

	p.go = function() {


		p.addChild(new father.tipOnce('')).showOut();
		delete p.go;
	}
})();