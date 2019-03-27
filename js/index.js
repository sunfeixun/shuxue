	var menu;

	//sessionStorage.lesson = 4;
	//window.location.href = 'course.html';

	(function(){
		var p = {
			width:1280,
			height:720
		};

		var openedLesson = 6;
		var lesson = [];
		var container, canvas, frogContainer, bgContainer, boundWidth;
		let loader = new Lib.loader;

		for(var i=1;i<=openedLesson;i++){
			lesson.push(i);
		}

		p.init = function(){
			canvas = document.getElementById('canvas');
			var stage = new createjs.Stage(canvas);
			container = stage.addChild(new createjs.Container);
			createjs.Touch.enable(stage);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.timingMode = 'raf';
			createjs.Ticker.addEventListener("tick", stage);
			stage.enableMouseOver();

			var scale = 1 / window.devicePixelRatio;
			document.querySelector('meta[name="viewport"]').setAttribute('content','width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
			canvas.style.position = "absolute";

			var uipath = 'graphics/mainMenu/';

			loader.add(['bg1','bg2','bg3','bg4'],uipath,'.jpg');
			loader.add(['frogs.png','frogs.json'],uipath);
			loader.on(Lib.loader.HANDLE_COMPLETE,loaded);
			loader.Load();

			window.addEventListener('resize',resize);



			resize();
		}

		function loaded(){
			var frogPos = [[269,87],[450,497],[601,240],[716,55],[1063,107],[1370,466],[1483,221],[1815,334],[1850,77],[2152,115],[2297,249],[2605,422],[2571,203],[2667,90],[2990,41],[3056,148],[3433,115],[3888,188],[4180,261],[4026,505],[4488,492],[4566,244],[4644,87],[4930,114],[5203,258]];
			var frogs = loader.getSprite('frogs');
			var _bg;
			bgContainer = container.addChild(new createjs.Container);
			
			for(var i=1;i<=4;i++){	
				_bg = loader.getImage('bg'+i);
				i>1 && _bg.set({x:bgContainer.getChildAt(bgContainer.numChildren-1).getBounds().width + bgContainer.getChildAt(bgContainer.numChildren-1).x});
				bgContainer.addChild(_bg);
			}

			boundWidth = container.getBounds().width;

			frogContainer = bgContainer.addChild(new createjs.Container);
			frogContainer.cursor = 'pointer';
			frogContainer.on('click',chooseLesson);

			for(i=1;i<=25;i++){
				frogContainer.addChild(frogs['frog'+i]).set({x:frogPos[i-1][0],y:frogPos[i-1][1],_lesson:i});
			}

			bgContainer.on('mousedown',move);
			bgContainer.on('pressmove',move);

			fortest(container);
		}

		function move(e){
			if(e.type=='mousedown'){
				bgContainer._moveOx = e.localX;
			}else if(e.type=='pressmove'){
				bgContainer.x += e.localX - bgContainer._moveOx;
				bgContainer._moveOx = e.localX;
				if(bgContainer.x >0 ){
					bgContainer.x = 0;
				}else if(bgContainer.x < -boundWidth + p.width){
					bgContainer.x = -boundWidth + p.width;
				}
			}
		}

		function chooseLesson(e){
			sessionStorage.lesson = e.target._lesson;
			window.location.href = 'course.html';
		}

		function show(e){
			if(e.type=='mouseover'){
				bg.alpha = 0.5;
				tiper.visible = true;
				tiper.x = e.target.x;
				tiper.y = e.target.y;
			}else if(e.type=='mouseout'){
				bg.alpha = 1;
				tiper.visible = false;
			}else if(e.type=='click'){
				if(e.target.lesson){
					sessionStorage.lesson = e.target.lesson;
					window.location.href = 'course.html';
				}
			}
		}

		function resize(){
			var w = document.documentElement.clientWidth;
			var h = document.documentElement.clientHeight;
			canvas.width = w;
			canvas.height = h;

			var sca = h/w>0.56? w/p.width:h/p.height;
			if(h/w>0.56){
				container.x = 0;
				container.y = Math.abs(h - p.height*sca)/2;
			}else{
				container.x = Math.abs(w - p.width*sca)/2;
				container.y = 0;
			}

			container.scaleX = container.scaleY = sca;
		}

		menu = p;
	})();


function fortest(con){
	let main = new createjs.Container;
	let t = new createjs.Container, _t;
	let shape = new createjs.Shape(new createjs.Graphics().f('red')); 
	let txt = new createjs.Text('第25课','30px Arial','white');
	let bound = txt.getBounds();
	shape.graphics.r(0,0,bound.width,bound.height);

	t.addChild(shape,txt);
	con.addChild(main);
	main.cursor = 'pointer';
	main.on('click',function(e){goto(e.target.val)});

	t.y = 50

	for(let i=1;i<=25;i++){
		_t = t.clone(true);
		_t.set({mouseChildren:false,val:i});
		_t.getChildAt(1).text = '第' + i + '课';
		t.x += 100;
		if(i%5===0){
			t.x = 0;
			t.y += 50;
		}
		main.addChild(_t);
	}
	
	// 
	let xueqi = new createjs.Container;
	main.parent.addChild(xueqi);
	main.visible = false;

	t.y = 0;
	_t = t.clone(true);
	_t.set({mouseChildren:false,val:'shangxueqi'});
	_t.getChildAt(1).text = '上学期';
	xueqi.addChild(_t);

	_t = t.clone(true);
	_t.set({mouseChildren:false,val:'xiaxueqi'});
	_t.getChildAt(1).text = '下学期';
	_t.x = 100;
	xueqi.addChild(_t);

	xueqi.on('click',function(e){
		TweenLite.set(xueqi.children,{alpha:.5});
		e.target.alpha = 1;
		main.visible = true;
		sessionStorage.xueqi = e.target.val;
	})
}