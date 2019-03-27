(function() {
	let father = projectData.courseInterface;

	let p = new father.part(2);
	const timeline = new TimelineLite()
	const clickboard = father.getClickBoard(p);
	clickboard.on('click',onclick);

	let fish5;

	father.loader.addLoadElement(['fish.json','fish.png'],father.lessonPath);

	p.go = function() {
		let sprite = father.loader.getSprite('fish',true,{scaleX:0.4,scaleY:0.4});
		let x,y,sumX,attr,i,j;
		let fishgroup1 = new createjs.Container, fishgroup2 = new createjs.Container, fishgroup3 = new createjs.Container, fishgroup4 = new createjs.Container, fishgroup5 = new createjs.Container;
		let txt = new father.text('',30).set({textBaseline:'middle'});

		x = 121, y = 93, sumX = 108;
		for(i=1;i<=2;i++){
			for(j=1;j<=3;j++){
				fishgroup1.addChild(sprite['fish'+j].clone().set({x:x,y:y}));
				x += sumX;
			}
		}

		fishgroup1.addChild(txt.clone()).set({x:x,y:y,text:'你注意到有什么重复吗？'});

		x = 128, y = 247, sumX = 104;
		for(i=1;i<=2;i++){
			attr = 0.65;
			for(j=1;j<=3;j++){
				fishgroup2.addChild(sprite.fish4.clone().set({x:x,y:y,scaleY:attr}));
				x += sumX;
				attr -= 0.1;
			}
		}

		fishgroup2.addChild(txt.clone()).set({x:x,y:y,text:'这队小鱼有什么重复？'});

		x = 118, y = 391, sumX = 107;
		for(i=1;i<=2;i++){
			for(j=5;j<=7;j++){
				fishgroup3.addChild(sprite['fish'+j].clone().set({x:x,y:y}));
				x += sumX;
			}
		}

		fishgroup3.addChild(txt.clone()).set({x:x,y:y-10,text:'这队小鱼有什么重复？\n你能把后面的小鱼排出来吗？',lineHeight:35});

		x = 120, y = 518, sumX = 105, attr = [5,8,9];
		for(i=1;i<=2;i++){
			for(j=0;j<3;j++){
				fishgroup4.addChild(sprite['fish'+attr[j]].clone().set({x:x,y:y}));
				x += sumX;
			}
		}

		fishgroup4.addChild(txt.clone()).set({x:x,y:y,text:'这队小鱼是按什么规律排队的呢？'});

		fish5 = fishgroup5.addChild(sprite.fish5.clone().set({x:127,y:643,shadow:new createjs.Shadow('black',2,2,2)}));
		fish5.set({ox:fish5.x,oy:fish5.y});
		fishgroup5.addChild(txt.clone()).set({x:750,y:643,text:'这是哪队掉队的鱼呢？'});

		for(i=1;i<=5;i++){
			timeline.call(father.preferSound,['objIn']).from(eval('fishgroup'+i.toString()),0.7,{alpha:0,x:300}).addPause();
		}

		timeline.eventCallback('onComplete',animationOver);

		p.addChild(fishgroup1, fishgroup2, fishgroup3, fishgroup4, fishgroup5);

		fishgroup5.cursor = 'pointer';
		fishgroup5.on('pressmove',drag);

		delete p.go;
	}

	p.reset = function(){
		timeline.seek(0).play();
		clickboard.mouseEnabled = true;
		fish5.x = fish5.ox;
		fish5.y = fish5.oy;
	}

	function onclick(e){
		timeline.play();
	}

	function animationOver(){
		clickboard.mouseEnabled = false;
	}

	function drag(e){
		e.target.set({x:e.localX,y:e.localY});
	}

})();