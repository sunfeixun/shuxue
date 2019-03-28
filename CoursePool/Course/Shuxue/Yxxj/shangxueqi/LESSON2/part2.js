(function(){
	let father = projectData.courseInterface;

	father.loader.add(['part2.json','part2.png'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			sprite = sprite || father.loader.getSprite('part2',true);
			let rabbit = sprite.rabbit, luobo = sprite.luobo;
			let inst;

			rabbit.regX = rabbit.regY = luobo.regX = luobo.regY = 0;

			inst = father.createElement([
				{type:'text',attr:{x:208,y:143,text:'有几只小白兔？\n有几根胡萝卜？',size:35}},
				{type:'text',attr:{x:677,y:143,text:'萝卜的数量够不够小兔子分呢？\n为什么？',size:35}},
				{statement:{attr:{scale:0.8,y:271,x:'+=156'}}},
				{type:rabbit.clone(),attr:{x:50}},
				{type:rabbit,clone:3},
				{statement:{attr:{scale:0.8,y:443,x:'+=153'}}},
				{type:luobo.clone(),attr:{x:70}},
				{type:luobo,clone:3},
				{statement:null},
				{type:'text',attr:{text:'和      一样多',x:856,y:390,size:40}},
				{type:rabbit.clone(),attr:{scale:0.87,x:743,y:344}},
				{type:luobo.clone(),attr:{scale:0.87,x:928,y:348}},
				{type:'text',center:true,attr:{text:'萝卜有4根，小兔子有4只，萝卜和小兔子同样多',x:'center',y:650,size:40,alpha:0},instance:'txt'}
			],father.loader,p);

			father.getClickBoard(p).on('click',show,null,true,inst.txt);

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			sprite = sprite || father.loader.getSprite('part2',true);
			let flower = sprite.flower, butterfly = sprite.butterfly;
			let inst;
			flower.regX = flower.regY = butterfly.regX = butterfly.regY = 0;

			inst = father.createElement([
				{type:'text',attr:{text:'有几只小花？\n有几只蝴蝶？',x:252,y:143,size:35}},
				{type:'text',attr:{x:750,y:143,text:'花朵的数量够不够蝴蝶分呢？\n为什么？',size:35}},
				{statement:{attr:{scale:0.6,y:271,x:'+=112'}}},
				{type:flower.clone(),attr:{x:71}},
				{type:flower,clone:4},
				{statement:{attr:{scale:0.6,y:443,x:'+=112'}}},
				{type:butterfly.clone(),attr:{x:71}},
				{type:butterfly,clone:2},
				{statement:null},
				{type:'text',attr:{text:'比       多两个',x:856,y:390,size:40}},
				{type:flower.clone(),attr:{scale:0.7,x:743,y:344}},
				{type:butterfly.clone(),attr:{scale:0.7,x:920,y:348}},
				{type:'text',center:true,attr:{text:'小花有5朵，蝴蝶有3只，花朵比蝴蝶多2',x:'center',y:650,size:40,alpha:0},instance:'txt'}
				],father.loader,p);

			father.getClickBoard(p).on('click',show,null,true,inst.txt);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			sprite = sprite || father.loader.getSprite('part2',true);
			let monkey = sprite.monkey, banana = sprite.banana;
			let inst;
			monkey.regX = monkey.regY = banana .regX = banana.regY = 0;

			inst = father.createElement([
				{type:'text',attr:{text:'小猴子有几只？\n香蕉有几把？',x:252,y:143,size:35}},
				{type:'text',attr:{x:730,y:143,text:'香蕉的数量够不够小猴子分呢？\n为什么？',size:35}},
				{statement:{attr:{scale:0.77,y:271,x:'+=109'}}},
				{type:monkey.clone(),attr:{x:71}},
				{type:monkey,clone:2},
				{statement:{attr:{scale:1.17,y:443,x:'+=109'}}},
				{type:banana.clone(),attr:{x:71}},
				{type:banana,clone:4},
				{statement:null},
				{type:'text',attr:{text:'比       少两个',x:856,y:390,size:40}},
				{type:monkey.clone(),attr:{scale:0.77,x:743,y:344}},
				{type:banana.clone(),attr:{scale:1.17,x:920,y:348}},
				{type:'text',center:true,attr:{text:'香蕉有5把，小猴子有3只，小猴子比香蕉少2',x:'center',y:650,size:40,alpha:0},instance:'txt'}
				],father.loader,p);

			father.getClickBoard(p).on('click',show,null,true,inst.txt);
			delete p.go;
		}

		function onclick(e,txt){
			e.target.visible = false;
			TweenLite.to(txt,0.75,{alpha:1});
			father.preferSound('click');			
		}
	})();

	function show(e,txt){
		e.target.parent.removeChild(e.target);
		father.preferSound('click');
		TweenLite.to(txt,0.75,{alpha:1});
	}

})();
