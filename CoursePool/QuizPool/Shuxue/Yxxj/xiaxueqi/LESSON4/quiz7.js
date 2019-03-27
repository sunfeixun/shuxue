(function() {
	let father = QuizPool;
	let p = new father.quiz(6);

	father.loader.add(['quiz7.png','quiz7.json','q7.mp3'],father.quizPath);

	let cubeGroup1, cubeGroup2;
	let answer;
	let order = new father.group(0,1,2,3,4);
	let position1, position2;
	let hideCube;

	p.go = function(){
		// father.loader.playSound('q7.mp3');
		father.read('q7.mp3');
		new father.title('请你将方块拖动到正确位置',p);

		let sprite = father.loader.getSprite('quiz7',true,{scaleX:0.55,scaleY:0.55});
		// 虚线
		let dash = new createjs.Shape;
		dash.graphics.s('black').ss(2).sd([4,4]).mt(0,-120).lt(0,120);
		p.addChild(dash).set({x:640,y:360});

		// 题干
		let padding = 189;
		let cubeY = 360;
		cubeGroup1 = new father.group;
		cubeGroup2 = new father.group;

		for(i=1;i<=3;i++){
			cubeGroup1.array.push(sprite['num'+i].clone());
			cubeGroup2.array.push(sprite['num'+i].clone());
		}

		cubeGroup1.set({y:cubeY}).sumAttr('x',168,padding).addTo(p);
		cubeGroup2.set({y:cubeY}).sumAttr('x',734,padding).addTo(p);

		// 星星分隔线
		father.addSplitStar && father.addSplitStar(p);

		// 题干
		let answerCon = p.addChild(new createjs.Container);
		answer = cubeGroup1.clone().set({y:630}).sumAttr('x',459,padding).addTo(answerCon);
		answer.setAttrFromSelf({ox:'x',oy:'y'});

		answerCon.on('mousedown',drag);
		answerCon.on('pressmove',drag);
		answerCon.on('pressup',judge);

		fresh();

		delete p.go;
	}

	p.reset = function(){
		p.mouseEnabled = true;
		answer.setAttrFromSelf({x:'ox',y:'oy'});
		fresh();
	}

	function fresh(){
		let arr = new Array().concat(order.array);
		let ans = new Array().concat(answer.array);
		order.randomOrder();

		for(let i=0;i<3;i++){
			cubeGroup1.array[i].gotoAndStop(order.array[i]);
			cubeGroup2.array[i].gotoAndStop(order.array[i]);
			cubeGroup2.array[i].visible = true;
		}

		hideCube = cubeGroup2.chooseOne(true);
		hideCube.visible = false;

		order.chooseOne.call(ans).gotoAndStop(hideCube.currentFrame);

		arr.splice(arr.indexOf(hideCube.currentFrame),1);
		ans[0].gotoAndStop(order.chooseOne.call(arr));
		ans[1].gotoAndStop(order.chooseOne.call(arr));
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target, e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,hideCube.getTransformedBounds())){
			if(e.target.currentFrame===hideCube.currentFrame){
				p.mouseEnabled = false;
				e.target.x = hideCube.x;
				e.target.y = hideCube.y;
				p.dispatchEvent(father.ANSWER_CORRECT);
				p.dispatchEvent(father.ANSWER_FINISH);
				return;
			}else{
				p.dispatchEvent(father.ANSWER_INCORRECT);
			}
		}
		e.target.x = e.target.ox;
		e.target.y = e.target.oy;
	}
})();