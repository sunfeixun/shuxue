(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,2);
	
	let bracketsContainer;
	p.regCount(2);
	father.loader.addLoadElement(['quiz3.png','quiz3.json'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz3');
		p.addChild(sprite.q1.set({x:302,y:128}));
		p.addChild(sprite.q2.set({x:152,y:402}));
		let _two1 = p.addChild(sprite.two.clone().set({x:676,y:179}));
		let _two2 = p.addChild(sprite.two.clone().set({x:676,y:453}));

		bracketsContainer = p.addChild(new createjs.Container);
		bracketsContainer.addChild(sprite.brackets.clone().set({x:617,y:180}))._animate = new TimelineLite().from(_two1,1,{alpha:0}).pause();
		bracketsContainer.addChild(sprite.brackets.clone().set({x:617,y:455}))._animate = new TimelineLite().from(_two2,1,{alpha:0}).pause();

		//bracketsContainer.cursor = 'pointer';
		//bracketsContainer.on('click',clickbrac);

		sprite = null;
		father.getClickBoard(p).on('click',onclick);

		p.addChild(new father.tipOnce('请你看一看，一个图形里藏着几个等分图形。')).showOut();

		delete p.go;
	}

	p.reset = function(){
		for(let i in bracketsContainer.children){
			bracketsContainer.children[i]._animate.seek(0).pause();
			bracketsContainer.children[i].mouseEnabled = true;
		}
		p.mouseEnabled = true;
	}

	function onclick(){
		for(let i=0;i<bracketsContainer.children.length;i++){
			if(bracketsContainer.children[i]._animate.paused()){
				bracketsContainer.children[i]._animate.restart();
				p.count();
				father.preferSound('click');
				return;
			}
		}
		p.mouseEnabled = false;
	}

	function clickbrac(e){
		e.target.mouseEnabled = false;
		e.target._animate.restart();
		p.count();
		father.preferSound('click');
	}

})();