(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson1.json','lesson1.png'],father.lessonPath);
	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			getImage('bg',p).set({scaleX:1.66,scaleY:1.18,regX:0,regY:0});
			new father.title('这幅图画是一所开心的农场，小动物们都开开心心地玩耍，\n小朋友们这幅图里都有什么？',p).set({scaleX:.7,scaleY:.7,x:260});

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('小朋友，图画上有几只狗、几只鸡、几头猪、几只羊、\n几棵树呢？',p,'left');
			let sumX = 203,beginX = 252-sumX;
			let y = 375;

			father.createElement([
					{type:getImage('dog'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('hen'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('pig'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('sheep'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('tree'),attr:{x:beginX+=sumX,y:y}}
				],father.loader,p);
			bottomText('有一只狗、两只鸡、三头猪、四只羊、五棵树。',p);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('小朋友，图画上有几栋房子、几只花、几个苹果、\n几只向日葵、几只小鸟呢？',p,'left');
			let sumX = 213,beginX = 222-sumX;
			let y = 375;

			father.createElement([
					{type:getImage('house'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('flower'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('apple'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('xiangrikui'),attr:{x:beginX+=sumX,y:y}},
					{type:getImage('gezi'),attr:{x:beginX+=sumX,y:y}}
				],father.loader,p);
			bottomText(' 有6栋房子、7支花、8颗苹果、9支向日葵、10只小鸟。',p);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.custom.noFade = true;

		p.go = function() {
		new father.title('小朋友，这些数字都怎么写呢？',p);
		let arr = new Array;
		let instance = father.createElement([
				{type:getImage('num1'),attr:{x:640,y:202,addX:818},addToArray:arr},
				{type:getImage('num2'),attr:{x:350,y:387,scaleX:0.975,scaleY:0.975,addX:495},addToArray:arr},
				{type:getImage('num3'),attr:{x:930,y:387,addX:1083},addToArray:arr},
				{type:getImage('num4'),attr:{x:350,y:566,addX:501},addToArray:arr},
				{type:getImage('num5'),attr:{x:930,y:566,addX:1083},addToArray:arr}
			],father.loader,p);

		p.addChild(addMask(arr));

		delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,4);
		p.custom.noFade = true;

		p.go = function() {
			new father.title('小朋友，这些数字都怎么写呢？',p);
			let arr = new Array;
			let instance = father.createElement([
					{type:getImage('num6'),attr:{x:640,y:202,addX:793},addToArray:arr},
					{type:getImage('num7'),attr:{x:350,y:387,addX:503},addToArray:arr},
					{type:getImage('num8'),attr:{x:930,y:387,addX:1083},addToArray:arr},
					{type:getImage('num9'),attr:{x:350,y:566,addX:501},addToArray:arr},
					{type:getImage('num10'),attr:{x:930,y:566,addX:1084,addY:-1},addToArray:arr}
				],father.loader,p);

			p.addChild(addMask(arr));

			// ShuxueYxxj1.forTest(p.getChildAt(p.numChildren-1));

		delete p.go;
		}
	})();


	function getImage(imgname,_parent){
		sprite = sprite || father.loader.getSprite('lesson1',true);
		let s = sprite[imgname].clone();
		_parent && _parent.addChild(s);
		return s;
	}

	function bottomText(str,_parent){
		str = new father.text(str,40).alignCenter();
		str.x = 640;
		str.y = 640;
		str.alpha = 0;
		_parent.addChild(str);
		father.getClickBoard(_parent).on('click',function(e){
			father.preferSound('click');
			e.target.parent.removeChild(e.target);
			TweenLite.to(str,0.75,{alpha:1});
		},null,true)
	}

	function addMask(objs){
		let con = new createjs.Container;
		let msk;

		for(let i=0;i<objs.length;i++){
			msk = getImage('tianzige',con);
			msk.y = objs[i].addY? objs[i].y+objs[i].addY:objs[i].y;
			msk.x = objs[i].addX;
		};

		con.cursor = 'pointer';
		con.on('click',function(e){
			father.preferSound('click');
			TweenLite.to(e.target,0.75,{alpha:0});
			e.target.mouseEnabled = false;
		});

		return con;
	}
})();
