(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson3.json','lesson3.png'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('请你说出它们的位置？',p).set({color:'white'});

			let txt = bottomText('松鼠在熊的上面，熊在松鼠下面。');

			father.getClickBoard(p).on('click',onclick,null,true,txt);
			let animals = p.addChildAt(getAnimalImage(),0);
			animals.regX = animals.regY = animals.x = animals.y = 0;
			animals.scaleX = 1280/animals.getBounds().width;
			animals.scaleY = 720/animals.getBounds().height;
			animals.y = 15;
			p.addChild(txt);
			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('请你说出谁在河边？谁在前面谁在后面呢？',p).set({color:'white'});

			let txt = bottomText('狼在鹿的前面，鹿在狼的后面。');

			father.getClickBoard(p).on('click',onclick,null,true,txt);
			let animals = p.addChildAt(getAnimalImage(),0);
			animals.regX = animals.regY = animals.x = animals.y = 0;
			animals.scaleX = 1280/animals.getBounds().width;
			animals.scaleY = 720/animals.getBounds().height;
			animals.y = 15;
			p.addChild(txt);

			delete p.go;
		}
	})();

	function getAnimalImage(){
		sprite = sprite || father.loader.getSprite('lesson3',true);
		return sprite.animals.clone().set({x:640,y:400});
	}

	function bottomText(txt){
		let text = new father.text(txt,35).alignCenter().set({x:640,y:630,visible:false});
		return text;
	}

	function onclick(e,txt){
		e.target.visible = false;
		txt.visible = true;
		TweenLite.fromTo(txt,0.75,{alpha:0},{alpha:1});
		father.preferSound('click');
	}

})();
