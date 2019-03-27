(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	father.loader.add(['part2.json','part2.png'],father.lessonPath);

	let titleText = ['小明将餐桌上的各种食物放到了相应的区域里，\n你知道每个区域都叫什么名吗？','虽然小明将食物分了类，但是看上去还是不整齐，\n你能帮助他吧水果按颜色排好队吗？',
				'按颜色排好队，看上去是不是更整齐了呢？','除了按颜色可以排队，还能怎样摆更整齐呢？'];
	let title = new father.text('',40);
	const animateArr = new Array;
	let order = 0;

	p.go = function() {
		let sprite = father.loader.getSprite('part2',true);

		p.addChild(title).set({x:640,y:70,lineHeight:50}).alignCenter();

		//第一个画面
		let scale = {scaleX:0.8,scaleY:0.8};
		let qx = 941, qy = [229,400,570];

		p.addChild(sprite.desk).set({x:400,y:400}).set(scale);
		animateArr.push(sprite.desk);

		for(let i=1;i<=3;i++){
			p.addChild(sprite['q'+i]).set({x:qx,y:qy[i-1]}).set(scale);
			animateArr.push(sprite['q'+i]);
		}

		//第2,3,4个画面
		let centerpos = {x:640,y:360};

		for(i=2;i<=4;i++){
			p.addChild(sprite['ques'+i]).set(centerpos);
			animateArr.push(sprite['ques'+i]);
		}

		father.getClickBoard(p).on('click',onclick);

		p.reset();
		delete p.go;
	}

	p.reset = function(){
		TweenLite.killTweensOf(animateArr);
		TweenLite.set(animateArr,{alpha:0});

		order = 0;
		title.text = titleText[0];
		p.mouseEnabled = true;
	}

	function onclick(){
		if(TweenMax.isTweening(title) || TweenMax.isTweening(animateArr)) return;

		if(order<4){
			TweenLite.to(animateArr[order],0.75,{alpha:1});
			order ++;
		}else{
			TweenLite.set(animateArr,{alpha:0});
			title.text = titleText[order-3];
			TweenLite.to(animateArr[order],0.75,{alpha:1});
			order ++;
		}

		if(order >= animateArr.length) p.mouseEnabled = false;
	}
})();