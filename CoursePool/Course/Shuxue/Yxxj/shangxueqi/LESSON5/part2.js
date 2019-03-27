(function(){
	let father = projectData.courseInterface;
	father.loader.add(['lesson5.json','lesson5.png'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('风车有几个？',p);
			getLandscape(p);
			let txt = bottomText('这幅图中还有哪些东西的个数可以用1来表示？',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('小房子有几个？',p);
			getLandscape(p);
			let txt = bottomText('请小朋友观察教室里的物品，哪些是可以用数2来表示。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('绵羊有几个？',p);
			getLandscape(p);
			let txt = bottomText('请小朋友观察教室里的物品，哪些是可以用数3来表示。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.go = function() {
			new father.title('向日葵有几个？',p);
			getLandscape(p);
			let txt = bottomText('请小朋友观察教室里的物品，哪些是可以用数4来表示。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);		

		delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,4);

		p.go = function() {
			new father.title('南瓜有几个？',p);
			getLandscape(p);
			let txt = bottomText('请小朋友观察教室里的物品，哪些是可以用数5来表示。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);	

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,5);

		p.go = function() {
			new father.title('1怎么写呢？',p);
			getNumImage('1',p);
			let txt = middleText('1像铅笔细又长',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();	

	(function() {
		let p = new father.part(2,6);

		p.go = function() {
			new father.title('2怎么写呢？',p);
			getNumImage('2',p);
			let txt = middleText('2像小鸭水中游。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,7);

		p.go = function() {
			new father.title('3怎么写呢？',p);
			getNumImage('3',p);
			let txt = middleText('3像耳朵听声音。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,8);

		p.go = function() {
			new father.title('4怎么写呢？',p);
			getNumImage('4',p);
			let txt = middleText('4像小旗迎风飘。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,9);

		p.go = function() {
			new father.title('5怎么写呢？',p);
			getNumImage('5',p);
			let txt = middleText('5像秤钩称重量。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	function getLandscape(_parent){
		sprite = sprite || father.loader.getSprite('lesson5',true);
		return _parent.addChild(sprite.landscape.clone().set({x:640,y:340}));
	}

	function bottomText(str,_parent){
		let txt = new father.text(str,35).alignCenter();
		txt.x = 640;
		txt.y = 660;
		txt.visible = false;
		_parent.addChild(txt);
		return txt;
	}

	function onclick(e,txt){
		father.preferSound('click');
		e.target.visible = false;
		txt.visible = true;
		TweenLite.from(txt,0.75,{alpha:0});
	}

	function getNumImage(n,_parent){
		return _parent.addChild(sprite['n'+n]).set({x:390,y:360});
	}

	function middleText(str,_parent){
		let txt = new father.text(str,35).alignCenter();
		txt.x = 900;
		txt.y = 360;
		txt.visible = false;
		_parent.addChild(txt);
		return txt;		
	}

})();
