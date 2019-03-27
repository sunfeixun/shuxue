(function() {
	let father = QuizPool;
	let p = new father.quiz(0);

	father.loader.add(['QUIZ.png','QUIZ.json'],father.quizPath);

	p.go = function(){
		new father.title('看图，说出各个物品的具体位置关系。',p);

		let sprite = father.loader.getSprite('QUIZ',true);
		let datas = [
			{img:'cup',x:210,question:'水杯在哪'},
			{img:'book1',x:561,question:'红色的书在哪'},
			{img:'book2',x:873,question:'黄色的书在哪'}
		];
		let _y = 630, img, _data, txt;

		p.addChild(sprite.desk).set({x:640,y:360,scaleX:0.8,scaleY:0.8});

		for(let i=0;i<datas.length;i++){
			_data = datas[i];
			img = sprite[_data.img];
			img.x = _data.x;
			img.y = _y;
			txt = new father.text(_data.question,30);
			txt.x = img.getTransformedBounds().width/2 + img.x + 15;
			txt.y = _y - txt.size/2;
			p.addChild(img,txt);
		}

		delete p.go;
	}
})();