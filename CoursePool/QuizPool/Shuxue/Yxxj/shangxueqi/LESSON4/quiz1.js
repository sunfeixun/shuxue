(function() {
	let father = QuizPool;
	let p = new father.quiz(0);

	father.loader.add(['QUIZ.png','QUIZ.json'],father.quizPath);

	p.go = function(){
		new father.title('请你做一做',p);
		let sprite = father.loader.getSprite('QUIZ');
		let str = '摸摸你的左耳，摸摸你的右耳。\n拍拍你的左肩，拍拍你的右肩。\n拍拍你的左腿，拍拍你的右腿。';
		let txt = new father.text(str,35);

		sprite.kid.set({x:719,y:175,scaleX:0.8,scaleY:0.8});
		txt.set({x:140,y:360});

		p.addChild(txt,sprite.kid);

		delete p.go;
	}
})();