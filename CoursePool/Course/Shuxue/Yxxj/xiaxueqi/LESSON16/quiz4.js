(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,3);

	father.loader.add('quiz4.png',father.lessonPath);

	let txtArr = new Array;

	p.go = function() {
		p.addChild(father.loader.getImage('quiz4.png','center')).set({x:640,y:360});

		let txt = new father.text('',50).alignCenter(), _txt;
		let xs = [580,851,1122], ys = [384,560];
		let values1 = ['60','40','20'], values2 = ['70','60','10'];
		txt.alpha = 0;

		for(let i=0;i<values1.length;i++){
			_txt = txt.clone().set({x:xs[i],y:ys[0],text:values1[i]});
			p.addChild(_txt);
			txtArr.push(_txt);
		}

		for(i=0;i<values2.length;i++){
			_txt = txt.clone().set({x:xs[i],y:ys[1],text:values2[i]});
			p.addChild(_txt);
			txtArr.push(_txt);
		}

		father.getClickBoard(p).on('click',onclick);

		p.addChild(new father.tipOnce('请你根据提示列算式吧。')).showOut();
		delete p.go;
	}

	p.reset = function(){
		p.mouseEnabled = true;
		TweenLite.killTweensOf(txtArr);
		for(let i=0;i<txtArr.length;i++){
			txtArr[i].alpha = 0;
		}
	}

	function onclick(){
		if(TweenMax.isTweening(txtArr)) return;

		for(let i=0;i<txtArr.length;i++){
			if(txtArr[i].alpha===0){
				TweenLite.to(txtArr[i],0.75,{alpha:1});
				father.preferSound('click');
				if(i===txtArr.length-1) p.mouseEnabled = false;
				break;
			}
		}
	}

})();