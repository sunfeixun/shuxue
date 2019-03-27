let ShuxueYxxj1 = {};   //课程管理器
var projectData = {width:1280,height:720};      //针对该系列课程的数据
var courseGetter = courseGetter || null;

if(courseGetter){
	courseGetter.addPlugin({Lib:'myLib.js',TweenLite:'TweenMax.min.js'},courseGetter.libPath);
	courseGetter.addPlugin({QuizPool:'quizInterface.js'},courseGetter.basePath+'QuizPool/');
} 

/*
init()				初始化当前课程。canvas:指定一个canvas实例或ID作为舞台。

loadLesson()		加载课程方法，传入课程数（第几课），onLoadUp:加载完所有课程Js后执行的方法；
showTip()			显示/隐藏“活动准备环节”
gotoPart()			跳转到指定环节
switchSubPart()		切换子环节
resetSlide()		重置当前环节内容

lessonPath			当前课程的src地址（需要先执行loadLesson方法生成），会加上courseGetter的当前课程类目录（courseGetter.coursePath）

perferSound(),getClickBoard(),playFire(),hitTestObject()	封装常用的声音，点击区域，礼花，检测物体碰撞点方法。
read() 朗读/旁白

tipOnce 类			用于 “操作练习” 环节只出现一次的提示
tip 类 				“活动准备” 环节
part 类				其他所有环节
text 类 				课程文本统一使用text类，方便统一更换字体
textCover类 			文本着重显示框
prevNext类			页面切换显示按钮，用于其他框架替换
*/

