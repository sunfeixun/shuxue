(function() {
	let father = QuizPool;
	let p = new father.quiz(4);

	let starGroup = new father.group;
	let targBound, targX = 935, targY = 335;

	p.go = function(){
		new father.title('小朋友，请你填一填。',p);
		father.addSplitStar(p);
		let sprite = father.loader.getSprite('QUIZ',true);

		// 题干部分
		let rect = new createjs.Shape;
		let datas = [[273,335],[403,335]];
		let star;
		rect.graphics.f('#00B0F0').rr(0,0,315,315,10);
		rect.x = 189;
		rect.y = 179;
		p.addChild(rect);

		for(let i=0;i<datas.length;i++){
			star = sprite.star.clone();
			star.x = datas[i][0];
			star.y = datas[i][1];
			p.addChild(star);
		}

		p.addChild(new father.text('<',140).alignCenter()).set({x:640,y:340});

		rect = rect.clone();
		rect.x = 775;
		rect.setBounds(0,0,315,315);
		targBound = rect.getTransformedBounds();
		p.addChild(rect);

		// 星星部分
		let dragStarContainer = p.addChild(new createjs.Container);
		starGroup.array.push(createStar(2),createStar(3),createStar(4));
		starGroup.set({y:650}).sumAttr('x',300,330).setAttrFromSelf({ox:'x',oy:'y'}).addTo(dragStarContainer);

		dragStarContainer.on('mousedown',drag);
		dragStarContainer.on('pressmove',drag);
		dragStarContainer.on('pressup',judge);

		delete p.go;

		function createStar(n){
			let con = new createjs.Container;
			let star, bound;
			let shape = new createjs.Shape;
			bound = sprite.star.getTransformedBounds();
			for(let i=0;i<n;i++){
				star = sprite.star.clone();
				star.regX = 0;
				star.x = (bound.width + 10) * i;
				con.addChild(star);
			}

			con.addChild(shape);
			bound = con.getBounds();
			shape.graphics.f('rgba(255,255,255,0.01)').r(bound.x,bound.y,bound.width,bound.height);

			con.mouseChildren = false;
			con.regX = con.getBounds().width/2;
			con.value = n;
			return con;
		}
	}

	p.reset = function(){
		p.mouseEnabled = true;
		starGroup.setAttrFromSelf({x:'ox',y:'oy'}).freshAttr('x').setAttrFromSelf({ox:'x',oy:'y'});
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.setChildIndex-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function judge(e){
		if(father.publicFunction.pointInRect(e.localX,e.localY,targBound)){
			if(e.target.value > 2){
				p.mouseEnabled = false;
				e.target.x = targX;
				e.target.y = targY;
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