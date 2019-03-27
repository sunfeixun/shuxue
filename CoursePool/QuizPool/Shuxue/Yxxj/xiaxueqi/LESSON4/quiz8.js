(function() {
	let father = QuizPool;
	let p = new father.quiz(7);

	father.loader.add(['quiz8.json','quiz8.png','q8.mp3'],father.quizPath);
	let oGroup;
	const bracketContainer = new createjs.Container;
	const chooser = new createjs.Container;

	p.go = function(){
		// father.loader.playSound('q8.mp3');
		father.read('q8.mp3');
		new father.title('请找出与其他三组规律不同的一组，并在其括号里画X',p);
		let sprite = father.loader.getSprite('quiz8',true);
		let answers = ['wrong','right','right','right'];
		let sp;
		let bracketX = 1140;

		oGroup = new father.group;

		for(let i=1;i<=4;i++){
			sp = sprite['o'+i];
			oGroup.array.push(sp);
			sp.bracket = sprite.bracket.clone();
			sp.bracket.answer = sprite[answers[i-1]].clone();
			sp.bracket.val = answers[i-1];
			p.addChild(sp);
			bracketContainer.addChild(sp.bracket,sp.bracket.answer);
		}

		oGroup.set({x:550}).sumAttr('y',250,100);

		for(let i=0;i<oGroup.array.length;i++){
			sp = oGroup.array[i];
			sp.bracket.answer.y = sp.bracket.y = sp.y;
			sp.bracket.answer.x = sp.bracket.x = bracketX;
			sp.bracket.answer.visible = false;
			sp.bracket.answer.mouseEnabled = false;
		}

		p.addChild(bracketContainer);
		bracketContainer.cursor = 'pointer';
		bracketContainer.on('click',onclick);

		// 对错选择
		let padding = 10;
		let right = sprite.right.clone();
		let wrong = sprite.wrong.clone();

		right.scaleX = right.scaleY = wrong.scaleX = wrong.scaleY = 1.3;
		right.x = -right.getTransformedBounds().width/2 - padding;
		wrong.x = wrong.getTransformedBounds().width/2 + padding;
		right.val = 'right';
		wrong.val = 'wrong';

		chooser.addChild(right,wrong);
		chooser.visible = false;
		chooser.x = bracketX;
		chooser.cursor = 'pointer';
		chooser.on('click',choose);
		p.addChild(chooser);
		p.reset();
		delete p.go;
	}

	p.reset = function(){
		chooser.visible = false;
		oGroup.freshAttr('y');

		let brac;

		for(let i=0;i<oGroup.array.length;i++){
			brac = oGroup.array[i].bracket;
			brac.y = brac.answer.y = oGroup.array[i].y;
			brac.answer.visible = false;
			brac.mouseEnabled = true;
		}
	}

	function onclick(e){
		if(!chooser.visible){
			chooser.y = e.target.y - 40;
			chooser.visible = true;
			chooser.targ = e.target;
		}else if(chooser.y === e.target.y - 40){
			chooser.visible = false;
		}else{
			chooser.y = e.target.y - 40;
			chooser.targ = e.target;
		}
	}

	function choose(e){
		if(chooser.targ.val===e.target.val){
			p.dispatchEvent(father.ANSWER_CORRECT);
			chooser.targ.answer.visible = true;
			chooser.targ.mouseEnabled = false;
			chooser.visible = false;
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);

		}
	}
})();