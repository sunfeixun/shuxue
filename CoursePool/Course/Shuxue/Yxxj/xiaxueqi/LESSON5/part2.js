(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	p.go = function() {


		delete p.go;
	}
})();