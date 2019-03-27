(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	father.loader.add('part2.png',father.lessonPath);
	let img, title, answer, tip;
	let order = 0;
	const titleTexts = ['小猴子和小松鼠分别摘了多少个樱桃呢？','小猴子和小松鼠一共有多少个果子？',null,'小猴子比小松鼠多摘了多少个果子？',null];
	const answerTexts = ['40   30   70','40 ? 30 ? 70','40 + 30 = 70','40 ? 30 = ?','40 - 30 = 10'];
	const tipTexts = [null,null,['加数','加数','和'],null,['被减数','减数','差']];
	const tips = new Array;

	p.go = function() {
		let align = {textAlign:'center',textBaseline:'middle'}

		img = father.loader.getImage('part2.png','center');
		img.set({x:640,y:360});

		title = new father.text('',40).set({x:640,y:70}).set(align);
		answer = new father.text('',40).set({x:640,y:630}).set(align);

		let tipy = 673;

		tips.push(
				new father.text('',25).set({x:540,y:tipy}).set(align),
				new father.text('',25).set({x:640,y:tipy}).set(align),
				new father.text('',25).set({x:738,y:tipy}).set(align)
			)

		p.addChild(img,title,answer);

		for(let i=0;i<tips.length;i++){
			p.addChild(tips[i]);
		}

		father.getClickBoard(p).on('click',next);
		next();

		delete p.go;
	}

	p.reset = function(){
		TweenLite.killTweensOf(p);
		p.alpha = 1;
		p.mouseEnabled = true;
		order = 0;
		next();
	}

	function next(){
		if(TweenMax.isTweening(p)) return;

		title.text = titleTexts[order]? titleTexts[order]:title.text;
		answer.text = answerTexts[order];

		for(let i=0;i<tips.length;i++){
			tips[i].text = tipTexts[order]? tipTexts[order][i]:'';
		}

		TweenLite.from(p,0.75,{alpha:0});

		order ++;
		if(order>=titleTexts.length) p.mouseEnabled = false;
	}
})();