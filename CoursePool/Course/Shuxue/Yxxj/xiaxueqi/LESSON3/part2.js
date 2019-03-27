(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	let elements = {};
	let order = 1;

	const big = {scaleX:1,scaleY:1}, small = {scaleX:0.75,scaleY:0.75};

	father.loader.addLoadElement('part2.jpg',father.lessonPath);

	p.go = function() {
		
		let bound;
		elements.img1 = father.loader.getImage('part2.jpg','center').set({alpha:0,y:300});
		elements.img2 = elements.img1.clone();
		elements.img3 = elements.img1.clone();
		elements.img4 = elements.img1.clone();
		elements.img5 = elements.img1.clone();
		elements.txt = new father.text('',40).set({x:640,y:600,textAlign:'center',textBaseline:'middle'});

		bound = elements.img5.getBounds();
		elements.img5.sourceRect = new createjs.Rectangle(bound.width*0.25,bound.height*0.25,bound.width*0.75,bound.height*0.75);
		elements.img5.scaleX = elements.img5.scaleY = elements.img1.getBounds().width*0.75/elements.img5.getBounds().width;

		for(let i in elements){
			p.addChild(elements[i]);
		}

		p.setChildIndex(elements.img1,p.numChildren-1);

		father.getClickBoard(p).on('click',onclick);

		onclick();

		delete p.go;
	}

	p.reset = function() {
		order  = 1;
		onclick();
		p.mouseEnabled = true;
	}

	function onclick(e) {
		if(TweenMax.isTweening(elements.txt)) return;

		if(order===4){
			TweenLite.to(elements.img1,2,{x:677});
			TweenLite.to(elements.img2,2,{x:640});
			order ++;
			return;
		}

		for(let i in elements){
			elements[i].alpha = 0;
			if(elements[i].constructor===createjs.Bitmap){
				elements[i].y = 300;
			}
		}

		TweenLite.killTweensOf([elements.img1,elements.img2]);

		let arr = [];

		if(order===1){
			elements.img1.set(big).x = 427;
			elements.img2.set(small).x = 859;
			elements.txt.text = '什么是差不多大小？';
			arr = [elements.img1,elements.img2];
		}else if(order===2){
			elements.img1.set(big).x = 427;
			elements.img2.set(big).x = 859;
			elements.txt.text = '什么是同等大小？';
			arr = [elements.img1,elements.img2];
		}else if(order===3){
			elements.img1.set(small).set({x:427,y:337});
			elements.img2.set(big).set({x:859});
			elements.txt.text = '怎么才能让它同等大小？';
			arr = [elements.img1,elements.img2];
		}else if(order===5){
			elements.img1.set(small).x = 427;
			elements.img5.set({x:886,y:339});
			elements.txt.text = '原来这就是一样大小啊！';
			arr = [elements.img1,elements.img5];
			p.mouseEnabled = false;
		}

		arr.push(elements.txt);

		TweenLite.to(arr,0.7,{alpha:1});
		father.preferSound('click');

		order ++;
	}

})();