(function(){

	let p = new createjs.EventDispatcher;
	let queue, loadList = new Array, loadCompleteFunc = new Array;
	let allComplete;
	let slideAnimation;				//页面切换动画
	let lihua = null;
	let basePath = '';
	let preferSoundInstance;
	let readSound;

	p.lessonPath = null;
	p.partStruc = ['tip','part1','part4','part5'];
	p.shower = new createjs.Container;
	p.loader = null;
	p.currentSlide = undefined;
	p.lastSlide = undefined;
	p.isTip = false;
	p.courseLib = courseGetter.courseClass + 'courseLib/';
	p.defaultFont = 'Kaiti';

	p.init = function(canvas) {
		Lib.stageFunc.initStage('canvas',{width:1280,height:720});        //初始化舞台方法封装到Lib里，包括自适应

		p.loader = new Lib.loader(false);

		slideAnimation = new TweenLite.from(p.shower,0.7,{alpha:0}).pause();

		p.container = Lib.stageFunc.getStuff('rootContainer');
		p.canvas = Lib.stageFunc.getStuff('canvas');
	}

	p.loadLesson = function(partNum,onLoadUp) {
		TweenLite.defaultEase = Linear.easeNone;
		p.title = QuizPool.title;
		
		onLoadUp && p.loader.on(Lib.loader.HANDLE_COMPLETE,onLoadUp);

		let courseloader = new createjs.LoadQueue(false);
		let courseFiles = [];
		let quizPath;
		let filenameGetter;

		p.lessonPath = courseGetter.coursePath || '';
		p.lessonPath = p.lessonPath + '/LESSON' + partNum + '/';
		quizPath = courseGetter.quizPath + 'LESSON' + partNum + '/'; //+'QuizPool/Shuxue/Yxxj/shangxueqi/LESSON'

		filenameGetter = new Lib.fileNamesGetter;
		filenameGetter.add({jsonSrc:quizPath+'content.json',id:'quiz'},{jsonSrc:p.lessonPath+'part2Content.json',id:'part2'});
		filenameGetter.on('processComplete',loadCourseJs);
		filenameGetter.Load();

		function loadCourseJs(e){
			let result = e.target.processedResult;
			let publicAsset = courseGetter.courseClass + 'publicAsset/';
			
			p.loader.add(['01','02','03','04','05','06','07','08','09','10','11','12','13','14'],publicAsset + 'graphics/lihua/','.png');
			p.loader.add('tipbg.jpg',publicAsset + 'graphics/');
			p.loader.add(['aao','objIn','click','ding','sucess'],publicAsset + 'sound/','.mp3');
			//p.loader.add('next.png',publicAsset + 'graphics/');

			p.partStruc = p.partStruc.concat(result.quiz).concat(result.part2);

			for(let i=0;i<p.partStruc.length;i++){
				if(typeof(p.partStruc[i])==='string'){
					courseFiles.push({src:fixSrc(p.partStruc[i]),type:'javascript'});
				}else if(p.partStruc[i] instanceof Array){
					for(let j=0;j<p.partStruc[i].length;j++){
						courseFiles.push({src:fixSrc(p.partStruc[i][j]),type:'javascript'});
					}
				}
			}

			QuizPool.text = Lib.text;
			QuizPool.loader = p.loader;
			QuizPool.quizPath = quizPath;
			QuizPool.read = p.read;
			QuizPool.quizClass = courseGetter.quizClass;
			p.group = QuizPool.group;
			p.createElement = QuizPool.createElement;


			courseloader.on('complete',_jsload);
			courseloader.on('error',_jsload);
			courseloader.loadManifest(courseFiles);
		}

		/*
		var font = document.createElement('style');
		var str = "@font-face{font-family:'test';src:url('" + courseGetter.coursePath + "font/arial.ttf')";
		font.appendChild(document.createTextNode(str));
		document.head.appendChild(font);*/

		function _jsload(e) {

			if(e.type === 'error'){
				
			}else if(e.type==='complete'){
				p.loader.Load();
				let quizes = QuizPool.quiz.getAllQuiz();
				for(let i=0;i<quizes.length;i++){
					quizes[i].on(QuizPool.ANSWER_CORRECT,onAnswer);
					quizes[i].on(QuizPool.ANSWER_INCORRECT,onAnswer);
					quizes[i].on(QuizPool.ANSWER_FINISH,onAnswer,null,true);
				}
				p.part.insertPart(quizes,3);
			}
		}

		function fixSrc(src){
			return src.indexOf('/') <0 ? p.lessonPath + src + '.js':src;
		}
	}

	p.showTip = function(mode) {
		let state, tip = p.part.queue[0];

		if(mode==='toggle'){					//切换tip显示
			state = tip.isShow()? 'off':'on';
			p.isTip = !tip.isShow();
			tip.show(state);
			tip.go && tip.go();
			tip.parent === null && p.shower.addChild(tip);
		}else if(mode==='off'){
			tip.isShow() && tip.show('off');
			p.isTip = false;
		}
	}

	p.gotoPart = function(slideNum) {
		let queue = p.part.queue, slide = queue[slideNum];

		try{
			if(slide === p.currentSlide || (p.currentSlide.forControl.subPart && slide === p.currentSlide.getQueue()))  return false;
		}catch(e){}

		slide = slide instanceof Array? slide[0]:slide;

		slideChange(slide);

		return true;
	}

	p.switchSubPart = function(forward) {
		let queue = p.currentSlide.getQueue();
		let id = forward === 'next'? p.currentSlide.getLocalID()+1:p.currentSlide.getLocalID()-1;
		queue[id] && slideChange(queue[id]);
	}

	p.resetSlide = function() {
		p.currentSlide.reset && p.currentSlide.reset();
	}

	p.preferSound = function(type) {
		let o = {
			click:'click',
			objIn:'objIn',
			wrong:'aao',
			right:'click',
			ding:'ding',
			sucess:'sucess'
		}

		type = o[type]+'.mp3';
		preferSoundInstance && preferSoundInstance.stop();
		preferSoundInstance = p.loader.playSound(type,true);
	}

	p.getClickBoard = function(addTo,size) {
		size = size || {};
		size.width = size.width || 1280;
		size.height = size.height || 720;
		let _shape = new createjs.Shape(new createjs.Graphics().f('rgba(255,255,255,0.01)').r(0,0,size.width,size.height)).set({cursor:'pointer'});
		addTo && addTo.addChild(_shape);
		return _shape;
	}

	p.hitTestObject = function (target,stagex,stagey) {
		let gtl = target.globalToLocal(stagex,stagey);
		return target.hitTest(gtl.x,gtl.y);
	}

	p.playFire = function() {
		lihua === null && createLihua();
		playLihua();
	}

	p.read = function(sound){
		readSound && readSound.stop();
		readSound = createjs.Sound.play(sound);
		return readSound;
	}

	function onAnswer(e){
		let eve = new createjs.Event(e.type);
		eve.slide = e.target;
		p.dispatchEvent(eve);
	}

	function slideChange(slide) {
		if(slide instanceof createjs.Container===false) return false;
		readSound && readSound.stop();

		p.shower.removeAllChildren();
		p.shower.addChild(slide);

		if(slide.linkObject){
			slide.linkObject.go && slide.linkObject.go();
		}else{
			slide.go && slide.go();
		}
		
		slide.custom.autoReset && slide.reset();

		p.lastSlide = p.currentSlide;
		p.currentSlide = slide;
		p.dispatchEvent('slidechange');


		if(slide.custom.noFade){
			slideAnimation.seek(slideAnimation.duration());
		}else{
			slideAnimation.restart();
		}
	}

	function createLihua(){
		let str, imgs = new Array, sheet;
		for(let i=1;i<=14;i++){
			str = i<10? '0'+i:i.toString();
			imgs.push(p.loader.getImage(str+'.png',1));
		}

		sheet = {
			images:imgs,
			frames:{width:545,height:874},
			framerate:25
		};

		lihua = new createjs.Sprite(new createjs.SpriteSheet(sheet));
		lihua.set({x:322,y:-150});
		lihua.visible = false;
		createLihua = null;
	}

	function playLihua(){
		if(lihua.visible)
		{
			return;
		}
		!lihua.parent && p.shower.addChild(lihua);
		lihua.visible = true;
		lihua.play();
		TweenLite.delayedCall(3,function(){
			lihua.visible = false;
			lihua.gotoAndStop(0);
		});
	}

	 projectData.courseInterface = ShuxueYxxj1 = p;
	 courseGetter.regManager(p);
})();

