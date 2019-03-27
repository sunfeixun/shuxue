(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson8.png','lesson8.json'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('图上有什么？',p);
			getImage('icecream',p).set({x:411,y:360});
			getImage('monkey',p).set({x:801,y:360});
			getImage('monkey',p).set({x:898,y:360});

			let txt = new father.text('小朋友，怎样才能把两个冰淇淋分给两个猴子呢？',40).alignCenter().set({x:640,y:640,alpha:0});
			p.addChild(txt);
			
			father.getClickBoard(p).on('click',function(e){
				e.target.visible = false;
				father.preferSound('click');
				TweenLite.to(txt,0.75,{alpha:1});
			},null,true);
			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('小朋友，怎样才能把两个冰淇淋分给两个猴子呢？',p);
			getImage('icecream',p).set({x:640,y:235});
			getImage('monkey',p).set({x:417,y:525});
			getImage('monkey',p).set({x:862,y:525});

			let line = new createjs.Shape;
			line.graphics.s('blue').ss(2).mt(597,328).lt(449,476).mt(678,328).lt(835,476);
			p.addChild(line);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('2可以分成1和1',p);
			new father.text('2',100).alignCenter().set({x:640,y:265}).addTo(p);
			new father.text('1',100).alignCenter().set({x:417,y:525}).addTo(p);
			new father.text('1',100).alignCenter().set({x:862,y:525}).addTo(p);

			let line = new createjs.Shape;
			line.graphics.s('blue').ss(2).mt(597,328).lt(449,476).mt(678,328).lt(835,476);
			p.addChild(line);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.go = function() {
		new father.title('2个一组成1个二',p);
		let apple = getImage('apple').set({scaleX:0.8,scaleY:0.8});
		let y1 = 230, y2 = 546;

		let applePos = [[152,y1],[486,y1],[275,y2],[348,y2]];
		let txtPos = [[774,y1,'1'],[1118,y1,'1'],[946,y2,'2']];

		let lineY1 = 287, lineY2 = 497;
		let line = new createjs.Shape;

		for(let i=0;i<applePos.length;i++){
			p.addChild(apple.clone()).set({x:applePos[i][0],y:applePos[i][1]});
		}

		for(let i=0;i<txtPos.length;i++){
			new father.text(txtPos[i][2],100).alignCenter().set({x:txtPos[i][0],y:txtPos[i][1]}).addTo(p);
		}

		p.addChild(line);

		line.graphics.s('blue').ss(2).mt(152,lineY1).lt(316,lineY2).lt(487,lineY1).mt(776,lineY1).lt(946,lineY2).lt(1113,lineY1);

		delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,4);

		p.go = function() {
			new father.title('想一想，把3块蛋糕放到2个盘子里，可以如何分？',p);
			getImage('cakes',p).set({x:640,y:300});
			getImage('plates',p).set({x:640,y:500});

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,5);

		p.go = function() {
			new father.title('想一想，把3块蛋糕放到2个盘子里，可以如何分？',p);
			let leftPart = p.addChild(new createjs.Container);
			let line = leftPart.addChild(new createjs.Shape);

			getImage('cakes',leftPart).set({scaleX:0.7,scaleY:0.7,x:326,y:211});
			getImage('plates',leftPart).set({scaleX:0.7,scaleY:0.7,x:326,y:334});
			new father.text('3',70).alignCenter().set({x:323,y:418}).addTo(leftPart);
			leftPart.t1 = new father.text('1',70).alignCenter().set({x:216,y:609}).addTo(leftPart);
			leftPart.t2 = new father.text('2',70).alignCenter().set({x:428,y:609}).addTo(leftPart);
			line.graphics.s('blue').ss(2).mt(301,454).lt(216,570).mt(343,454).lt(428,570);

			p.addChild(leftPart.clone(true));
			leftPart.x = 600;
			leftPart.t1.text = '2';
			leftPart.t2.text = '1';

			p.addChild(new createjs.Shape(new createjs.Graphics().s('black').ss(2).mt(640,171).lt(640,640)));

			delete p.go;
		}
	})();

	function getImage(str,_parent){
		sprite = sprite || father.loader.getSprite('lesson8',true);
		let s = sprite[str].clone();
		_parent && _parent.addChild(s);
		return s;
	}
})();
