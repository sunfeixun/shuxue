(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson7.png','lesson7.json'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			let con  = p.addChild(new createjs.Container);
			new father.title('有5个人排队',p);
			getImage('busStation',p,{scaleX:0.7,scaleY:0.7});
			getImage('girl',con,{x:247,y:635});
			con.addChild(new father.text('排第2，她前面有1个人，后面有3个人。',40)).set({x:640,y:640}).alignCenter();

			con.alpha = 0;
			father.getClickBoard(p).on('click',onclick,null,true,con);

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('请你来说一说，迪迪排在第几个位置？迪迪后面有几人？',p);
			getImage('children',p);
			let txt = new father.text('迪迪排在第四位，迪迪后面有4人。',40).set({x:640,y:640,alpha:0}).alignCenter().addTo(p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('请你来说一说，粉兔排在第几个位置？粉兔后面有几人？',p);
			getImage('animal',p,{scaleX:0.8,scaleY:0.8});
			let txt = new father.text('粉兔排在第四位，粉兔后面有1人。',40).set({x:640,y:640,alpha:0}).alignCenter().addTo(p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	function getImage(str,_parent,attr){
		let s;
		sprite = sprite || father.loader.getSprite('lesson7',true);
		s = sprite[str].clone();
		s.x = 640;
		s.y = 360;
		attr && s.set(attr);
		_parent && _parent.addChild(s);
		return s;
	}

	function onclick(e,show){
		e.target.visible = false;
		TweenLite.to(show,0.75,{alpha:1});
		father.preferSound('click');
	}
})();
