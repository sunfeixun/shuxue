(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,3);

	const animals = new Array;
	p.regCount(4);

	father.loader.add(['quiz4.png','quiz4.json'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz4',true);
		let scale = {scaleX:0.9,scaleY:0.9};
		let positions = [{x:246,y:468},{x:643,y:428},{x:846,y:524},{x:1061,y:477}];
		let targetPositions = [{targX:245,targY:200},{targX:517,targY:200},{targX:789,targY:200},{targX:1061,targY:200}];
		let dragContainer = new createjs.Container;

		p.addChild(sprite.bg.set({x:640,y:553}), dragContainer);

		for(let i=1;i<=4;i++){
			dragContainer.addChild(sprite['animal'+i].set(scale).set(positions[i-1]).set(targetPositions[i-1]));
			sprite['animal'+i]._ox = sprite['animal'+i].x;
			sprite['animal'+i]._oy = sprite['animal'+i].y;
			animals.push(sprite['animal'+i]);
		}

		dragContainer.cursor = 'pointer';
		dragContainer.on('pressmove',drag);
		dragContainer.on('pressup',drag);

		p.addChild(new father.tipOnce('把吃草的动物拖到上方空白处。')).showOut();
		delete p.go;
	}

	p.reset = function() {
		for(let i=0;i<animals.length;i++){
			animals[i].mouseEnabled = true;
			animals[i].x = animals[i]._ox;
			animals[i].y = animals[i]._oy;
		}
	}

	function drag(e) {
		if(e.type=='pressmove'){
			e.target.set({x:e.localX,y:e.localY});
		}else if(e.type=='pressup'){
			if(e.localY<378){
				e.target.x = e.target.targX;
				e.target.y = e.target.targY;
				e.target.mouseEnabled = false;
				p.count();
				father.preferSound('right');
			}else{
				e.target.x = e.target._ox;
				e.target.y = e.target._oy;
			}
		}
	}

})();