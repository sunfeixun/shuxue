(function() {
	let father = QuizPool;
	let p = new father.quiz(0);

	father.loader.add(['QUIZ.json','QUIZ.png'],father.quizPath);

	const ansGroup = new father.group;

	p.go = function(){
		new father.title('想一想，哪一根最长呢？',p);
		let sprite = father.loader.getSprite('QUIZ');
		let ansCon = p.addChild(new createjs.Container);
		let objs = ['rope1','rope2','rule1','rule2'];

		for(let i = 0;i<objs.length;i++){
			ansGroup.array.push(sprite[objs[i]]);
		}

		ansGroup.set({x:176}).sumAttr('y',190,125).addTo(ansCon);

		sprite.rope2.correct = true;

		ansCon.cursor = 'pointer';
		ansCon.on('click',onclick);

		ansGroup.freshAttr('y');

		delete p.go;
	}

	p.reset = function(){
		ansGroup.freshAttr('y');
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