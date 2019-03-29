(function() {
	let father = QuizPool;
	let p = new father.quiz(1);

	let margin = 100;
	let positions = [
		[{x:0,y:0}],
		[{x:-margin,y:0},{x:margin,y:0}],
		[{x:-margin,y:margin/2},{x:0,y:-margin},{x:margin,y:margin/2}],
		[{x:-margin,y:-margin},{x:margin,y:-margin},{x:-margin,y:margin},{x:margin,y:margin}],
		[{x:0,y:0},{x:-margin,y:-margin},{x:margin,y:-margin},{x:-margin,y:margin},{x:margin,y:margin}],
		[{x:-margin*1.5,y:-margin},{x:0,y:-margin},{x:margin*1.5,y:-margin},{x:-margin*1.5,y:margin},{x:0,y:margin},{x:margin*1.5,y:margin}],
		[{x:0,y:0},{x:-margin*1.5,y:-margin*1.5},{x:0,y:-margin*1.5},{x:margin*1.5,y:-margin*1.5},{x:-margin*1.5,y:margin*1.5},{x:0,y:margin*1.5},{x:margin*1.5,y:margin*1.5}],
		[{x:margin,y:0},{x:-margin,y:0},{x:-margin*1.5,y:-margin*1.5},{x:0,y:-margin*1.5},{x:margin*1.5,y:-margin*1.5},{x:-margin*1.5,y:margin*1.5},{x:0,y:margin*1.5},{x:margin*1.5,y:margin*1.5}],
		[{x:-margin*1.5,y:0},{x:0,y:0},{x:margin*1.5,y:0},{x:-margin*1.5,y:-margin*1.5},{x:0,y:-margin*1.5},{x:margin*1.5,y:-margin*1.5},{x:-margin*1.5,y:margin*1.5},{x:0,y:margin*1.5},{x:margin*1.5,y:margin*1.5}]
	];
	let n;

	let circleContainer = p.addChild(new createjs.Container);

	p.go = function(){
		new father.title('小朋友，请你找出与下面数字对应的图形吧',p);
		father.read('lijie2.mp3');
		father.addSplitStar(p);
		let circle = new createjs.Shape;
		let cb;
		let cbCon = p.addChild(new createjs.Container);
		circle.graphics.s('black').ss(2).f('#9DC3E6').dc(0,0,margin/2);

		for(let i=1;i<=9;i++){
			cb = new father.cubeNumber(i);
			cb.y = 650;
			cb.x = 211 + 107*(i-1);
			cbCon.addChild(cb);

			circleContainer.addChild(circle.clone());
		}

		circleContainer.x = 640;
		circleContainer.y = 360;

		cbCon.cursor = 'pointer';
		cbCon.on('click',onclick);

		p.reset();

		delete p.go;
	}

	p.reset = function(){
		let _n = n;

		while(_n===n){
			_n = father.publicFunction.random(9);
		}
		n = _n;

		let pos = positions[n-1];

		for(let i=0;i<circleContainer.children.length;i++){
			if(pos[i]){
				circleContainer.children[i].visible = true;
				circleContainer.children[i].set(pos[i]);
			}else{
				circleContainer.children[i].visible = false;
			}
		}
	}

	function onclick(e){
		if(e.target.value()===n){
			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
		}
	}
})();