(function() {
	let father = QuizPool;
	let p = new father.quiz(1);

	father.loader.add(['QUIZ.json','QUIZ.png'],father.quizPath);

	const ansGroup = new father.group;

	p.go = function(){
		new father.title('想一想，他们谁高呢？',p);
		let sprite = father.loader.getSprite('QUIZ',true);
		let ansCon = p.addChild(new createjs.Container);
		let scale = 0.8

		ansGroup.array.push(sprite.changjl,sprite.horse);
		ansGroup.addTo(ansCon);

		sprite.changjl.set({x:398,y:378,scaleX:scale,scaleY:scale});
		sprite.horse.set({x:843,y:526,scaleX:scale,scaleY:scale});

		sprite.changjl.correct = true;

		ansCon.cursor = 'pointer';
		ansCon.on('click',onclick);

		ansGroup.freshAttr('x');

		delete p.go;
	}

	p.reset = function(){
		ansGroup.freshAttr('x');
		ansGroup.set({mouseEnabled:true});
	}

	function onclick(e){
		if(e.target.correct){
			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);
			ansGroup.set({mouseEnabled:false});
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
		}
	}
})();