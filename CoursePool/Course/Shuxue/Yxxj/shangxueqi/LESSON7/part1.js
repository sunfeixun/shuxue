(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.add(['lesson7.json','lesson7.png'],father.lessonPath);

	p.go = function() {
		new father.title('这幅图画的是什么地方？（公共汽车站）他们在干什么？',p);
		let sprite = father.loader.getSprite('lesson7',true);
		let txt = new father.text('小朋友，很多人在车站排队等车。',40).alignCenter();

		p.addChild(sprite.busStation).set({x:640,y:370,scaleX:0.7,scaleY:0.7});

		father.getClickBoard(p).on('click',onclick,null,true,txt);

		p.addChild(txt).set({x:640,y:640,alpha:0});

		delete p.go;
	}

	function onclick(e,txt){
		e.target.visible = false;
		TweenLite.to(txt,0.75,{alpha:1});
		father.preferSound('click');
	}

})();