//单独建立文本类，只是为了方便后期统一置换字体
(function(){
	const defaultFont = ShuxueYxxj1.defaultFont;

	function text(text,size,color){
		text = text||'';
		size = size || 30;
		color = color || 'black';
		let font = size.toString() + 'px ' + defaultFont;
		this.Text_constructor(text,font,color);
		this.lineHeight = size*1.3;
	}

	let p = createjs.extend(text,createjs.Text);

	p.alignCenter = function(){
		this.set({textAlign:'center',textBaseline:'middle'});
		return this;
	}

	p.addTo = function(parent){
		parent.addChild(this);
		return this;
	}

	Object.defineProperties(p,{
		size:{
			get:function(){return parseInt(this.font)},
			set:function(n){this.font = n.toString() + 'px ' + defaultFont}
		}
	});

	ShuxueYxxj1.text = createjs.promote(text,'Text');
})();

(function() {
	let p;

	const globalPartQueue = new Array;

	function part(partID,subID) {
		this.Container_constructor();

		if(globalPartQueue[partID] && globalPartQueue[partID][subID]){
			throw new Error('当前环节已经被占用 partid:'+partID+' subid:'+subID);
		};

		this.forControl = {};
		this.custom = {};

		if(subID===undefined){
			globalPartQueue[partID] = this;
			this.forControl.queue = globalPartQueue;
			this.forControl.subPart = false;
		}else{
			globalPartQueue[partID] = globalPartQueue[partID] || new Array;
			globalPartQueue[partID][subID] = this;
			this.forControl.queue = globalPartQueue[partID];
			this.forControl.subPart = true;
			this.custom.state = 'normal';
		}

		partID === 4 && this.on('added',function(){this.addChild(ShuxueYxxj1.loader.getImage('tipbg.jpg'));},null,true);
	}

	part.insertPart = function(newpart,id){
		let np;
		if(newpart.constructor === Array){
			for(let i=0;i<newpart.length;i++){
				np = new part(id,i);
				np.addChild(newpart[i]);
				np.reset = newpart[i].reset;
				np.custom = newpart[i].custom;
				np.linkObject = newpart[i];
			}
		}else{
			np = new part(id);
			np.addChild(newpart);
		}
	}

	p = createjs.extend(part,createjs.Container);

	p.getGlobalID = function() {
		if(this.forControl.subPart){
			return globalPartQueue.indexOf(this.forControl.queue);
		}else{
			return globalPartQueue.indexOf(this);
		}
	}

	p.getLocalID = function() {
		return this.forControl.queue.indexOf(this);
	}

	p.isSubPart = function() {
		return this.forControl.subPart;
	}

	p.getQueue = function() {
		return this.forControl.queue;
	}

	p.regCount = function(num,func) {
		typeof(num)!=='number' && console.log('没写count数值');
		this.custom.countLimit = num;
		this.custom.countNum = 0;
		if(typeof(func)==='function') this.custom.onCountOver = func;
	}

	p.count = function() {
		this.custom.countNum ++;

		if(this.custom.countNum>=this.custom.countLimit){
			ShuxueYxxj1.playFire();
			this.custom.onCountOver && this.custom.onCountOver();
		}
	}

	p.resetCount = function() {
		this.custom.countNum = 0;
	}

	part.queue = globalPartQueue;

	ShuxueYxxj1.part = createjs.promote(part,'Container');


	/////tip类，就是活动准备环节，显示方式不同于其他环节
	function tip() {
		this.Container_constructor();
		globalPartQueue[0] = this;
		this.custom = {};
		this.custom.tween = TweenLite.from(this,0.7,{scaleX:0,scaleY:0,ease:Back.easeOut}).pause();
		this.custom.tween.eventCallback('onReverseComplete',hideTip,[this]);
		this.custom.show = false;
		this.on('click',function() {});     //添加空白点击事件来阻止点击下方
		//this.addChild(new createjs.Shape(new createjs.Graphics().f('white').rr(0,0,1280,720,70)));
		this.set({x:640,y:360,regX:640,regY:360});
		this.on('added',function(){this.addChildAt(ShuxueYxxj1.loader.getImage('tipbg.jpg'),0)},null,true);
	}

	function hideTip(targ) {
		targ.parent && targ.parent.removeChild(targ);
	}

	p = createjs.extend(tip,createjs.Container);

	p.show = function(mode) {       //活动准备需要切换显示/隐藏
		mode==='off'? this.custom.tween.reverse():this.custom.tween.play();
		this.custom.show = mode==='off'? false:true;
	}

	p.isShow = function() {
		return this.custom.show;
	}

	ShuxueYxxj1.tip = createjs.promote(tip,'Container');
})();

