(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson11.png','lesson11.json'],father.lessonPath);
	let sprite;
	let dashcolor = '#33CCFF';
	let jianhao = new father.text('减号',50,'#ED8E31').alignCenter().set({x:640,y:500});

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('小朋友，在花丛中的4只蝴蝶飞走2只',p);
			let scale = 0.8;
			father.createElement([
					{type:getImage('fly1'),attr:{x:'center-=300',y:'center',scaleX:scale,scaleY:scale}},
					{type:getImage('fly2'),attr:{x:'center+=300',y:'center',scaleX:scale,scaleY:scale}},
					{type:getImage('arrow'),attr:{x:'center',y:'center',scaleX:scale,scaleY:scale}}
				],father.loader,p);

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('4只蝴蝶飞走2只，表示什么意思？',p);
			let up = 300;
			let instance = father.createElement([
					{type:getImage('butterfly'),attr:{x:'center-=300',y:up}},
					{type:getImage('butterfly'),attr:{x:'center-=150',y:up}},
					{type:getImage('butterfly'),attr:{x:'center+=150',y:up},instance:'f1'},
					{type:getImage('butterfly'),attr:{x:'center+=300',y:up},instance:'f2'},
					{type:'container',instance:'con',attr:{alpha:0}},
					{type:'text',attr:{x:'center',y:up,text:'-',size:70},center:true,addTo:'con'},
					{type:new createjs.Shape,instance:'dashline',addTo:'con'},
					{type:new createjs.Shape,addTo:'con',instance:'l1'},
					{type:new createjs.Shape,addTo:'con',instance:'l2'},
					{type:'text',attr:{x:'center',y:650,text:'4只蝴蝶飞走2只就是从4里面去掉2的意思。',size:40},center:true,addTo:'con'}
				],father.loader,p);

			let bound1 = instance.f1.getTransformedBounds();
			let bound2 = instance.f2.getTransformedBounds();
			instance.l1.graphics.s('black').ss(2).mt(bound1.x,bound1.y).lt(bound1.x+bound1.width,bound1.y+bound1.height);
			instance.l2.graphics.s('black').ss(2).mt(bound2.x,bound2.y).lt(bound2.x+bound2.width,bound2.y+bound2.height);
			instance.dashline.graphics.s(dashcolor).ss(2).sd([4,4]).mt(640,up+50).lt(640,600);

			father.getClickBoard(p).on('click',show,null,true,instance.con);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('4去掉2，在数学上我们用符号“-”来表示',p);
			let instance = father.createElement([
					{type:'text',center:true,attr:{x:'center',y:250,text:'写作： 4  －  2  ＝  2',size:50}},
					{type:'container',instance:'con',attr:{alpha:0}},
					{type:new createjs.Shape,instance:'dashline',addTo:'con'},
					{type:jianhao.clone(),addTo:'con'},
					{type:'text',center:true,attr:{x:'center',y:600,size:40,text:' 读作：4减2等于2'},addTo:'con'}
				],father.loader,p);

			instance.dashline.graphics.s(dashcolor).ss(2).sd([4,4]).mt(640,300).lt(640,450);
			father.getClickBoard(p).on('click',show,null,true,instance.con);
			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.go = function() {
			new father.title('小朋友，你知道吗？\n整体中减去部分，问还剩多少用减法算。',p);
			let instance = father.createElement([
					{type:'text',center:true,attr:{x:'center',y:300,size:70,text:'-'}},
					{type:new createjs.Shape,instance:'dashline'},
					{type:jianhao.clone(),attr:{x:'center',y:550}}
				],father.loader,p);

		instance.dashline.graphics.s(dashcolor).ss(2).sd([4,4]).mt(640,350).lt(640,500);

		delete p.go;
		}
	})();

	function getImage(str,_parent){
		sprite = sprite || father.loader.getSprite('lesson11',true);
		let s = sprite[str].clone();
		_parent && _parent.addChild(s);
		return s;
	}

	function show(e,s){
		e.target.parent.removeChild(e.target);
		father.preferSound('click');
		TweenLite.to(s,0.75,{alpha:1});
	}

})();
