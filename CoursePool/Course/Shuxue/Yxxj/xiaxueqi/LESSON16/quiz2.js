(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,1);

	father.loader.add('quiz2.png',father.lessonPath);

	const nums = new Array;

	p.go = function() {
		p.addChild(father.loader.getImage('quiz2.png','center')).set({x:640,y:360});

		let xs = [136,306,477,800,971,1140];
		let texts = ['30','10','20','60','20','40'];
		let txt = new father.text('',40).alignCenter(), _txt;
		txt.y = 559;
		
		for(let i=0;i<texts.length;i++){
			_txt = txt.clone().set({x:xs[i],text:texts[i],alpha:0});
			p.addChild(_txt);
			nums.push(_txt);
		}

		father.getClickBoard(p).on('click',onclick);
		
		p.addChild(new father.tipOnce('看图列算式。')).showOut();

		delete p.go;
	}

	p.reset = function(){
		TweenLite.killTweensOf(nums);
		for(let i=0;i<nums.length;i++){
			nums[i].alpha = 0;
		}
	}

	function onclick(){
		if(TweenMax.isTweening(nums)) return;
		for(let i=0;i<nums.length;i++){
			if(nums[i].alpha===0){
				TweenLite.to(nums[i],0.75,{alpha:1});
				father.preferSound('click');
				if(i===nums.length-1) p.mouseEnabled = false;
				return;
			}
		}
	}

})();