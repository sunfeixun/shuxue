(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,2);

	const objs = new Array;
	p.regCount(2);
	father.loader.add(['quiz3.json','quiz3.png'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz3',true,{scaleX:0.89,scaleY:0.89});
		let dragContainer = new createjs.Container;

		p.addChild(sprite.bg.set({x:640,y:360}),dragContainer);

		dragContainer.addChild(sprite.fish.set({x:149,y:279}),sprite.hat.set({x:420,y:441}));
		
		sprite.fish._ox = sprite.fish.x;
		sprite.fish._oy = sprite.fish.y;
		sprite.hat._ox = sprite.hat.x;
		sprite.hat._oy = sprite.hat.y;

		sprite.fish.targPoint = [971,450];
		sprite.hat.targPoint = [708,273];

		objs.push(sprite.hat);
		objs.push(sprite.fish);

		dragContainer.cursor = 'pointer';

		dragContainer.on('pressmove',drag);
		dragContainer.on('pressup',drag);

		p.addChild(new father.tipOnce('请你找出每组中不是同类别的物品。')).showOut();
		delete p.go;
	}

	p.reset = function() {
		for(let i = 0;i<objs.length;i++){
			objs[i].x = objs[i]._ox;
			objs[i].y = objs[i]._oy;
			objs[i].mouseEnabled = true;
		}
	}

	function drag(e) {
		if(e.type=='pressmove'){
			e.target.set({x:e.localX,y:e.localY});
		}else if(e.type=='pressup'){
			if(Math.abs(e.localX-e.target.targPoint[0])<80 && Math.abs(e.localY-e.target.targPoint[1])<80){
				e.target.mouseEnabled = false;
				e.target.x = e.target.targPoint[0];
				e.target.y = e.target.targPoint[1];
				p.count();
				father.preferSound('right');
			}else{
				e.target.x = e.target._ox;
				e.target.y = e.target._oy;
			}
		}
	}

})();