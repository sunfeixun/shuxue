(function() {
	let father = QuizPool;
	let p = new father.quiz(0);

	let questionGroups = new father.group;
	let numGroup = new father.group;
	let xPos = new father.group;
	let signs;
	let count = 0;

	p.go = function(){
		new father.title('小朋友，请你填一填。',p);
		father.addSplitStar(p);

		// 图片部分
		let datas = [
			[['monkey',2],['peach',2]],
			[['flower',2],['butterfly',3]],
			[['chiken',3],['bsl',2]]
		];
		let _data;

		for(let i=0;i<datas.length;i++){
			_data = datas[i];
			questionGroups.array.push(new quizTempFunction.compare(_data[0],_data[1]));
		}

		questionGroups.addTo(p).set({y:200}).sumAttr('x',230,400);
		xPos.array = questionGroups.getAttrToArray('x');


		// 数字部分
		datas = [[2,2],[2,3],[3,2]];

		for(i=0;i<datas.length;i++){
			_data = datas[i];
			numGroup.array.push(new quizTempFunction.compareNumber(_data[0],_data[1]));
		}

		numGroup.addTo(p).set({y:550});

		// 对齐位置，关联

		for(i=0;i<questionGroups.array.length;i++){
			questionGroups.array[i].num = numGroup.array[i];
			questionGroups.array[i].num.x = questionGroups.array[i].x;
		}


		// 拖拽的符号
		let sign, signContainer = p.addChild(new createjs.Container);
		let y = 660;

		datas = [['>',387],['=',640],['<',892]];

		for(i=0;i<datas.length;i++){
			_data = datas[i];
			for(let j=0;j<3;j++){
				sign = new quizTempFunction.sign(_data[0]);
				sign.ox = sign.x = _data[1];
				sign.oy = sign.y = y;
				signContainer.addChild(sign);
			}
		}

		// signGroup.clone().addTo(signContainer);

		signContainer.on('mousedown',drag);
		signContainer.on('pressmove',drag);
		signContainer.on('pressup',judge);
		signs = signContainer.children;
		// p.on('pressmove',function(e){e.target.set({x:e.localX,y:e.localY})});

		delete p.go;
	}

	p.reset = function(){
		xPos.randomOrder();
		for(let i=0;i<questionGroups.array.length;i++){
			numGroup.array[i].x = questionGroups.array[i].x = xPos.array[i];
		}

		for(let i=0;i<signs.length;i++){
			signs[i].mouseEnabled = true;
			signs[i].x = signs[i].ox;
			signs[i].y = signs[i].oy;
		}
		count = 0;
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		for(let i=0;i<numGroup.array.length;i++){
			if(father.publicFunction.pointInRect(e.localX,e.localY,numGroup.array[i].getTransformedBounds())){
				if(e.target.value === numGroup.array[i].value){
					e.target.x = numGroup.array[i].x;
					e.target.y = numGroup.array[i].y;
					e.target.mouseEnabled = false;
					count ++;
					p.dispatchEvent(father.ANSWER_CORRECT);
					count >= 3 && p.dispatchEvent(father.ANSWER_FINISH);
					return;
				}else{
					p.dispatchEvent(father.ANSWER_INCORRECT);
					break;
				}
			}
		}

		e.target.x = e.target.ox;
		e.target.y = e.target.oy;
	}

})();