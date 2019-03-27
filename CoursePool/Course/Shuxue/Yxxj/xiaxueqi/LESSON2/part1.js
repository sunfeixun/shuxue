(function() {
	let father = projectData.courseInterface;
	let p = new father.part(1);

	father.loader.addLoadElement(['girl1.png','girl2.png','stuff.png','stuff.json'],father.lessonPath);
	father.loader.addLoadElement(father.courseLib + 'customShape.js');
	p.custom.noFade = true;

	let framerate = 20;
	let wait = 2;
	let girl, pop1, pop2, txt1, txt2;
	let shapeOrder, curTexts;
	let delaycall;
	let questionPool;
	let queContainer = new createjs.Container;
	let sprite;

	p.go = function() {
		sprite = father.loader.getSprite('stuff',true);
		p.addChild(sprite.desk.set({x:569,y:758}));
		
		let sheet = {
				images:[father.loader.getImage('girl1.png',1),father.loader.getImage('girl2.png',1)],
				frames:{width:219,height:297,regX:109.5,regY:148.5,count:52},
				framerate:framerate,
				animations:{}
		}

		createAnimation1(sheet.animations);
		createAnimation2(sheet.animations);

		girl = new createjs.Sprite(new createjs.SpriteSheet(sheet));

		p.addChild(girl.set({x:640,y:500}));

		pop1 = sprite.all.clone().set({visible:false,x:713,y:254,framerate:3});
		pop2 = pop1.clone().set({x:539,scaleX:-1});

		p.addChild(pop1,pop2);

		txt1 = new father.text('尖尖的？',25).set({textAlign:'center',textBaseline:'middle',x:788,y:288,visible:false});
		txt2 = txt1.clone().set({text:'一直转。',x:466});
		p.addChild(txt1,txt2);

		pop1.txt = txt1;
		pop2.txt = txt2;

		pop1.on('animationend',popup);
		pop2.on('animationend',popup);

		girl.cursor = 'pointer';
		girl.on('click',clickgirl);
		girl.on('animationend',onAned);

		//p.on('pressmove',function(e) {e.target.set({x:e.localX,y:e.localY})});
		//p.on('pressup',function(e) {log(e.localX,e.localY)});
		queContainer.cursor = 'pointer';
		queContainer.on('click',clickques);

		//问号对应的形状和文本
		let queTxtCon;
		let qt1 = new father.text('平行四边形',25).set({textAlign:'center',textBaseline:'middle'});
		let qts = [
			qt1,
			qt1.clone().set({text:'扇形'}),
			qt1.clone().set({text:'梯形'})
		];


		let sps = [
			new myObject.shape('parallelogram',{width:70,height:40,skew:20}).lineColor('black'),
			new myObject.shape('semiCircle',{diameter:56}).lineColor('black'),
			new myObject.shape('trapezium',{width:70,height:40,skew:15}).lineColor('black'),
		]

		let _ques;   //问号
		let fromOption = {x:656,y:592,scaleX:0,scaleY:0};
		let finalPos = {x:357,y:536,sumX:188}
		sprite.question.set({x:1040,y:172,scaleX:0.2,scaleY:0.2,visible:false});

		for(i=1;i<=3;i++){
			_ques = sprite.question.clone();
			_ques.custom = {};

			queTxtCon = new createjs.Container;
			_ques.custom.shapeTxt = queTxtCon;
			_ques.custom.shapeTxt.addChild(sps[i-1].set({x:_ques.x,y:_ques.y}),qts[i-1].set({x:_ques.x-100,y:_ques.y}));
			p.addChild(queTxtCon);

			_ques.custom.tween1 = new TimelineLite().from(_ques,0.7,fromOption);
			i===3? _ques.custom.tween1.call(allQueShow,[true],null,'-=0.5'):_ques.custom.tween1.call(allQueShow,null,null,'-=0.5');

			queContainer.addChild(_ques);
			sprite.question.y += 115;

			finalPos.x += finalPos.sumX;
		}

		sps[1].y += 10;

		p.addChild(queContainer);
		p.setChildIndex(queContainer,0);

		createAnimation1 = null;
		createAnimation2 = null;
		addwait = null;

		p.addChild(sprite.arrow.set({rotation:45,x:751,y:543,scaleX:0.5,scaleY:0.5}));

		p.reset();

		delete p.go;
	}

	p.reset = function() {
		girl.mouseEnabled = true;

		shapeOrder = [
				{an:'case1',txts:['扁的','薄的','歪的','尖尖的']},
				{an:'case1',txts:['扁的','薄的','弯的','尖的']},
				{an:'case2',txts:['扁的','薄的','斜的','歪的','尖的']}
			];

		girl.gotoAndStop(0);
		hideTxt();
		pop1.gotoAndStop(0);
		pop2.gotoAndStop(0);

		questionPool = new Array().concat(queContainer.children);

		for(let i=0;i<questionPool.length;i++){
			questionPool[i].visible = false;
			!questionPool[i].custom.tween1.paused() && questionPool[i].custom.tween1.pause();
			questionPool[i].custom.tween1.seek(0);
			questionPool[i].custom.shapeTxt.visible = false;
		}
	}

	function clickgirl() {
		girl.mouseEnabled = false;
		let o = shapeOrder.shift();
		hideTxt();
		curTexts = o.txts;
		girl.gotoAndPlay(o.an);
	}

	function onAned(e) {
		switch(girl.currentAnimation){
			case 'wait11':case 'wait21':case 'wait13':case 'wait23': case 'wait25':
				showPop1();
				break;
			case 'wait12':case 'wait22':case 'wait14': case 'wait24':
				showPop2();
				break;
		}

		if(girl.currentAnimation==='wait14'||girl.currentAnimation==='wait25'){
			delaycall = TweenLite.delayedCall(2,getOne);
		}
	}

	function getOne() {
		let ques = questionPool.shift();
		ques.visible = true;
		ques.custom.tween1.play();
		girl.gotoAndStop(0);
		hideTxt();
	}

	function allQueShow(last) {
		father.preferSound('ding');
		girl.mouseEnabled = last? false:true;
	}

	function clickques(e) {
		father.preferSound('click');
		e.target.visible = false;
		e.target.custom.shapeTxt.visible = true;
		TweenLite.fromTo(e.target.custom.shapeTxt,0.7,{alpha:0},{alpha:1});
	}

	function showPop1() {
		hideTxt();
		pop1.visible = true;
		pop2.visible = false;
		pop1.gotoAndPlay('all');
	}

	function showPop2() {
		hideTxt();
		pop2.visible = true;
		pop1.visible = false;
		pop2.gotoAndPlay('all');
	}

	function popup(e) {
		e.name === 'all' && e.target.txt.set({text:curTexts.shift(),visible:true});
	}

	function hideTxt() {
		txt1.visible = txt2.visible = false;
		pop1.visible = pop2.visible = false;
	}

	function createAnimation1(o) {
		o.case1 = [0,15,"wait11"],
		o.wait11 = {frames:addwait(15),next:"eyeup1"};
		o.eyeup1 = [16,30,"wait12"];
		o.wait12 = {frames:addwait(30),next:"eyeleft"};
		o.eyeleft = [31,40,"wait13"];
		o.wait13 = {frames:addwait(40),next:"eyeright"};
		o.eyeright = [41,51,"wait14"];
		o.wait14 = {frames:addwait(51),next:"eyeleft1"};
		o.eyeleft1 = [31,40,null];
	}

	function createAnimation2(o) {
		o.case2 = [0,15,"wait21"],
		o.wait21 = {frames:addwait(15),next:"eyeup2"};
		o.eyeup2 = [16,30,"wait22"];
		o.wait22 = {frames:addwait(30),next:"eyeleft2"};
		o.eyeleft2 = [31,40,"wait23"];
		o.wait23 = {frames:addwait(40),next:"eyeright2"};
		o.eyeright2 = [41,51,"wait24"];
		o.wait24 = {frames:addwait(51),next:"eyeleft3"};
		o.eyeleft3 = [31,40,"wait25"];
		o.wait25 = {frames:addwait(40),next:"eyeright4"};
		o.eyeright4 = [41,51,null];
	}

	function addwait(frame) {
		let arr = new Array;

		while(arr.length<framerate*wait){
			arr.push(frame);
		}

		return arr;
	}
})();