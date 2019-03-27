(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	father.loader.add(['part3.png','part3.json'],father.lessonPath);

	const txts = ['把相同颜色的食物分出来吧','请你按照我的分类，把下面的分出来','你可以按什么属性分呢？','你能给这样的分类起一个名字吗？'];
	const text = new father.text(txts[0],40);
	let prevnext;
	const ques = new father.orderContent;

	p.go = function() {
		let sprite = father.loader.getSprite('part3',true,{scaleX:0.75,scaleY:0.75,alpha:0});
		let pos = [[156,532],[281,635],[431,554],[651,607],[977,623],[819,546],[1117,537],[1106,653]];
		let prevnextCon = p.addChild(new createjs.Container);
		let fruitCon = p.addChild(new createjs.Container);

		prevnextCon.cursor = 'pointer';
		prevnextCon.on('click',swip);
		prevnext = new father.prevNext;
		prevnext.addTo(prevnextCon);

		fruitCon.cursor = 'pointer';
		fruitCon.on('mousedown',drag);
		fruitCon.on('pressmove',drag);

		p.addChild(text).set({x:640,y:100,textAlign:'center',textBaseline:'middle'});

		for(let i=0;i<3;i++){
			ques.push(groupObject());
		}

		ques.push(sprite.que4);
		sprite.que4.set({x:640,y:500});
		p.addChild(sprite.que4);

		let rect1 = new createjs.Shape(new createjs.Graphics().s('black').ss(2).rr(0,0,517,273,20)).set({x:80,y:154,alpha:0});
		let rect2 = rect1.clone().set({x:688});

		ques.getContentAt(1).push(rect1,rect2);

		p.addChild(rect1,rect2);

		TweenLite.set(ques.getContentAt(0),{alpha:1});
		delete p.go;

		function groupObject() {
			let arr = [];
			let q;
			for(let i=1;i<=8;i++){
				q = sprite['f'+i].clone().set({x:pos[i-1][0],y:pos[i-1][1]});
				fruitCon.addChild(q);
				arr.push(q);
			}

			return arr;
		}
	}


	function swip(e) {
		if(ques.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !ques.isHead();
		prevnext.next.visible = !ques.isEnd();
		text.text = txts[ques.order];
	}

	function drag(e){
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}
})();