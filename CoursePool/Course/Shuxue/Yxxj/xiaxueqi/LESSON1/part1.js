(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	p.go = function() {

		delete p.go;
	}
})();