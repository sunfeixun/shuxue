(function() {
	let father = QuizPool;
	father.loader.add(['QUIZ11.png','QUIZ11.json'],father.quizPath);
	father.loader.add(['splitStar.png','splitStar.js','cubeNumber.js'],father.quizClass+'public/');
	father.Cube.setDefault({fillColor:'#9DC3E6',lineColor:'gray'});

	let dragPositionX = [365,502,640,777,915];
	let dragPositionY = 655;	

	father.buildDragger = function(repeat){
		repeat = repeat || 1;
		let cubenumber;
		let contain = new createjs.Container;

		contain.cursor = 'pointer';
		contain.on('mousedown',drag);
		contain.on('pressmove',drag);

		for(let i=0;i<repeat;i++){
			for(let j=1;j<=5;j++){
				cubenumber = new father.cubeNumber(j);
				cubenumber.x = dragPositionX[j-1];
				cubenumber.y = dragPositionY;
				cubenumber.ox = cubenumber.x;
				cubenumber.oy = cubenumber.y;
				contain.addChild(cubenumber);
			}
		}

		contain._rs = _rs;
		return contain;
	}

	function _rs(){
		for(let i=0;i<this.children.length;i++){
			this.children[i].x = this.children[i].ox;
			this.children[i].y = this.children[i].oy;
			this.children[i].mouseEnabled = true;
		}
	}

	father.Sprite = function(){
		if(!father._sprite){
			father._sprite = father.loader.getSprite('QUIZ11',true);
			father._sprite.arrow.set({scaleX:0.7,scaleY:0.8});
		}
		
		return father._sprite;
	}

	function drag(e){
		e.type==='mousedown' && e.currentTarget.setChildIndex(e.target,e.currentTarget.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

})();