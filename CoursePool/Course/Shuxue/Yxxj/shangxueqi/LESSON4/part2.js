(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson4.png','lesson4.json'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('我们来观察一下这幅图画吧！',p);
			getClassroom(p);

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('黄头发留两个小辫子的小朋友举起了哪只手？',p);
			getClassroom(p);
			let txt = bottomText('黄头发留两个小辫子的小朋友举起了左手。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('棕色头发的小朋友举起了哪只手？',p);
			getClassroom(p);
			let txt = bottomText('棕色头发的小朋友举起了右手。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.go = function() {
			new father.title('小朋友，你们知道哪只手是右手了吗？',p);
			getClassroom(p);
			let txt = bottomText('两只手左边的叫左手，右边的叫右手。',p);
			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}
	})();

	function getClassroom(_parent){
		sprite = sprite || father.loader.getSprite('lesson4',true);
		return _parent.addChild(sprite.room.clone()).set({x:640,y:390,scaleX:0.7,scaleY:0.7});
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
		txt.visible = true;
		TweenLite.fromTo(txt,0.75,{alpha:0},{alpha:1});
		e.target.visible = false;
	}

})();
