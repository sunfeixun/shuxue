(function(){
	let father = QuizPool;

	let p = new father.quiz(3);
	let shapeGroup1, shapeGroup2;
	let answers;
	let posX1, posX2; //记录两个shapeGroup的x位置用来随机刷新
	let targX, targY;
	let count = 0;
	let finished = false;
	
	const dropArea = {x:813,y:311,width:308,height:126};
	const order = new father.group(0,1,2);

	father.loader.add(['quiz4.json','quiz4.png','splitStar.png','q4.mp3'],father.quizPath);

	p.go = function(){
		new father.title('你能给小圆点和它的好朋友排队吗？',p);
		// father.loader.playSound('q4.mp3');
		father.read('q4.mp3');

		//创建题干部分
		let sprite = father.loader.getSprite('quiz4',true,{scaleX:0.5,scaleY:0.5});
		let shape;
		let shapePadding = 105;
		targY = 369;

		shapeGroup1 = new father.group;

		for(let i=1;i<=3;i++){
			shape = sprite['shape'+i];
			shapeGroup1.array.push(shape);
			p.addChild(shape);
		}

		shapeGroup1.set({y:targY}).sumAttr('x',224,shapePadding);
		shapeGroup2 = shapeGroup1.clone().set({x:"+=" + shapePadding*3}).addTo(p);

		posX1 = shapeGroup1.getAttrToArray('x');
		posX2 = shapeGroup2.getAttrToArray('x');

		//创建答题拖拽部分;
		let dragger = p.addChild(new createjs.Container);
		answers = shapeGroup1.clone().set({x:'+=' + shapePadding*6});
		targX = answers.getAttrToArray('x');
		answers.set({x:'-=' + shapePadding*6,y:640}).addTo(dragger).setAttrFromSelf({ox:'x',oy:'y'});

		dragger.on('mousedown',drag);
		dragger.on('pressmove',drag);
		dragger.on('pressup',judge);

		//创建3条线
		let line = new createjs.Shape;
		line.graphics.s('black').ss(2).mt(0,0).lt(65,0);
		line.y = 420;

		p.addChild(line.clone()).set({x:824});
		p.addChild(line.clone()).set({x:927});
		p.addChild(line.clone()).set({x:1033});

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
			shapeGroup1.array[n].x = posX1[i];
			shapeGroup2.array[n].x = posX2[i];
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
				e.target.x = e.target.targX;
				e.target.y = targY;
				e.target.mouseEnabled = false;
				count ++;
				p.dispatchEvent(father.ANSWER_CORRECT);
				count>=3 && p.dispatchEvent(father.ANSWER_FINISH);
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