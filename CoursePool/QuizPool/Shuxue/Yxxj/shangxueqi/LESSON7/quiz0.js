(function() {
	let father = QuizPool;
	father.loader.add(['QUIZ7.json','QUIZ7.png'],father.quizPath);
	father.loader.add(['splitStar.png','splitStar.js'],father.quizClass+'public/');

	(function() {
		let size = 40;

		function dragnumber(n){
			this.Container_constructor();
			let txt = new father.text(n.toString(),size*0.8).alignCenter();
			let circle = new createjs.Shape;
			circle.graphics.f('#3A9ADF').dc(0,0,size/2);
			this.mouseChildren = false;
			this.value = n;
			this.addChild(circle,txt);
		}

		let p = createjs.extend(dragnumber,createjs.Container);

		p.setBackPosition = function(){
			this.ox = this.x;
			this.oy = this.y;
		}

		p.goBack = function(){
			this.x = this.ox;
			this.y = this.oy;
		}

		father.dragNumber = createjs.promote(dragnumber,'Container');
	})();
})();