(function() {
	let father = QuizPool;
	let p = new father.quiz(2);

	let kid;
	let area = [{x:463,y:519,width:88,height:62},{x:843,y:519,width:88,height:62}];
	let nums = [];
	let targPos = [[507,550],[891,550]];
	let answers = [];
	let count = 0;

	p.go = function(){
		new father.title('小朋友，请你填一填。',p);
		father.addSplitStar(p);
		let sprite = father.loader.getSprite('QUIZ7',true);
		
		// 题干;
		new father.text('      在第    个 ，      在第    个。',40).alignCenter().set({x:640,y:550}).addTo(p);
		p.addChild(sprite.kids).set({x:640,y:300,scaleX:0.8,scaleY:0.8});

		kid = [
			sprite.kid1.clone().set({x:352,y:545,scaleX:0.6,scaleY:0.6}),
			sprite.kid1.clone().set({x:728,y:545,scaleX:0.6,scaleY:0.6})
			];

		p.addChild(kid[0],kid[1]);

		// 数字
		let beginX = 220, sumX = 207, y = 660;
		let numContainer = p.addChild(new createjs.Container);
		let num;
		for(let i=1;i<=5;i++){
			num = new father.dragNumber(i);
			num.set({x:beginX,y:y});
			num.setBackPosition();
			numContainer.addChild(num);
			beginX += sumX;
		}

		nums = numContainer.children;

		numContainer.on('mousedown',drag);
		numContainer.on('pressmove',drag);
		numContainer.on('pressup',judge);
		
		p.reset();

		delete p.go;
	}

	p.reset = function(){
		let n = answers[0];

		while(n === answers[0]){
			n = father.publicFunction.random(5);
		}

		answers[0] = n;
		answers[1] = answers[0];

		while(answers[1] === answers[0]){
			answers[1] = father.publicFunction.random(5);
		}

		for(let i=0;i<answers.length;i++){
			kid[i].gotoAndStop('kid' + answers[i]);
			kid[i].regX = kid[i].getBounds().width/2;
			kid[i].regY = kid[i].getBounds().height/2;
		}

		p.mouseEnabled = true;
		for(let i=0;i<nums.length;i++){
			nums[i].goBack();
			nums[i].mouseEnabled = true;
		}
		count = 0;
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		for(let i=0;i<area.length;i++){
			if(father.publicFunction.pointInRect(e.localX,e.localY,area[i])){
				if(e.target.value===answers[i]){
					count ++;
					e.target.mouseEnabled = false;
					e.target.x = targPos[i][0];
					e.target.y = targPos[i][1];
					if(count === area.length){
						p.dispatchEvent(father.ANSWER_FINISH);
						p.mouseEnabled = false;
					}
					p.dispatchEvent(father.ANSWER_CORRECT);
					return;
				}else{
					p.dispatchEvent(father.ANSWER_INCORRECT);
					break;
				}
			}
		}
		e.target.goBack();
	}
})();