(function() {
	let father = QuizPool;
	let p = new father.quiz(0);

	let house;
	let area = {x:711,y:515,width:88,height:62};
	let nums = [];
	let answer;
	let targPos = [753,550];

	p.go = function(){
		new father.title('小朋友，请你填一填。',p);
		father.addSplitStar(p);
		let sprite = father.loader.getSprite('QUIZ7',true);
		
		// 题干;
		new father.text('从右数，   是第     座。',40).alignCenter().set({x:640,y:550}).addTo(p);
		p.addChild(sprite.allHouse).set({x:640,y:330});

		house = sprite.house1.clone().set({x:585,y:540,scaleX:0.6,scaleY:0.6});

		p.addChild(house);

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
		let n = answer;

		while(n===answer){
			n = father.publicFunction.random(5);
		}

		answer = n;

		p.mouseEnabled = true;
		for(let i=0;i<nums.length;i++){
			nums[i].goBack();
		}

		house.gotoAndStop('house'+answer);
		house.regX = house.getBounds().width/2;
		house.regY = house.getBounds().height/2;
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,area)){
			if(e.target.value===answer){
				p.mouseEnabled = false;
				e.target.x = targPos[0];
				e.target.y = targPos[1];
				p.dispatchEvent(father.ANSWER_CORRECT);
				p.dispatchEvent(father.ANSWER_FINISH);
				return;
			}else{
				p.dispatchEvent(father.ANSWER_INCORRECT);
			}
		}
		e.target.goBack();
	}
})();