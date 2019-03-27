(function() {
	let father = QuizPool;
	let p = new father.quiz(2);

	father.loader.add(['QUIZ.json','QUIZ.png'],father.quizPath);

	const ansGroup = new father.group;
	const padding = 83, left = 141;
	let correctIcon;

	p.go = function(){
		new father.title('缠着的绳子哪一根最长呢？请在正确的（ ）里画“√”。',p);
		let sprite = father.loader.getSprite('QUIZ',true);
		let ansCon = p.addChild(new createjs.Container);
		let objs = ['ropes1','ropes2','ropes3'];

		for(let i = 0;i<objs.length;i++){
			ansGroup.array.push(sprite[objs[i]]);
		}

		ansGroup.set({y:360}).addTo(ansCon);

		sprite.ropes3.correct = true;

		ansCon.cursor = 'pointer';
		ansCon.on('click',onclick);


		// 创建括号
		let bracket;

		for(let i=0;i<ansGroup.array.length;i++){
			bracket = sprite.bracket.clone();
			bracket.y = 530;
			ansGroup.array[i].bracket = bracket;
			bracket.correct = ansGroup.array[i].correct;
			ansCon.addChild(bracket);
		}

		correctIcon = sprite.correctIcon;
		correctIcon.y = bracket.y;

		p.addChild(correctIcon);

		fresh();

		delete p.go;
	}

	p.reset = function(){
		fresh();
		correctIcon.visible = false;
		p.mouseEnabled = true;
	}

	function fresh(){
		let last, cur;
		ansGroup.randomOrder();

		for(let i=0;i<ansGroup.array.length;i++){
			cur = ansGroup.array[i];
			last = ansGroup.array[i-1];
			cur.x = last? last.x + (last.getTransformedBounds().width + cur.getTransformedBounds().width)/2 + padding:cur.getTransformedBounds().width/2 + left;
			cur.bracket.x = cur.x;
		}
	}

	function onclick(e){
		if(e.target.correct){
			p.mouseEnabled = false;
			correctIcon.visible = true;
			correctIcon.x = e.target.bracket? e.target.bracket.x:e.target.x;

			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);			
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
		}
	}
})();