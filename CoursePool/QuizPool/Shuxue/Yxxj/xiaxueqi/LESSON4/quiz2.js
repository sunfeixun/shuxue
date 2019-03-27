
(function(){
	let father = QuizPool;

	let p = new father.quiz(1);

	let circleGroup1, circleGroup2;
	let answer;
	let order = new father.group(0,1,2);
	let position1, position2;
	let hideCircle, curGroup;
	let finished = false;

	father.loader.add(['splitStar.png','q2.mp3'],father.quizPath);

	p.go = function(){
		new father.title('你知道缺少的是哪个颜色吗？',p);
		// father.loader.playSound('q2.mp3');
		father.read('q2.mp3');

		let shape;
		let colors = ['green','yellow','red'];
		let circlePadding = 124;
		let answerCon = p.addChild(new createjs.Container);

		circleGroup1 = new father.group;

		new father.text('你知道缺少的是哪个颜色吗？',p);

		for(let i=0;i<3;i++){
			shape = new createjs.Shape;
			shape.graphics.s('black').ss(1).f(colors[i]).dc(0,0,30);
			p.addChild(shape);
			circleGroup1.array.push(shape);
		}

		circleGroup1.set({y:360}).sumAttr('x',329,circlePadding);
		circleGroup2 = circleGroup1.clone().sumAttr('x',circleGroup1.array[circleGroup1.array.length-1].x + circlePadding,circlePadding);
		circleGroup2.addTo(p);

		position1 = circleGroup1.getAttrToArray('x');
		position2 = circleGroup2.getAttrToArray('x');

		answer = circleGroup2.clone();
		answer.set({y:650}).sumAttr('x',502,circlePadding).addTo(answerCon);
		answer.setAttrFromSelf({ox:'x',oy:'y'});

		answerCon.cursor = 'pointer';
		answerCon.on('click',judge);

		// 星星分隔线
		father.addSplitStar && father.addSplitStar(p);

		freshPos();

		delete p.go;
	}

	p.reset = function(){
		TweenLite.killTweensOf(answer);
		answer.set({visible:true}).setAttrFromSelf({x:'ox',y:'oy'});
		p.mouseEnabled = true;
		freshPos();
	}

	function judge(e){
		if(TweenMax.isTweening(answer)) return;
		TweenLite.to(e.target,0.75,{x:hideCircle.x,y:hideCircle.y,onComplete:_judge,onCompleteParams:[e.target]});
	}

	function _judge(obj){
		if(answer.array.indexOf(obj)===curGroup.array.indexOf(hideCircle)){
			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);
			p.mouseEnabled = false;
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
			obj.x = obj.ox;
			obj.y = obj.oy;
		}
	}

	function freshPos(){
		let c, rd;
		order.randomOrder();
		for(let i=0;i<order.array.length;i++){
			c = order.array[i];
			circleGroup1.array[i].x = position1[c];
			circleGroup2.array[i].x = position2[c];
			circleGroup1.set({visible:true});
			circleGroup2.set({visible:true});
		}

		rd = QuizPool.publicFunction.random(0,2);
		curGroup = QuizPool.publicFunction.random()? circleGroup1:circleGroup2;
		hideCircle = curGroup.array[rd];
		hideCircle.visible = false;
	}
})();