(function() {
	let father = QuizPool;
	let p = new father.quiz(4);

	father.loader.add(['QUIZ.json','QUIZ.png'],father.quizPath);

	const sugarGroup = new father.group, budingGroup = new father.group;
	const padding = 83, left = 141;
	const numbers = new father.group;
	let circle;

	p.go = function(){
		new father.title('比一比，两种糖果哪一种多呢？请在正确的（ ）里画“○”。',p);
		let sprite = father.loader.getSprite('QUIZ',true);
		let ansCon = p.addChild(new createjs.Container);
		let scale = {scaleX:0.6,scaleY:0.6};

		for(let i=0;i<5;i++){
			sugarGroup.array.push(sprite.sugar.clone().set(scale));
			budingGroup.array.push(sprite.buding.clone().set(scale));
		}

		sugarGroup.y = 291;
		budingGroup.y = 455;

		sugarGroup.set({y:sugarGroup.y}).sumAttr('x',294,119).addTo(ansCon);
		budingGroup.set({y:budingGroup.y}).sumAttr('x',294,119).addTo(ansCon);

		ansCon.cursor = 'pointer';
		ansCon.on('click',onclick);

		// 创建括号
		let bracket;

		sugarGroup.bracket = sprite.bracket.clone().set({x:967,y:sugarGroup.y});
		budingGroup.bracket = sprite.bracket.clone().set({x:967,y:budingGroup.y});

		ansCon.addChild(sugarGroup.bracket,budingGroup.bracket);

		circle = sprite.circle;
		circle.x = sugarGroup.bracket.x;

		p.addChild(circle);

		fresh();

		delete p.go;
	}

	p.reset = function(){
		fresh();
		circle.visible = false;
		p.mouseEnabled = true;
	}

	function fresh(){
		let n1, n2, i, answer;
		let attr = {visible:false,correct:false};

		numbers.array = [1,2,3,4,5];
		n1 = numbers.chooseOne();
		n2 = numbers.chooseOne();

		sugarGroup.set(attr);
		budingGroup.set(attr);

		sugarGroup.bracket.correct = false;
		budingGroup.bracket.correct = false;

		for(i=0;i<n1;i++){
			sugarGroup.array[i].visible = true;
		}

		for(i=0;i<n2;i++){
			budingGroup.array[i].visible = true;
		}

		answer = n1>n2? sugarGroup:budingGroup;

		answer.set({correct:true});
		answer.bracket.correct =  true;
	}

	function onclick(e){
		if(e.target.correct){
			p.mouseEnabled = false;
			circle.visible = true;
			circle.y = e.target.bracket? e.target.bracket.y:e.target.y;

			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);			
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
		}
	}
})();