(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	father.loader.addLoadElement(['part3.json','part3.png'],father.lessonPath);

	let chains = new father.orderContent, curCon = 0;
	let prevnext;

	p.go = function() {
		let sprite = father.loader.getSprite('part3',true);

		let shapeContainer = new createjs.Container, positions;
		let _tempCon;
		let nextprevCon = p.addChild(new createjs.Container);

		shapeContainer.cursor = 'pointer';

		positions = [{x:166,y:587},{x:484,y:634},{x:765,y:520},{x:923,y:502}];
		initshape('semi');
		positions = [{x:306,y:565},{x:705,y:627}];
		initshape('para');
		positions = [{x:1107,y:575},{x:933,y:642},{x:526,y:511}];
		initshape('trap');

		prevnext = new father.prevNext;

		//next = sprite.next.set({scaleX:0.3,scaleY:0.3,x:1242,y:350,funcName:'next'});
		//prev = nextprevCon.addChild(sprite.next,sprite.next.clone().set({x:40,scaleX:-sprite.next.scaleX,funcName:'prev',visible:false}));

		prevnext.addTo(nextprevCon);

		nextprevCon.cursor = 'pointer';
		nextprevCon.on('click',nextQuestion);

		sprite.rect.set({x:640,y:300,scaleX:1.5});
		sprite.para1.set({scaleX:0.8,scaleY:0.8})     ///有一个平行四边形太大了

		let qPos = {x:640,y:60};

		//创建4个问题

		//p.on('pressmove',function(e) {e.target.set({x:e.localX,y:e.localY})});
		//p.on('pressup',function(e) {log(e.localX,e.localY)});

		for(let i=1;i<=4;i++){
			_tempCon = new createjs.Container;
			p.addChild(_tempCon);
			chains.push(_tempCon);
			_tempCon.addChild(sprite['q'+i].set(qPos));

			if(i===4) {
				_tempCon.addChild(new createjs.Container).set({cursor:'pointer'}).addChild(sprite.can.set({x:540,y:165,face:sprite.face1}),sprite.canot.set({x:740,y:165,face:sprite.face2}));
				_tempCon.getChildAt(_tempCon.numChildren-1).on('click',clickCan,null,true,_tempCon);     //一次性的事件侦听，如果需要reset，需要改成false
				continue;
			}

			_tempCon.addChild(sprite.rect.clone());
			_tempCon.addChild(cloneShapes());
		}

		chains.init();

		delete p.go;

		function initshape(str) {
			for(let i=1;i<=positions.length;i++){
				sprite[str+i].set(positions[i-1]);
				shapeContainer.addChild(sprite[str+i]);
			}
		}

		function cloneShapes() {
			let s = shapeContainer.clone(true);
			s.on('mousedown',drag);
			s.on('pressmove',drag);
			return s;
		}
	}


	function nextQuestion(e) {
		if(chains.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !chains.isHead();
		prevnext.next.visible = !chains.isEnd();
	}

	function drag(e) {
		e.type==='mousedown' && e.target.parent.setChildIndex(e.target,e.target.parent.numChildren-1);
		e.target.set({x:e.localX,y:e.localY});
	}

	function clickCan(e,con) {
		con.removeChild(e.target.parent);
		con.addChild(e.target.face.set({x:640,y:300}));
		father.playFire();
	}
})();