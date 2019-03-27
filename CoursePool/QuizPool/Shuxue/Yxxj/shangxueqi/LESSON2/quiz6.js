(function() {
	let father = QuizPool;
	let p = new father.quiz(5);

	father.loader.add(['QUIZ.json','QUIZ.png'],father.quizPath);

	const candleGroup = new father.group;
	let triangle;

	p.go = function(){
		new father.title('想一想，3根蜡烛哪一根最粗？请在正确的（ ）里画“△”。',p);
		let sprite = father.loader.getSprite('QUIZ',true);
		let scalex = [0.6,0.8,1];
		let ansCon = p.addChild(new createjs.Container);
		let bracket, candle

		sprite.candle.scaleY = 0.8;
		sprite.candle.y = 360;
		sprite.bracket.y = 560;
		sprite.triangle.y = sprite.bracket.y;

		triangle = sprite.triangle;
		p.addChild(triangle);

		for(let i=0;i<scalex.length;i++){
			candle = sprite.candle.clone();
			candle.scaleX = scalex[i];

			bracket = sprite.bracket.clone();
			candle.bracket = bracket;

			candleGroup.array.push(candle);
			ansCon.addChild(candle,bracket);
			if(i===scalex.length-1){
				candle.correct = bracket.correct = true;
			}
		}

		candleGroup.sumAttr('x',309,331).addTo(ansCon);

		ansCon.cursor = 'pointer';
		ansCon.on('click',onclick);

		fresh();

		delete p.go;
	}

	p.reset = function(){
		p.mouseEnabled = true;
		fresh();
	}

	function fresh(){
		candleGroup.freshAttr('x');
		for(let i=0;i<candleGroup.array.length;i++){
			candleGroup.array[i].bracket.x = candleGroup.array[i].x;
		}
		triangle.visible = false;
	}

	function onclick(e){
		if(e.target.correct){
			p.mouseEnabled = false;
			triangle.x = e.target.x;
			triangle.visible = true;

			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
		}
	}

})();