(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	father.loader.add(['part2.json','part2.png'],father.lessonPath);

	const titleTexts = ['小朋友们在抓鱼。','分别都有多少条呢？','粉色的鱼有几条呢？','绿色的鱼有几条呢？','黄色的鱼有几条呢？','红色的鱼有几条呢？','蓝色的鱼有几条呢？'];
	const title = new father.text('',40).alignCenter();
	const contentArr = new Array;
	let order;

	p.go = function() {
		let sprite = father.loader.getSprite('part2',true);
		p.addChild(title.set({x:640,y:70}));


		//第一题
		p.addChild(sprite.bg.set({x:640,y:400,scaleX:0.8,scaleY:0.8}));
		contentArr[0] = sprite.bg;


		//第二题开始
		let fishx = 182, fishy = 202, sumY = 80;
		contentArr[1] = [];
		p.addChild(sprite.table).set({x:697,y:360});
		contentArr[1].push(sprite.table);

		for(let i=1;i<=5;i++){
			p.addChild(sprite['fish'+i]).set({x:fishx,y:fishy});
			contentArr[1].push(sprite['fish'+i]);

			fishy += sumY;
		}

		//开始出现每个鱼的数量
		let txt, txtvalues = [10,7,5,3,2];
		let rect;
		let bound = sprite.table.getTransformedBounds();
		let colors = ['#F6C7DC','#C0DA80','#FEF2C2','#F29974','#7BCCF2'];

		for(i=1;i<=5;i++){
			txt = new father.text(txtvalues[i-1].toString()+'条',30).alignCenter().set({x:298,y:sprite['fish'+i].y});
			rect = new createjs.Shape;
			rect.graphics.f(colors[i-1]).r(0,0,txtvalues[i-1]*80,80);
			rect.x = bound.x + 80;
			rect.y = bound.y + (i-1)*80;

			p.addChild(txt);
			p.addChildAt(rect,0);
			contentArr.push([txt,rect]);
		}

		contentArr[2].push(sprite.table);

		father.getClickBoard(p).on('click',onclick);

		p.reset();

		delete p.go;
	}

	p.reset = function(){
		for(let i=0;i<contentArr.length;i++){
			TweenLite.killTweensOf(contentArr[i]);
			TweenLite.set(contentArr[i],{alpha:0});
		}
		TweenLite.killTweensOf(title);
		TweenLite.set(contentArr[0],{alpha:1});
		order = 0;
		title.set({text:titleTexts[0],alpha:1});
		p.mouseEnabled = true;
	}

	function onclick(){
		if(TweenMax.isTweening(title)) return;



		if(order===0){
			TweenLite.set(contentArr[order],{alpha:0});
			order += 1;
			title.text = titleTexts[order];
			TweenLite.to(contentArr[order],0.75,{alpha:1});
			father.preferSound('click');
			return;
		} 
		order += 0.5;  //文字提问和答案切换显示;

		if(order%1===0.5){
			title.text = titleTexts[order+0.5];
			TweenLite.fromTo(title,0.75,{alpha:0},{alpha:1});			
		}else{
			father.preferSound('click');
			TweenLite.to(contentArr[order],0.75,{alpha:1});
		}

		if(order>=contentArr.length-1) p.mouseEnabled = false;
	}

})();