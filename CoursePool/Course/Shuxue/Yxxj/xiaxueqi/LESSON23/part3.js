(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	father.loader.add(['part3.png','part3.json'],father.lessonPath);

	let order = 0;
	let prevnext;
	const contenArr = new father.orderContent;
	const vgroup = {margin:43,x:274,sumX:69};
	const titleTexts = ['你能发现一样的鞋吗？请你帮它们分分类。','你能分别数一数有多少双鞋吗？','你能将相加数量一样的两种鞋找出来吗？'];
	const title = new father.text(titleTexts[0],40);

	p.go = function() {
		let sprite = father.loader.getSprite('part3',true,{scaleX:0.6,scaleY:0.6});
		let i, j;
		let prevCon = p.addChild(new createjs.Container);
		prevnext = new father.prevNext;
		prevnext.addTo(prevCon);
		prevCon.cursor = 'pointer';
		prevCon.on('click',swip);
		p.addChild(title).set({x:640,y:70}).alignCenter();

		//第一题
		
		let positions = {
			shoe1:[[735,437]],
			shoe2:[[905,219],[1084,287]],
			shoe3:[[824,198],[1004,344]],
			shoe4:[[1031,239],[941,412],[812,497]],
			shoe5:[[969,277],[823,412],[1071,444]],
			shoe6:[[751,350],[873,343],[984,481]],
			shoe7:[[826,286],[972,210],[1090,383],[889,476]]
		}
		let shoe;
		let dragger = p.addChild(new createjs.Container);
		let beginy = 157.5, sumy = 67;
		dragger.cursor = 'pointer';
		dragger.on('mousedown',drag);
		dragger.on('pressmove',drag);
		dragger.on('pressup',drag);

		p.addChildAt(sprite.table.set({x:377,y:360}),0);
		contenArr[0] = [dragger,sprite.table];

		for(i=1;i<=7;i++){
			vgroup['shoe'+i] = [];
			vgroup['shoe'+i].mydata = {count:0,y:beginy+(i-1)*sumy};
			//beginy += sumy;
			for(j=0;j<positions['shoe'+i].length;j++){
				shoe = sprite['shoe'+i].clone().set({x:positions['shoe'+i][j][0],y:positions['shoe'+i][j][1]});
				shoe.ox = shoe.x;
				shoe.oy = shoe.y;
				dragger.addChild(shoe);
				vgroup['shoe'+i].push(shoe);
				shoe.group = vgroup['shoe'+i];
			}
		}

		//第二题
		let circleNum = new createjs.Container,_circlenum;
		let beginx = 820, sumX = 86;
		let txt = new father.text('',40).alignCenter(), shape = new createjs.Shape;
		shape.graphics.s('black').ss(2).f('rgba(255,255,255,0.01)').dc(0,0,25,25);
		circleNum.addChild(shape,txt);
		circleNum.set({x:beginx,y:370});

		contenArr[1] = [p.addChild(sprite.table.clone())];

		for(i=1;i<=7;i++){
			shoe = vgroup['shoe'+i];
			for(j=0;j<shoe.length;j++){
				contenArr[1].push(p.addChild(shoe[j].clone()).set({x:vgroup.x+j*vgroup.sumX,y:beginy+(i-1)*sumy}));
			}
		}

		
			//添加数字按钮;
		let numTargs = [[0],[1,2],[3,4,5],[6]];
		dragger = p.addChild(new createjs.Container);
		dragger.cursor = 'pointer';
		dragger.on('mousedown',drag);
		dragger.on('pressmove',drag);
		dragger.on('pressup',numUp);
		contenArr[1].push(dragger);


		for(i=0;i<numTargs.length;i++){
			for(j=0;j<numTargs[i].length;j++){
				numTargs[i][j] = beginy + numTargs[i][j]*sumy;
			}
		}

		for(i=1;i<=4;i++){
			for(j=1;j<=4;j++){
				_circlenum = circleNum.clone(true);
				_circlenum.mouseChildren = false;
				_circlenum.getChildAt(1).text = i.toString();
				_circlenum.ox = _circlenum.x;
				_circlenum.oy = _circlenum.y;
				_circlenum.targX = vgroup.x + vgroup.sumX*i;
				_circlenum.targY = numTargs[i-1];
				dragger.addChild(_circlenum);
			}
			circleNum.x += sumX;
		}

		TweenLite.set(contenArr[1],{alpha:0});

		delete p.go;
	}


	function drag(e){
		if(e.type==='pressmove'){
			e.target.set({x:e.localX,y:e.localY});
		}else if(e.type==='mousedown'){
			e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		}else if(e.type==='pressup'){
			let data = e.target.group.mydata;
			let margin = vgroup.margin, x = vgroup.x, sumX = vgroup.sumX;

			if(e.target.x>x-margin && e.target.x<560 && e.target.y>data.y-margin && e.target.y<data.y+margin){
				father.preferSound('right');
				e.target.set({x:x+data.count*sumX,mouseEnabled:false,y:data.y});
				data.count ++;
			}else{
				e.target.x = e.target.ox;
				e.target.y = e.target.oy;
			}
		}
	}

	function numUp(e){
		if(e.target.x<vgroup.x-vgroup.margin || e.target.x>560){
			e.target.x = e.target.ox;
			e.target.y = e.target.oy;			
			return;
		}

		let targy = e.target.targY;
		for(let i=0;i<targy.length;i++){
			if(e.target.y>targy[i]-27 && e.target.y<targy[i]+27){
				e.target.set({x:e.target.targX,y:targy[i],mouseEnabled:false});
				father.preferSound('right');
				e.target.targY.splice(i,1);
				return;
			}
		}

		e.target.x = e.target.ox;
		e.target.y = e.target.oy;
	}

	function swip(e){
		if(contenArr.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !contenArr.isHead();
		prevnext.next.visible = !contenArr.isEnd();
		title.text = titleTexts[contenArr.order];
	}
})();