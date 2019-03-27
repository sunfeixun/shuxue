(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson10.png','lesson10.json'],father.lessonPath);
	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('小朋友，原来花园有3只蝴蝶，又飞来了1只。',p);
			let scale = 0.8;
			father.createElement([
					{type:getImage('flybg1'),attr:{x:'center-=300',y:400,scaleX:scale,scaleY:scale}},
					{type:getImage('flybg2'),attr:{x:'center+=300',y:400,scaleX:scale,scaleY:scale}},
					{type:getImage('arrow'),attr:{x:'center',y:400,scaleX:scale,scaleY:scale}}
				],father.loader,p);

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('一共有多少只，表示什么意思？',p);
			let up = 256, down = 525, txtX = 756;

			let instance = father.createElement([
					{type:getImage('butterfly'),attr:{x:400,y:up}},
					{type:getImage('butterfly'),attr:{x:513,y:up}},
					{type:getImage('butterfly'),attr:{x:621,y:up}},
					{type:getImage('butterfly'),attr:{x:880,y:up}},
					{type:'container',instance:'con'},
					{type:'text',center:true,attr:{text:'+',size:90,x:txtX,y:up},addTo:'con'},
					{type:new createjs.Shape,addTo:'con',instance:'line'},
					{type:'text',center:true,attr:{text:'加号',size:70,x:txtX,y:down,color:'#ED8E31'},addTo:'con'},
					{type:'text',center:true,attr:{text:'3只蝴蝶又飞来一只就是合起来的意思',x:'center',y:650,size:40},addTo:'con'}
				],father.loader,p);

			instance.line.graphics.s('#33CCFF').ss(2).sd([4,4]).mt(txtX,up+40).lt(txtX,down-40);
			instance.con.alpha = 0;

			father.getClickBoard(p).on('click',function(e){
				father.preferSound('click');
				e.target.parent.removeChild(e.target);
				TweenLite.to(instance.con,0.75,{alpha:1});
			},null,true);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			new father.title('把1和3和起来，在数学上我们用符号“+”来表示',p);
			let instance = father.createElement([
					{type:'text',center:true,attr:{text:'写作： 3  +  1  ＝  4',size:70,x:'center',y:250}},
					{type:new createjs.Shape,instance:'line',attr:{x:639,y:290}},
					{type:'text',attr:{text:'加号',color:'#ED8E31',size:70,x:573,y:457}},
					{type:'text',attr:{text:'读作：3加1等于4',x:'center',y:640,size:40,alpha:0},center:true,instance:'bottomtext'}
				],father.loader,p);

			instance.line.graphics.s('#33CCFF').ss(2).sd([4,4]).mt(0,0).lt(0,150);
			father.getClickBoard(p).on('click',function(e){
				e.target.parent.removeChild(e.target);
				father.preferSound('click');
				TweenLite.to(instance.bottomtext,0.75,{alpha:1});
			},null,true);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.go = function() {
			new father.title('小朋友，你知道吗？把一部分和另一部分合起来，\n问一共是多少用加法算。',p);
			let instance = father.createElement([
					{type:'text',center:true,attr:{text:'+',size:90,x:'center',y:250},center:true},
					{type:new createjs.Shape,attr:{x:'center',y:300},instance:'line'},
					{type:'text',attr:{text:'加号',color:'#ED8E31',size:70,x:'center',y:500},center:true}
				],father.loader,p);
			instance.line.graphics.s('#33CCFF').ss(2).sd([4,4]).mt(0,0).lt(0,160);

		delete p.go;
		}
	})();

	function getImage(str,_parent){
		sprite = sprite || father.loader.getSprite('lesson10',true);
		let s = sprite[str].clone();
		_parent && _parent.addChild(s);
		return s;
	}
})();
