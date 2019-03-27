(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,2);

	father.loader.add('quiz3.png',father.lessonPath);
	const txtArr = new Array;

	p.go = function() {
		p.addChild(father.loader.getImage('quiz3.png','center')).set({x:640,y:360});

		let pos = [[330,287],[648,287],[1045,125],[412,433],[545,433],[1045,433]];
		let values = ['80','70','40','40','30','40'];
		let txt = new father.text('',30,'#D92B93').alignCenter(), _txt;
		txt.alpha = 0;

		for(let i=0;i<values.length;i++){
			_txt = txt.clone().set({x:pos[i][0],y:pos[i][1],text:values[i]});
			p.addChild(_txt);
			txtArr.push(_txt);
		}

		father.getClickBoard(p).on('click',onclick);

		p.addChild(new father.tipOnce('请你根据提示填空吧。')).showOut();
		delete p.go;
	}

	p.reset = function(){
		TweenLite.killTweensOf(txtArr);
		p.mouseEnabled = true;
		for(let i=0;i<txtArr.length;i++){
			txtArr[i].alpha = 0;
		}
		p.mouseEnabled = true;
	}

	function onclick(e){
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