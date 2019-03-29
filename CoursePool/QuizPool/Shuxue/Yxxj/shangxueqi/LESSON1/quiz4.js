(function() {
	let father = QuizPool;
	let p = new father.quiz(3);

	let n;
	let random = father.publicFunction.random;
	let circleContainer = p.addChild(new createjs.Container);

	p.go = function(){
		new father.title('小朋友,请你帮助小明数数它的玉米吧',p);
		father.addSplitStar(p);
		father.read('lijie4.mp3');
		let sprite = father.loader.getSprite('QUIZ1',true)
		let cloud = sprite.yumi.set({scaleX:0.3,scaleY:0.3});
		let cb;
		let cbCon = p.addChild(new createjs.Container);

		for(let i=1;i<=9;i++){
			cb = new father.cubeNumber(i);
			cb.y = 650;
			cb.x = 211 + 107*(i-1);
			cbCon.addChild(cb);

			circleContainer.addChild(cloud.clone());
		}

		cbCon.cursor = 'pointer';
		cbCon.on('click',onclick);

		p.addChild(sprite.boy).set({x:160,y:460,scaleX:0.8,scaleY:0.8});
		p.reset();

		delete p.go;
	}

	p.reset = function(){
		let _n = n;
		let addedCloud = [];

		while(_n===n){
			_n = random(9);
		}
		n = _n;	

		for(let i=0;i<circleContainer.children.length;i++){
			if(i<n){
				circleContainer.children[i].visible = true;
				circleContainer.children[i].set({x:random(300,1000),y:random(150,500)});
				while(detectPos(circleContainer.children[i],addedCloud)){
					circleContainer.children[i].set({x:random(300,1000),y:random(150,500)});
				}
				addedCloud.push(circleContainer.children[i]);
			}else{
				circleContainer.children[i].visible = false;
			}
		}
	}

	function detectPos(o,arr){

		for(let i=0;i<arr.length;i++){
			if(Math.abs(o.x-arr[i].x)<100 && Math.abs(o.y-arr[i].y)<100) return true;
		}

		return false;
	}

	function onclick(e){
		if(e.target.value()===n){
			p.dispatchEvent(father.ANSWER_CORRECT);
			p.dispatchEvent(father.ANSWER_FINISH);
		}else{
			p.dispatchEvent(father.ANSWER_INCORRECT);
		}
	}
})();