(function() {
	let p;

	function tiponce(txt) {
		this.Container_constructor();
		this.set({regX:640,regY:360,x:640,y:360});

		txt = new ShuxueYxxj1.text(txt,40);
		txt.set({x:(1280-txt.getBounds().width)/2,y:300});

		this.addChild(new createjs.Shape(new createjs.Graphics().f('white').r(0,0,1280,720)),txt);
		this.cursor = 'pointer';
		this.on('click',p.hideme,this,true);

		this.custom = {};
		this.custom.st = null;
		this.custom.recorder = new Array;          //用来记录舞台其他元素visible属性；
		this.custom.listenOut = null;
		this.custom.listenResume = null;
	}

	function destroyTip() {
		this.removeAllChildren();
		this.removeAllEventListeners();
		this.parent.removeChild(this);
	}

	function listenOut(e,d) {         //如果当前页切换出去，tip倒计时暂停
		if(!this.custom.st) return;
		d === 'pause'? this.custom.st.pause():this.custom.st.resume();
	}

	p = createjs.extend(tiponce,createjs.Container);

	p.hideme = function(){
		for(let i=0;i<this.custom.recorder.length;i++){
			this.custom.recorder[i][0].visible = this.custom.recorder[i][1];
		}

		TweenLite.to(this,0.5,{scaleX:0,scaleY:0,ease:Back.easeIn,onComplete:destroyTip,onCompleteScope:this});
		this.parent.off('removed',this.custom.listenOut);
		this.parent.off('added',this.custom.listenResume);
		this.custom.st && this.custom.st.kill();

		delete this.custom;
	}

	p.showOut = function() {
		if(!this.parent){
			console.log('需要先添加到容器中来隐藏其他元素');
			return;
		}

		this.custom.st = TweenLite.delayedCall(5,p.hideme,null,this);

		let children = this.parent.children;

		for(let i=0;i<children.length;i++){
			if(children[i]===this) continue;
			this.custom.recorder.push([children[i],children[i].visible]);
			children[i].visible = false;
		}

		TweenLite.from(this,0.5,{scaleX:0,scaleY:0,ease:Back.easeOut});
		this.custom.listenOut = this.parent.on('removed',listenOut,this,false,'pause');
		this.custom.listenResume = this.parent.on('added',listenOut,this,false,'resume');

		return this;
	}

	ShuxueYxxj1.tipOnce = createjs.promote(tiponce,'Container');
})();

(function() {
	let p;

	function textcover(txt,addTo,shiftX,shiftY){
		this.Shape_constructor();

		let bound = txt.getTransformedBounds();
		bound.height -= txt.lineHeight - txt.size;

		this.graphics.f('#00FFFF').r(0,0,bound.width,bound.height);
		this.alpha = 0.6;
		this.x = bound.x;
		this.y = bound.y;
		addTo.addChild(this);
	}

	p = createjs.extend(textcover,createjs.Shape);

	ShuxueYxxj1.textCover = createjs.promote(textcover,'Shape');
})();

(function() {
	let bitmapSource = null;


	function prevNext(){
		if(!bitmapSource){
			this.next = ShuxueYxxj1.loader.getImage('next.png','center').set({scaleX:0.3,scaleY:0.3,x:1242,y:350});
			this.prev = this.next.clone().set({x:40,visible:false,scaleX:-this.next.scaleX});
		}else if(bitmapSource.prev && bitmapSource.next){
			this.prev = bitmapSource.prev.clone();
			this.next = bitmapSource.next.clone();
		}

		this.prev.funcName = 'prev';
		this.next.funcName = 'next';
	}


	prevNext.setBitmapSource = function(source) {
		bitmapSource = source;
	}

	prevNext.prototype.addTo = function(parent) {
		parent.addChild(this.prev,this.next);
		return parent;
	}

	ShuxueYxxj1.prevNext = prevNext;	
})();

