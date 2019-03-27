(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,3);

	let bracketsContainer = new createjs.Container;

	father.loader.addLoadElement(['quiz4.png','quiz4.json'],father.lessonPath);
	p.regCount(3);

	p.go = function() {
		let sprite = father.loader.getSprite('quiz4');
		p.addChild(sprite.bg.set({x:125,y:175}));

		let two1 = p.addChild(sprite.two.clone().set({x:656,y:195}));
		let two2 = p.addChild(sprite.two.clone().set({x:891,y:450}));
		p.addChild(sprite.one.set({x:473,y:450}));

		bracketsContainer.addChild(sprite.brackets.clone().set({x:616,y:198}))._animate = new TimelineLite().from(two1,1,{alpha:0}).pause();
		bracketsContainer.addChild(sprite.brackets.clone().set({x:430,y:454}))._animate = new TimelineLite().from(sprite.one,1,{alpha:0}).pause();
		bracketsContainer.addChild(sprite.brackets.clone().set({x:851,y:452}))._animate = new TimelineLite().from(two2,1,{alpha:0}).pause();

		p.addChild(bracketsContainer);//.set({cursor:'pointer'}).on('click',clickBrac);
		father.getClickBoard(p).on('click',onclick);
		sprite = null;
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

	function clickBrac(e){
		e.target.mouseEnabled = false;
		e.target._animate.restart();
		p.count();
		father.preferSound('click');
	}
})();