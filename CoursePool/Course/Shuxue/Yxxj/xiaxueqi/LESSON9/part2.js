(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	father.loader.add(['part2.png','part2.json'],father.lessonPath);

	const txts = new Array;
	const  datas = [
			[],
			['按颜色分类：','红色','黄色','蓝色'],
			['按尾巴形状分类','三角形','圆形','长方形'],
			['按鱼身上纹路分类：','圆圈','波浪','直线'],
			['还可以按什么分类呢？'],
			['按眼睛颜色分类']
		];
	let order = 1;	
	let sprite;

	p.go = function() {
		let y = 200, algin = {textAlign:'center',textBaseline:'middle'};

		sprite = father.loader.getSprite('part2',true,{x:640,y:400,alpha:0});
		txts[0] = new father.text('',40).set({x:640,y:70}).set(algin);
		txts[1] = new father.text('',40).set({x:213,y:y}).set(algin);
		txts[2] = new father.text('',40).set({x:640,y:y}).set(algin);
		txts[3] = new father.text('',40).set({x:1050,y:y}).set(algin);

		for(let i=0;i<txts.length;i++){
			p.addChild(txts[i]);
		}

		for(i in sprite){
			p.addChild(sprite[i]);
		}

		father.getClickBoard(p).on('click',onclick);

		sprite.q1.alpha = 1;

		delete p.go;
	}

	p.reset = function() {
		if(sprite['q'+order]) sprite['q'+order].alpha = 0;
		order = 1;
		sprite.q1.alpha = 1;
	}

	function onclick() {
		if(order>=6 || TweenMax.isTweening(txts))  return;
		father.preferSound('objIn');
		sprite['q'+order] && TweenLite.to(sprite['q'+order],0.3,{alpha:0});
		order ++;
		sprite['q'+order] && TweenLite.to(sprite['q'+order],0.3,{alpha:1});

		let texts = datas[order-1];

		if(texts.length===1){
			txts[1].text = txts[2].text = txts[3].text = '';
		}

		for(let i=0;i<texts.length;i++){
			txts[i].text = texts[i];
		}
		TweenLite.fromTo(txts,0.75,{alpha:0},{alpha:1});
	}
})();