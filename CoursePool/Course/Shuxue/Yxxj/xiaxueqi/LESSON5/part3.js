(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	p.go = function() {


		delete p.go;
	}
})();