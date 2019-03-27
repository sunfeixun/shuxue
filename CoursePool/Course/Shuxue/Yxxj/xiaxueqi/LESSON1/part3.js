(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	father.loader.addLoadElement(['part3.json','part3.png'],father.lessonPath);

	let shapeContainer = new createjs.Container;
	let questions = new father.orderContent;
	let curSlide = 0;
	let prevnext;

	p.go = function() {
		let sprite = father.loader.getSprite('part3',true);
		let positions;

		positions = [{x:194,y:520},{x:613,y:567}];
		putShape('square');

		positions = [{x:932,y:545},{x:1107,y:634},{x:191,y:636}];
		putShape('rectangle');

		positions = [{x:981,y:640},{x:471,y:570},{x:867,y:640},{x:326,y:623}];
		putShape('circle');

		positions = [{x:329,y:539},{x:769,y:555},{x:471,y:649},{x:1106,y:530},{x:711,y:657}];
		putShape('triangle');

		shapeContainer.cursor = 'pointer';

		///创建四个题目和翻页按钮；
		let nextprevCon = new createjs.Container;

		nextprevCon.cursor = 'pointer';
		nextprevCon.on('click',swip);

		prevnext = new father.prevNext;

		prevnext.addTo(nextprevCon);

		positions = {x:640,y:197};

		let _con;

		for(let i=1;i<=4;i++){
			_con = new createjs.Container;
			_con.addChild(sprite['q'+i].set(positions));
			_con.addChild(shapeContainer.clone(true));
			if(i!==3){
				
				_con.getChildAt(1).on('pressmove',drag);
				_con.getChildAt(1).on('mousedown',drag);		
			}else{
				sprite['q'+i].set({cursor:'pointer',funcName:'next'}).on('click',swip,null,false,true);
				_con.addChild(new createjs.Shape(new createjs.Graphics().f('rgba(255,255,255,0.01)').r(0,0,500,55))).set({x:395,y:135}).on('click',empty);
			}

			questions.push(_con);
			p.addChild(_con);
		}

		sprite.q1.y += 50;

		questions.init();

		p.addChild(nextprevCon);

		delete p.go;

		function putShape(name) {
			for(let i=1;i<=positions.length;i++){
				sprite[name+i].set(positions[i-1]);
				shapeContainer.addChild(sprite[name+i]);
				sprite[name+i].set({scaleX:0.7,scaleY:0.7});
			}
		}
	}

	function drag(e) {
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function swip(e,fire) {
		if(questions.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !questions.isHead();
		prevnext.next.visible = !questions.isEnd();
		fire && father.playFire();
	}

	function empty() {

	}

})();