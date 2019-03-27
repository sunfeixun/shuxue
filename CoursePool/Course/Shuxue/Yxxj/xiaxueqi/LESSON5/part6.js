(function() {
	let father = projectData.courseInterface;
	let p = new father.part(6);

	p.go = function() {


		delete p.go;
	}
})();