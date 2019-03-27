(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	p.go = function() {
		new father.title('小朋友们，我们一起点数吧。',p);
		new father.text('1   2   3   4   5',100,'blue').addTo(p).alignCenter().set({x:640,y:330});
		new father.text('1的后面是几？\n3的前面第一个数是几？\n后面第二个数是几？',40).addTo(p).set({x:462,y:500});

		delete p.go;
	}
})();