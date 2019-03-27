(function() {
	let father = projectData.courseInterface;

	let p = new father.part(2);
	const timeline = new TimelineLite()
	const clickboard = father.getClickBoard(p);
	clickboard.on('click',onclick);

	let fish5;

	father.loader.addLoadElement(['fish.json','fish.png'],father.lessonPath);

	p.go = function() {

		delete p.go;
	}

	p.reset = function(){
		timeline.seek(0).play();
		clickboard.mouseEnabled = true;
		fish5.x = fish5.ox;
		fish5.y = fish5.oy;
	}
	
})();