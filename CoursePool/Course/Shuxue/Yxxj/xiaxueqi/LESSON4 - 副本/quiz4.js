
(function(){
	let father = projectData.courseInterface;


	let p = new father.part(4,3);
	let dash1, dash2;


	father.loader.addLoadElement('quiz4.png',father.lessonPath);
	//BaseFunc.regCounter(p,2);

	p.go = function(){
		p.addChild(father.loader.getImage('quiz4.png')).set({x:140,y:189});

		dash1 = new createjs.Shape().set({cursor:'pointer',alpha:0.08});
		dash1.graphics.f('rgba(255,255,255,0.1').s('#458BE6').ss(5).sd([12,12]).rr(0,0,121,121,10);

		dash2 = dash1.clone();

		dash1.set({x:642,y:190});
		dash2.set({x:892,y:408});

		p.addChild(dash1,dash2);

		dash1.on('click',clickdash);
		dash2.on('click',clickdash);

		p.addChild(new father.tipOnce('请根据图形的排列规律，圈出排错的图形')).showOut();

		delete p.go;
	}

	p.reset = function(){
		dash1.mouseEnabled = dash2.mouseEnabled = true;
		dash1.alpha = dash2.alpha = 0.08;
		TweenLite.killTweensOf([dash1,dash2]);
	}


	function clickdash(e){
		//BaseFunc.count(p);
		father.preferSound('click');
		e.currentTarget.mouseEnabled = false;
		TweenLite.to(e.currentTarget,0.5,{alpha:1});
	}
})();