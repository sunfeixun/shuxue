(function(){
	let father = projectData.courseInterface;

	father.loader.add(['part2.json','part2.png'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			sprite = sprite || father.loader.getSprite('part2',true);
			let rabbitGroup = new father.group, luoboGroup = new father.group;

			for(let i=1;i<=4;i++){
				rabbitGroup.array.push(sprite.rabbit.clone());
				luoboGroup.array.push(sprite.luobo.clone());
			}

			let str = '有几只小白兔？\n有几根胡萝卜？\n萝卜的数量够不够小兔子分呢？为什么？';
			let txt = new father.text(str,40).addTo(p).set({x:274,y:55});

			rabbitGroup.addTo(p).set({y:329,scaleX:0.49,scaleY:0.49}).sumAttr('x',199,94);
			luoboGroup.addTo(p).set({y:434,scaleX:0.49,scaleY:0.49}).sumAttr('x',199,94);

			p.addChild(sprite.rabbit.clone()).set({x:713,y:386,scaleX:0.7,scaleY:0.7});
			p.addChild(sprite.luobo.clone()).set({x:868,y:386,scaleX:0.7,scaleY:0.7});
			p.addChild(txt.clone()).set({x:778,y:367,text:'和     一样多'});

			txt = new father.text('萝卜有4根，小兔子有4只，萝卜和小兔子同样多。',40).set({x:640,y:630,alpha:0}).alignCenter().addTo(p);

			father.getClickBoard(p).on('click',onclick,null,true,txt);

			delete p.go;
		}

		function onclick(e,txt){
			e.target.visible = false;
			TweenLite.to(txt,0.75,{alpha:1});
			father.preferSound('click');
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			sprite = sprite || father.loader.getSprite('part2',true);
			let rabbitGroup = new father.group, luoboGroup = new father.group;

			for(let i=1;i<=4;i++){
				rabbitGroup.array.push(sprite.flower.clone());
				luoboGroup.array.push(sprite.butterfly.clone());
			}

			let str = '有几只小花？\n有几只蝴蝶？\n花朵的数量够不够蝴蝶分呢？为什么？';
			let txt = new father.text(str,40).addTo(p).set({x:274,y:55});

			rabbitGroup.addTo(p).set({y:329,scaleX:0.49,scaleY:0.49}).sumAttr('x',199,94);
			luoboGroup.addTo(p).set({y:434,scaleX:0.49,scaleY:0.49}).sumAttr('x',199,94);

			p.addChild(sprite.flower.clone()).set({x:713,y:386,scaleX:0.7,scaleY:0.7});
			p.addChild(sprite.butterfly.clone()).set({x:868,y:386,scaleX:0.7,scaleY:0.7});
			p.addChild(txt.clone()).set({x:778,y:367,text:'比     多两个'});

			txt = new father.text('小花有5朵，蝴蝶有3只，花朵比蝴蝶多2。',40).set({x:640,y:630,alpha:0}).alignCenter().addTo(p);

			father.getClickBoard(p).on('click',onclick,null,true,txt);
			delete p.go;
		}

		function onclick(e,txt){
			e.target.visible = false;
			TweenLite.to(txt,0.75,{alpha:1});
			father.preferSound('click');			
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			sprite = sprite || father.loader.getSprite('part2',true);
			let rabbitGroup = new father.group, luoboGroup = new father.group;

			for(let i=1;i<=4;i++){
				rabbitGroup.array.push(sprite.monkey.clone());
				luoboGroup.array.push(sprite.banana.clone());
			}

			let str = '小猴子有几只？\n香蕉有几把？\n香蕉的数量够不够小猴子分呢？为什么？';
			let txt = new father.text(str,40).addTo(p).set({x:274,y:55});

			rabbitGroup.addTo(p).set({y:329,scaleX:0.49,scaleY:0.49}).sumAttr('x',199,94);
			luoboGroup.addTo(p).set({y:434,scaleX:0.49,scaleY:0.49}).sumAttr('x',199,94);

			p.addChild(sprite.monkey.clone()).set({x:713,y:386,scaleX:0.7,scaleY:0.7});
			p.addChild(sprite.banana.clone()).set({x:868,y:386,scaleX:0.7,scaleY:0.7});
			p.addChild(txt.clone()).set({x:778,y:367,text:'比     少两个'});

			txt = new father.text('香蕉有5把，小猴子有3只，小猴子比香蕉少2。',40).set({x:640,y:630,alpha:0}).alignCenter().addTo(p);

			father.getClickBoard(p).on('click',onclick,null,true,txt);
			delete p.go;
		}

		function onclick(e,txt){
			e.target.visible = false;
			TweenLite.to(txt,0.75,{alpha:1});
			father.preferSound('click');			
		}
	})();
})();
