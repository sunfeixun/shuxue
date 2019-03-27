(function() {
	let father = QuizPool;
	let p = new father.quiz(2);

	const positions = new father.group;
	const nums = [];
	let sings;
	let count = 0;

	p.go = function(){
		new father.title('小朋友，请你填一填。',p);
		father.addSplitStar(p);

		let beginX, sumX = 302, max = 4, beginY = 220, sumY = 130, _beginX = 183;
		let datas = [[3,2],[2,2],[5,3],[4,3],[4,4],[1,2],[4,2],[5,2],[4,1],[5,1],[3,1],[1,1]];
		let _data;
		let num;

		beginX = _beginX;

		for(let i=0;i<datas.length;i++){
			_data = datas[i];

			num = new quizTempFunction.compareNumber(_data[0],_data[1]);
			num.x = beginX;
			num.y = beginY;
			p.addChild(num);
			nums.push(num);

			positions.array.push([num.x,num.y]);

			beginX += sumX;

			if((i+1)%4===0){
				beginY += sumY;
				beginX = _beginX;
			}			
		}

		// 拖拽的符号
		let sign, signContainer = p.addChild(new createjs.Container);
		let y = 660;

		datas = [['>',387],['=',640],['<',892]];

		for(i=0;i<datas.length;i++){
			_data = datas[i];
			for(let j=0;j<12;j++){
				sign = new quizTempFunction.sign(_data[0]);
				sign.ox = sign.x = _data[1];
				sign.oy = sign.y = y;
				signContainer.addChild(sign);

			}
		}

		signContainer.on('mousedown',drag);
		signContainer.on('pressmove',drag);
		signContainer.on('pressup',judge);
		sings = signContainer.children;

		delete p.go;
	}

	p.reset = function(){
		count = 0;
		positions.randomOrder();
		for(let i=0;i<nums.length;i++){
			nums[i].x = positions.array[i][0];
			nums[i].y = positions.array[i][1];
		}

		for(let i=0;i<sings.length;i++){
			sings[i].mouseEnabled = true;
			sings[i].x = sings[i].ox;
			sings[i].y = sings[i].oy;
		}
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		for(let i=0;i<nums.length;i++){
			if(father.publicFunction.pointInRect(e.localX,e.localY,nums[i].getTransformedBounds())){
				if(e.target.value === nums[i].value){
					e.target.x = nums[i].x;
					e.target.y = nums[i].y;
					e.target.mouseEnabled = false;
					p.dispatchEvent(father.ANSWER_CORRECT);
					count ++;
					count === nums.length && p.dispatchEvent(father.ANSWER_FINISH);
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