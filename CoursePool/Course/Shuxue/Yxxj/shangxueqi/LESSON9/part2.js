(function(){
	let father = projectData.courseInterface;

	let compNumber;
	let sprite;
	father.loader.add(['lesson9.png','lesson9.json'],father.lessonPath);

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('小白兔有4个气球，左手拿1个，右手拿3个。\n小朋友，怎样才能把4个气球分给两个小朋友呢？',p);
			new compNumber(1,3).addTo(p).set({x:891,y:400});
			getImage('rabbit1',p).set({x:320,y:400});

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('小朋友，把4个气球分给两个小朋友，还能怎么分呢？',p);
			new compNumber(2,2).addTo(p).set({x:891,y:400});
			getImage('rabbit2',p).set({x:320,y:400});
			bottomText('小白兔有4个气球，左手拿2个，右手拿2个。',p);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('小朋友，把4个气球分给两个小朋友，还能怎么分呢？',p);
			new compNumber(3,1).addTo(p).set({x:891,y:400});
			getImage('rabbit3',p).set({x:320,y:400});
			bottomText('小白兔有4个气球，左手拿3个，右手拿1个。',p);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.go = function() {
			let scale = {scaleX:0.7,scaleY:0.7};
			new father.title('小朋友，4可以分成？',p);
			new compNumber(2,2).addTo(p).set({x:231,y:400,mouseChildren:false}).set(scale);
			new compNumber(1,3).addTo(p).set({x:640,y:400,mouseChildren:false}).set(scale);
			new compNumber(3,1).addTo(p).set({x:1048,y:400,mouseChildren:false}).set(scale);

		delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,4);

		p.go = function() {
			let scale = {scaleX:0.7,scaleY:0.7};
			new father.title('小朋友，5可以分成几和几呢？',p);
			fiveCircle(1,p).set({x:324,y:400});
			new compNumber(1,4).addTo(p).set({x:700,y:400}).set(scale);
			new compNumber(4,1).addTo(p).set({x:1048,y:400}).set(scale);

			bottomText('5可以分成1和4，也可以分成4和1',p);
			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,5);

		p.go = function() {
			let scale = {scaleX:0.7,scaleY:0.7};
			new father.title('小朋友，5可以分成几和几呢？',p);
			fiveCircle(2,p).set({x:324,y:400});
			new compNumber(2,3).addTo(p).set({x:700,y:400}).set(scale);
			new compNumber(3,2).addTo(p).set({x:1048,y:400}).set(scale);

			bottomText('5可以分成2和3，也可以分成3和2',p);

			delete p.go;
		}
	})();

	function getImage(str,_parent){
		sprite = sprite || father.loader.getSprite('lesson9',true,{scaleX:0.63,scaleY:0.63});
		let s = sprite[str].clone();
		_parent && _parent.addChild(s);
		return s;
	}

	function bottomText(str,_parent){
		let txt = new father.text(str,40).alignCenter().set({x:640,y:660,alpha:0});
		_parent.addChild(txt);
		father.getClickBoard(_parent).on('click',show,null,true,txt);
		return txt;
	}

	function show(e,txt){
		father.preferSound('click');
		e.target.visible = false;
		TweenLite.to(txt,0.75,{alpha:1});
	}

	function fiveCircle(n,_parent){
		let color = 'red';
		let lineColor = '#9DC3E6';
		let positions = [[0,-150],[-141,-48],[-97,114],[97,114],[141,-48]];
		let con = new createjs.Container;
		let mainCircle = new createjs.Shape;
		let subCircle;
		mainCircle.graphics.s(lineColor).ss(2).dc(0,0,150);
		con.addChild(mainCircle);

		for(let i=0;i<positions.length;i++){
			subCircle = new createjs.Shape;
			subCircle.graphics.s(lineColor).ss(2);
			i <= n-1? subCircle.graphics.f(color):subCircle.graphics.f('white');
			subCircle.graphics.dc(0,0,47);
			subCircle.x = positions[i][0];
			subCircle.y = positions[i][1];
			con.addChild(subCircle);
		}

		_parent && _parent.addChild(con);

		return con;
	}

	(function(){
		let _color = '#9DC3E6';
		let size = 70;

		function compnumber(n1,n2){
			this.Container_constructor();
			let n3 = n1 + n2;
			let txts = [new father.text(n1.toString(),size,'white').alignCenter().set({x:-143,y:129}),
				new father.text(n2.toString(),size,'white').alignCenter().set({x:143,y:129}),
				new father.text(n3.toString(),size,'white').alignCenter().set({x:0,y:-129})];

			let bgShape = new createjs.Shape,_bs;
			let line = new createjs.Shape;

			bgShape.graphics.f(_color).rr(-size/2,-size/2,size,size,10);
			line.graphics.s(_color).ss(2).mt(-40,-66).lt(-143,68).mt(40,-66).lt(143,68);

			for(let i=0;i<txts.length;i++){
				_bs = bgShape.clone();
				_bs.x = txts[i].x;
				_bs.y = txts[i].y;
				this.addChild(_bs,txts[i]);
			}

			this.addChild(line);
		}

		let p = createjs.extend(compnumber,createjs.Container);

		p.addTo = function(_parent){
			return _parent.addChild(this);
		}

		compNumber = createjs.promote(compnumber,'Container');
	})();
})();
