(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,2);
	let animate;

	father.loader.addLoadElement(['quiz3.json','quiz3.png'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz3');
		p.addChild(sprite.f1.set({x:144,y:138,scaleX:0.72,scaleY:0.72}));
		let arrow = p.addChild(sprite.arrow.set({x:554,y:310,scaleX:0.72,scaleY:0.72}));
		let f2 = p.addChild(sprite.f2.set({x:805,y:138,scaleX:0.72,scaleY:0.72}));
		let num = p.addChild(sprite.num.set({x:948,y:469,scaleX:0.28,scaleY:0.28}));
		let arr = [arrow,f2,num];

		father.getClickBoard(p);

		animate = new TimelineLite();

		for(let i in arr){
			animate.pause().from(arr[i],0.75,{alpha:0});
		}

		p.on('click',onclick);
		p.cursor = 'pointer';


		delete p.go;
	}

	p.reset = function(){
		p.mouseEnabled = true;
		animate.seek(0).pause();
	}

	function onclick(e){
		p.mouseEnabled = false;
		animate.restart();
	}	
})();