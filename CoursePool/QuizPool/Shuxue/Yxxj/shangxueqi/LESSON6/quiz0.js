let quizTempFunction = {};

(function() {
	let father = QuizPool;
	let sprite;
	father.loader.add(['QUIZ.png','QUIZ.json'],father.quizPath);
	father.loader.add(['splitStar.png','splitStar.js'],father.quizClass+'public/');

	(function() {
		const horizPadding = 25, vertiPadding = 20;

		function compare(left,right){
			this.Container_constructor();
			sprite = sprite || father.loader.getSprite('QUIZ',true);

			let str1 = left[0], str2 = right[0];
			let n1 = left[1], n2 = right[1];
			let instance;
			let i;
			let y = 0;
			let bound;
			let height = Math.max(sprite[str1].getTransformedBounds().height,sprite[str2].getTransformedBounds().height);

			for(i=0;i<n1;i++){
				instance = sprite[str1].clone();
				bound = instance.getTransformedBounds();
				instance.x = - bound.width/2 - horizPadding;
				instance.y = y;
				y += height + vertiPadding;
				this.addChild(instance);
			}

			y = 0;

			for(i=0;i<n2;i++){
				instance = sprite[str2].clone();
				bound = instance.getTransformedBounds();
				instance.x = bound.width/2 + horizPadding;
				instance.y = y;
				y += height + vertiPadding;
				this.addChild(instance);
			}
		}

		let p = createjs.extend(compare,createjs.Container);


		quizTempFunction.compare = createjs.promote(compare,'Container');
	})();

	(function(){
		const radius = 20, padding = 40;

		function compareNumber(n1,n2){
			this.Container_constructor();
			let circle = new createjs.Shape;
			circle.graphics.s('black').ss(2).dc(0,0,radius);
			this.addChild(circle);

			let txt1 = new father.text(n1.toString(),radius*2).alignCenter();
			let txt2 = new father.text(n2.toString(),radius*2).alignCenter();

			txt1.x = -txt1.getTransformedBounds().width/2 - padding;
			txt2.x = txt2.getTransformedBounds().width/2 + padding;
			this.addChild(txt1,txt2);
			if(n1 > n2){
				this.value = '>';
			}else if(n1 < n2){
				this.value = '<';
			}else if(n1 === n2){
				this.value = '=';
			}
		}

		let p = createjs.extend(compareNumber,createjs.Container);


		quizTempFunction.compareNumber = createjs.promote(compareNumber,'Container');
	})();

	(function() {
		const size = 40;
		function sign(str){
			this.Container_constructor();
			this.mouseChildren = false;
			let txt = new father.text(str,size).alignCenter();
			let shape = new createjs.Shape;
			let bound = txt.getTransformedBounds();
			shape.graphics.f('rgba(255,255,255,0.01)').r(bound.x,bound.y,bound.width,bound.height);
			this.addChild(txt,shape);
			this.value = str;
		}

		let p = createjs.extend(sign,createjs.Container);

		quizTempFunction.sign = createjs.promote(sign,'Container');
	})();
})();



