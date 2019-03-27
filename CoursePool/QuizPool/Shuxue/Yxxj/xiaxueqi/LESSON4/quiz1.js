(function(){
	let father = QuizPool;

	let p = new father.quiz(0);
	let circleGroup1, circleGroup2;
	let answers;
	let posX1, posX2; //记录两个circleGroup的x位置用来随机刷新
	let targX, targY;
	let count = 0;
	let finished = false;
	
	const dropArea = {x:813,y:311,width:308,height:126};
	const order = new father.group(0,1,2);

	father.loader.add(['splitStar.png','q1.mp3'],father.quizPath);
	father.addSplitStar = function(addto){
		let star = father.loader.getImage('splitStar.png','center');
		addto.addChild(star).set({x:640,y:550});
	}

	p.go = function(){
		// father.loader.playSound('q1.mp3');
		father.read('q1.mp3');
		new father.title('你能把后面的原点排出来吗？',p);

		//创建题干部分
		let colors = ['green','yellow','red'];
		let circle;
		let circlePadding = 105;
		targY = 369;

		circleGroup1 = new father.group;

		for(let i=1;i<=3;i++){
			circle = new createjs.Shape;
			circle.graphics.s('black').ss(1).f(colors[i-1]).dc(0,0,30);
			circleGroup1.array.push(circle);
			p.addChild(circle);
		}

		circleGroup1.set({y:targY}).sumAttr('x',224,circlePadding);
		circleGroup2 = circleGroup1.clone().set({x:"+=" + circlePadding*3}).addTo(p);

		posX1 = circleGroup1.getAttrToArray('x');
		posX2 = circleGroup2.getAttrToArray('x');

		//创建答题拖拽部分;
		let dragger = p.addChild(new createjs.Container);
		answers = circleGroup1.clone().set({x:'+=' + circlePadding*6});
		targX = answers.getAttrToArray('x');
		answers.set({x:'-=' + circlePadding*6,y:640}).addTo(dragger).setAttrFromSelf({ox:'x',oy:'y'});

		dragger.on('mousedown',drag);
		dragger.on('pressmove',drag);
		dragger.on('pressup',judge);

		//创建3条线
		let shape = new createjs.Shape;
		shape.graphics.s('black').ss(2).mt(0,0).lt(65,0);
		shape.y = 420;

		p.addChild(shape.clone()).set({x:824});
		p.addChild(shape.clone()).set({x:927});
		p.addChild(shape.clone()).set({x:1033});

		// 星星分隔线
		father.addSplitStar && father.addSplitStar(p);

		freshOrder();


		delete p.go;
	}

	p.reset = function(){		
		freshOrder();
		answers.setAttrFromSelf({x:'ox',y:'oy'}).set({mouseEnabled:true});
		count = 0;
	}
	
	function freshOrder(){
		let n;
		order.randomOrder();

		for(let i=0;i<order.array.length;i++){
			n = order.array[i];
			circleGroup1.array[n].x = posX1[i];
			circleGroup2.array[n].x = posX2[i];
			answers.array[n].targX = targX[i];
		}
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,dropArea)){
			// if(answers.array.indexOf(e.target)===order.array[count]){
			if(Math.abs(e.localX-e.target.targX)<=40){
				// e.target.x = targX[count];
				e.target.x = e.target.targX;
				e.target.y = targY;
				e.target.mouseEnabled = false;
				count ++;
				p.dispatchEvent(father.ANSWER_CORRECT);
				count >=3 && p.dispatchEvent(father.ANSWER_FINISH);
			}else{
				p.dispatchEvent(father.ANSWER_INCORRECT);
				e.target.x = e.target.ox;
				e.target.y = e.target.oy;
			}
		}else{
			e.target.x = e.target.ox;
			e.target.y = e.target.oy;
		}
	}

})();