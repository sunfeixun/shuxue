(function() {
	let father = projectData.courseInterface;

	let p = new father.part(3);

	const containerArr = new father.orderContent;
	let prevnext;

	father.loader.add('part3.png',father.lessonPath);

	p.go = function() {

		let txt = new father.text('1、你能把后面的原点排出来吗？',40).set({textAlign:'center',textBaseline:'middle',x:640,y:100}), _txt;
		let texts = ['1、你能把后面的原点排出来吗？','2、你知道我盖住的是哪个颜色？','3、这些小圆点是按什么规律排队的呢？','4、你能给小圆点和它的好朋友排队吗？'];
		let btnContainer = new createjs.Container;
		let duration = 0.3;
		let i,j;
		let order;
		let con;

		prevnext = new father.prevNext;

		let shapeContainer = new createjs.Container ,_spc;
		let shapes = [
			new createjs.Shape(new createjs.Graphics().f('black').dc(0,0,50,50)),
			new createjs.Shape(new createjs.Graphics().f('yellow').dc(0,0,50,50)),
			new createjs.Shape(new createjs.Graphics().f('red').dc(0,0,50,50)),
			new createjs.Shape(new createjs.Graphics().f('green').dc(0,0,50,50)),
			new createjs.Shape(new createjs.Graphics().f('red').mt(0,-50).lt(50,50).lt(-50,50).cp()),
			new createjs.Shape(new createjs.Graphics().f('#00B0F0').mt(0,-50).lt(50,0).lt(0,50).lt(-50,0).cp())
		];

		let x = 262, sumX = 151;

		for(i=0;i<6;i++){
			for(j=0;j<2;j++){
				shapeContainer.addChild(shapes[i].clone()).set({x:x,y:610});
			}
			x += sumX;
		}

		for(i=0;i<texts.length;i++){
			con = new createjs.Container;
			con.addChild(txt.clone().set({text:texts[i]}));
			_spc = shapeContainer.clone(true);
			_spc.set({cursor:'pointer'});
			_spc.on('mousedown',drag);
			_spc.on('pressmove',drag);
			con.addChild(_spc);
			con.shapeContainer = _spc;
			containerArr.push(con);
			p.addChild(con);
		}
		containerArr.init();

		p.addChild(btnContainer);
		prevnext.addTo(btnContainer);
		btnContainer.cursor = 'pointer';
		btnContainer.on('click',swipQuestion);

		x = 147, sumX = 141, y = 305;
		order = [0,2,4,6];

		for(i=0;i<order.length;i++){
			containerArr.getContentAt(0).shapeContainer.getChildAt(order[i]).set({x:x,y:y});
			x += sumX;
		}

		x = 147, sumX = 141;
		order = [0,2,4,6,,3,5,7];

		for(i=0;i<order.length;i++){
			order[i]!==undefined && containerArr.getContentAt(1).shapeContainer.getChildAt(order[i]).set({x:x,y:y});
			x += sumX;
		}

		x = 147, sumX = 141;

		order = [2,0,4,6,3,1,5,7];

		for(i=0;i<order.length;i++){
			containerArr.getContentAt(2).shapeContainer.getChildAt(order[i]).set({x:x,y:y});
			x += sumX;
		}

		delete p.go;
	}


	function swipQuestion(e) {
		if(containerArr.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !containerArr.isHead();
		prevnext.next.visible = !containerArr.isEnd();
	}

	function drag(e) {
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

})();