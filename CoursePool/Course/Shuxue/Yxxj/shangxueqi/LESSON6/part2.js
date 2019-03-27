(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson6.png','lesson6.json'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			let title = new father.title('这是几只   ？这是几条   ？',p);
			initSprite();

			let elements = [
				{name:'bg',x:640,y:380},
				{name:'duck',x:570,y:title.y},
				{name:'fish1',x:830,y:title.y}
			];

			createElement(elements,p);

			let show = p.addChild(new createjs.Container);
			let txt = new father.text('   有3条，  有3条，   和    同样多。').alignCenter();

			show.addChild(txt);
			txt.x = 640;
			txt.y = 640;

			elements = [
				{name:'duck',x:385,y:txt.y,parent:show},
				{name:'fish1',x:530,y:txt.y,parent:show},
				{name:'duck',x:669,y:txt.y,parent:show},
				{name:'fish1',x:761,y:txt.y,parent:show}
			];

			createElement(elements);

			show.alpha = 0;

			father.getClickBoard(p).on('click',onclick,null,true,show);

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			initSprite();
			let title = new father.title('  有3条，  有3条，  和   同样多。',p);
			let show = p.addChild(new createjs.Container);
			let elements = [
				{name:'duck',x:323,y:title.y},
				{name:'fish1',x:505,y:title.y},
				{name:'duck',x:684,y:title.y},
				{name:'fish1',x:780,y:title.y}
			];

			createElement(elements,p);

			show.addChild(new father.text('3 = 3',100)).alignCenter().set({x:640,y:360});

			let txt = new father.text('3等于3',90).alignCenter().set({x:640,y:600});
			let line = new createjs.Shape(new createjs.Graphics().s('blue').ss(2).sd([6,6]).mt(640,400).lt(640,550));

			show.alpha = 0;
			show.addChild(txt,line);

			father.getClickBoard(p).on('click',onclick,null,true,show);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,2);

		p.go = function() {
			initSprite();
			let title = new father.title('这是几只  ？这是几条  ？',p);
			let bottomElements = p.addChild(new createjs.Container);
			let txt = new father.text('  有3条，  有2条，  比  多。',40).alignCenter().set({x:640,y:640});

			let elements = [
				{name:'duck',x:582,y:title.y},
				{name:'fish3',x:820,y:title.y},
				{name:'bg',x:640,y:380},
				{name:'duck',x:371,y:txt.y,parent:bottomElements},
				{name:'fish3',x:559,y:txt.y,parent:bottomElements},
				{name:'duck',x:732,y:txt.y,parent:bottomElements},
				{name:'fish3',x:822,y:txt.y,parent:bottomElements}
			];

			bottomElements.alpha = 0;
			bottomElements.addChild(txt);

			createElement(elements,p);

			father.getClickBoard(p).on('click',onclick,null,true,bottomElements);

			delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,3);

		p.go = function() {
			initSprite();
			let title = new father.title('  有3条，  有2条，  比  多。',p);
			let show = p.addChild(new createjs.Container);
			let line = new createjs.Shape(new createjs.Graphics().s('blue').ss(2).sd([6,6]).mt(640,400).lt(640,550));

			let elements = [
				{name:'duck',x:372,y:title.y},
				{name:'fish3',x:554,y:title.y},
				{name:'duck',x:731,y:title.y},
				{name:'fish3',x:821,y:title.y},
				{name:new father.text('3 > 2',100).alignCenter(),x:640,y:360,parent:show},
				{name:new father.text('3大于2',90).alignCenter(),x:640,y:600,parent:show}
			];

			show.addChild(line);
			show.alpha = 0;
			createElement(elements,p);
			father.getClickBoard(p).on('click',onclick,null,true,show);

		delete p.go;
		}
	})();

	(function() {
		let p = new father.part(2,4);

		p.go = function() {
			let title = new father.title('这是几只  ？这是几条  ？',p);
			let bottomElements = p.addChild(new createjs.Container);
			let txt = new father.text('  有3条，  有4条 ，  比  少。',40).alignCenter().set({x:640,y:640});
			let elements = [
				{name:'duck',x:579,y:title.y},
				{name:'fish2',x:821,y:title.y},
				{name:'bg',x:640,y:400},
				{name:'duck',x:363,y:txt.y,parent:bottomElements},
				{name:'fish2',x:542,y:txt.y,parent:bottomElements},
				{name:'duck',x:744,y:txt.y,parent:bottomElements},
				{name:'fish2',x:831,y:txt.y,parent:bottomElements}
			];

			bottomElements.addChild(txt);
			bottomElements.alpha = 0;
			createElement(elements,p);
			father.getClickBoard(p).on('click',onclick,null,true,bottomElements);

			delete p.go;
		}
	})();

	(function(){
		let p = new father.part(2,5);

		p.go = function(){
			let title = new father.title('  有3条，  有4条，  比  少。',p);
			let show = p.addChild(new createjs.Container);
			let line = new createjs.Shape(new createjs.Graphics().s('blue').ss(2).sd([6,6]).mt(640,400).lt(640,550));

			let elements = [
				{name:'duck',x:374,y:title.y},
				{name:'fish2',x:554,y:title.y},
				{name:'duck',x:730,y:title.y},
				{name:'fish2',x:820,y:title.y},
				{name:new father.text('3 > 2',100).alignCenter(),x:640,y:360,parent:show},
				{name:new father.text('3大于2',90).alignCenter(),x:640,y:600,parent:show}
			];

			show.addChild(line);
			show.alpha = 0;
			createElement(elements,p);

			father.getClickBoard(p).on('click',onclick,null,true,show);

			delete p.go;
		}
	})();

	function onclick(e,content){
		father.preferSound('click');
		e.target.visible = false;
		TweenLite.to(content,0.75,{alpha:1});
	}

	function createElement(data,_parent){
			let ele;

			for(let i=0;i<data.length;i++){
				ele = typeof(data[i].name)==='string'? sprite[data[i].name].clone():data[i].name;
				delete data[i].name;

				data[i].parent? data[i].parent.addChild(ele):_parent.addChild(ele);
				delete data[i].parent;

				ele.set(data[i]);
			}
	}

	function initSprite(){
		if(sprite) return;
		sprite = father.loader.getSprite('lesson6',true);
		let scale = {scaleX:0.5,scaleY:0.5};
		sprite.duck.set(scale);
		sprite.fish1.set({scaleX:0.8,scaleY:0.8});
		sprite.fish2.set(scale);
		sprite.fish3.set({scaleX:0.6,scaleY:0.6});
	}

})();
