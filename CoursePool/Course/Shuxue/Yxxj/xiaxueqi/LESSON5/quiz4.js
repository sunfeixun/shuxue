(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,3);
	let rect;

	father.loader.addLoadElement(['quiz4.png','quiz4.json'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz4');
		let txt = new father.text('15 - 9 = ?','50px Arial','black').set({textAlign:'center',textBaseline:'middle',x:640,y:177});
		p.addChild(txt);
		p.addChild(sprite.bg.set({x:140,y:379,scaleX:0.78,scaleY:0.78}));
		rect = p.addChild(sprite.rect.set({x:129,y:363,scaleX:1.06,scaleY:1.06,alpha:0}));

		father.getClickBoard(p).on('click',onclick);
		p.cursor = 'pointer';
		p.on('click',onclick);


		delete p.go;
	}

	p.reset = function(){
		p.mouseEnabled = true;
		rect.alpha = 0;
	}

	function onclick(e){
		p.mouseEnabled = false;
		TweenLite.to(rect,0.7,{alpha:1});
	}	
})();