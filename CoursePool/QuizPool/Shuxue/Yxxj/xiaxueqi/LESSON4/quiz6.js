(function(){
	let father = QuizPool;
	let p = new father.quiz(5);

	let handGroup1, handGroup2;
	let handflection = new father.group;
	let order = new father.group(0,0,0,1,1,1);
	let targs = [];
	let answer = new father.group;

	father.loader.add(['quiz6.json','quiz6.png','q6.mp3'],father.quizPath);

	p.go = function(){
		// father.loader.playSound('q6.mp3');
		father.read('q6.mp3');
		new father.title('请你按规律将小手拖到正确的位置',p);
		let sprite = father.loader.getSprite('quiz6',true,{scaleX:0.7,scaleY:0.7});
		let i;

		// 虚线
		let dash = new createjs.Shape;
		dash.graphics.s('black').ss(2).sd([4,4]).mt(0,-120).lt(0,120);
		p.addChild(dash).set({x:640,y:360});

		// 题干

		let padding = sprite.hand1.getTransformedBounds().width + 10;
		handGroup1 = new father.group;
		handGroup2 = new father.group;

		for(let i=0;i<order.array.length;i++){
			handGroup1.array.push(sprite.hand1.clone());
			handGroup2.array.push(sprite.hand1.clone());
		}

		handGroup1.set({y:360}).sumAttr('x',212,padding).addTo(p);
		handGroup2.set({y:360}).sumAttr('x',684,padding).addTo(p);

		// 选项
		let answerCon = p.addChild(new createjs.Container);

		for(let i=0;i<2;i++){
			answer.array.push(sprite.hand1.clone().set({x:586}));
			answer.array.push(sprite.hand2.clone().set({x:692}));
		}

		answer.set({y:625}).addTo(answerCon).setAttrFromSelf({ox:'x',oy:'y'});
		answerCon.on('mousedown',drag);
		answerCon.on('pressmove',drag);
		answerCon.on('pressup',judge);

		// 星星分隔线
		father.addSplitStar && father.addSplitStar(p);
		fresh();

		delete p.go;
	}

	p.reset = function(){
		fresh();
		answer.set({mouseEnabled:true}).setAttrFromSelf({x:'ox',y:'oy'});
	}

	function fresh(){
		order.randomOrder();

		for(let i=1;i<3;i++){
			if(order.array[i]!==order.array[i-1]){
				pass();
				return;
			}
		}

		fresh();
	}

	function pass(){

		for(let i=0;i<order.array.length;i++){
			handGroup1.array[i].gotoAndStop(order.array[i]);
			handGroup2.array[i].gotoAndStop(order.array[i]);
			handGroup2.array[i].visible = true;
			handflection.array[i] = handGroup2.array[i];
		}

		targs[0] = handflection.chooseOne();
		targs[1] = handflection.chooseOne();

		targs[0].visible = targs[1].visible = false;
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target, e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		for(let i=0;i<targs.length;i++){
			if(father.publicFunction.pointInRect(e.localX,e.localY,targs[i].getTransformedBounds())){
				if(e.target.currentFrame === targs[i].currentFrame){
					e.target.x = targs[i].x;
					e.target.y = targs[i].y;
					e.target.mouseEnabled = false;
					targs.splice(i,1);
					p.dispatchEvent(father.ANSWER_CORRECT);
					if(targs.length===0){
						p.dispatchEvent(father.ANSWER_FINISH);
						answer.set({mouseEnabled:false});
					}
					return 
				}else{
					p.dispatchEvent(father.ANSWER_INCORRECT);
				}
			}
		}

		e.target.x = e.target.ox;
		e.target.y = e.target.oy;
	}

})();