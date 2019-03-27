(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	p.go = function() {


		delete p.go;
	}
})();