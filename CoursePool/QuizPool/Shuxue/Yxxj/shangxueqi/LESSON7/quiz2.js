(function() {
	let father = QuizPool;
	let p = new father.quiz(1);

	let house;
	let area = {x:888,y:515,width:88,height:62};
	let nums = [];
	let answer;
	let targPos = [928,550];
	let numText = new father.text('0',40).addTo(p).set({x:511,y:549}).alignCenter();

	p.go = function(){
		new father.title('小朋友，请你填一填。',p);
		father.addSplitStar(p);
		let sprite = father.loader.getSprite('QUIZ7',true);
		
		// 题干;
		new father.text('从左数，  是第 座。从右数，  是第     座。',40).alignCenter().set({x:640,y:550}).addTo(p);
		p.addChild(sprite.allHouse).set({x:640,y:330});

		house = [
			sprite.house1.clone().set({x:398,y:545,scaleX:0.6,scaleY:0.6}),
			sprite.house1.clone().set({x:777,y:545,scaleX:0.6,scaleY:0.6})
			];

		p.addChild(house[0],house[1]);

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

		for(let i=0;i<house.length;i++){
			house[i].gotoAndStop('house'+answer);
			house[i].regX = house[i].getBounds().width/2;
			house[i].regY = house[i].getBounds().height/2;			
		}
		numText.text = answer;
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,area)){
			if(e.target.value===6 - answer){
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