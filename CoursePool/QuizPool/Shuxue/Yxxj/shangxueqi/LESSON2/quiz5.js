(function() {
	let father = QuizPool;
	let p = new father.quiz(4);

	father.loader.add(['QUIZ.json','QUIZ.png'],father.quizPath);

	const treeGroup = new father.group;
	let correctIcon;

	p.go = function(){
		new father.title('想一想，哪颗大树最高，请在正确的（ ）里面画“√”。',p);
		let sprite = father.loader.getSprite('QUIZ',true);
		let scaley = [0.6,0.8,1];
		let ansCon = p.addChild(new createjs.Container);
		let bracket, tree

		sprite.tree.regY = sprite.tree.getBounds().height;

		sprite.tree.scaleX = 0.8;
		sprite.tree.y = 500;
		sprite.bracket.y = 560;
		sprite.correctIcon.y = sprite.bracket.y;

		correctIcon = sprite.correctIcon;
		p.addChild(correctIcon);

		for(let i=0;i<scaley.length;i++){
			tree = sprite.tree.clone();
			tree.scaleY = scaley[i];

			bracket = sprite.bracket.clone();
			tree.bracket = bracket;

			treeGroup.array.push(tree);
			ansCon.addChild(tree,bracket);
			if(i===scaley.length-1){
				tree.correct = bracket.correct = true;
			}
		}

		treeGroup.sumAttr('x',309,331).addTo(ansCon);

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
		treeGroup.freshAttr('x');
		for(let i=0;i<treeGroup.array.length;i++){
			treeGroup.array[i].bracket.x = treeGroup.array[i].x;
		}
		correctIcon.visible = false;
	}

	function onclick(e){
		if(e.target.correct){
			p.mouseEnabled = false;
			correctIcon.x = e.target.x;
			correctIcon.visible = true;

			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
		}
	}

})();