(function() {

	function timelinetext(texts) {
		this.Container_constructor();
		let txt = new ShuxueYxxj1.text('',50).set({x:650,y:240,textAlign:'center',textBaseline:'middle'}), _txt;
		let duration = 0.4;
		let button = new createjs.Container().set({x:640,y:480});
		let timeline = new TimelineLite();
		let buttonCon = new createjs.Container;

		button.addChild(
			new createjs.Shape(new createjs.Graphics().f('#3399FF').rr(-110,-50,220,100,49)),
			new ShuxueYxxj1.text('确 定',50,'white').set({textAlign:'center',textBaseline:'middle'})
			);

		buttonCon.addChild(button);

		this.addChild(buttonCon);
		this.custom = {};

		for(let i=0;i<texts.length;i++){
			if(_txt){
				timeline.to(_txt,duration,{alpha:0});
			}

			_txt = txt.clone().set({text:texts[i]});
			this.addChild(_txt);
			timeline.from(_txt,duration,{alpha:0}).call(showbtn,null,this,'-='+duration.toString()).addPause();
		}

		this.custom.buttonTween = TweenLite.from(buttonCon,duration,{alpha:0}).pause();
		buttonCon.cursor = 'pointer';
		buttonCon.on('click',onclick,this);

		this.custom.limit = texts.length;
		this.custom.count = 0;
		this.custom.timeline = timeline;
		this.custom.defaultButton = button;
		this.custom.buttonIndex = [];
		this.custom.buttonCon = buttonCon;
		this.custom.noActButton = [];
	}

	function onclick(e) {
		if(this.custom.noActButton.indexOf(e.target)!==-1 || (!this.custom.timeline.paused() && this.custom.timeline.progress()!==1)) return;

		this.custom.count ++;
		if(this.custom.count>=this.custom.limit){
			this.custom.buttonCon.visible = false;
			ShuxueYxxj1.preferSound('sucess');
			ShuxueYxxj1.playFire();
		}else{
			this.custom.timeline.play();
			this.custom.buttonTween.seek(0).pause();
		}
	}

	function showbtn() {
		let buttonIndex = this.custom.buttonIndex;
		for(let i=0;i<buttonIndex.length;i++){
			if(buttonIndex[i][0]===this.custom.count){
				this.custom.defaultButton.visible = false;
				this.custom.buttonIndex[i][1].visible = true;
			}
			break;
		}

		this.custom.buttonTween.restart();
	}

	let p = createjs.extend(timelinetext,createjs.Container);

	p.otherButton = function(index,button) {
		this.custom.buttonIndex.push([index,button]);
		this.custom.buttonCon.addChild(button);
		button.visible = false;
	}

	p.getDefaultButton = function() {
		return this.custom.defaultButton;
	}

	p.noAct = function(btn) {
		this.custom.noActButton.push(btn);
	}

	ShuxueYxxj1.timelineText = createjs.promote(timelinetext,'Container');
})();

/*
(function(){
	function ordercontent(source){
		this.Array_constructor();
		if(source){
			for(let i=0;i<source.length;i++){
				this.push(source[i]);
			}
		}
		this.order = 0;
	}

	let p = createjs.extend(ordercontent,Array);

	p.swip = function(to){
		if(TweenMax.isTweening(this)) return null;
		let order = this.order;
		
		to === 'next'? this.order ++:this.order --;

		if(!this[this.order]){
			this.order = order;
			return null;
		}

		TweenLite.set(this[order],{alpha:0});
		TweenLite.to(this[this.order],0.75,{alpha:1});
		return this.order;
	}

	p.init = function(){
		for(let i=0;i<this.length;i++){
			TweenLite.set(this[i],{alpha:0});
		}
		this.order = 0;
		TweenLite.set(this[0],{alpha:1});
	}

	p.isEnd = function(){
		return this.order === this.length-1;
	}

	p.isHead = function(){
		return this.order === 0;
	}

	p.getContentAt = function(order){
		return this[order];
	}

	ShuxueYxxj1.orderContent = createjs.promote(ordercontent,'Array');
})();*/

ShuxueYxxj1.forTest = function(cont){
	cont.on('pressmove',drag);
	cont.on('pressup',drag);

	function drag(e){
		e.type==='pressmove' && e.target.set({x:e.localX,y:e.localY});
		e.type==='pressup' && console.log(e.target.x,e.target.y);
	}
}

function rs(){
	ShuxueYxxj1.resetSlide();
}