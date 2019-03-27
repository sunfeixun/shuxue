(function(){
	let father = projectData.courseInterface;

	father.loader.add(['lesson3.json','lesson3.png'],father.lessonPath);

	let sprite;

	(function() {
		let p = new father.part(2,0);

		p.go = function() {
			new father.title('树上面是什么动物？树下面是什么动物？\n还可以怎么说的它们的位置？',p);

			let txt = bottomText('松鼠在熊的上面，熊在松鼠下面。');

			father.getClickBoard(p).on('click',onclick,null,true,txt);
			p.addChild(txt,getAnimalImage());

			delete p.go;
		}
	})();

	(function() {

		let p = new father.part(2,1);

		p.go = function() {
			new father.title('河边上有什么？',p);

			let txt = bottomText('狼在鹿的前面，鹿在狼的后面。');

			father.getClickBoard(p).on('click',onclick,null,true,txt);
			p.addChild(txt,getAnimalImage());

			delete p.go;
		}
	})();

	function getAnimalImage(){
		sprite = sprite || father.loader.getSprite('lesson3',true);
		return sprite.animals.clone().set({x:640,y:400});
	}

	function bottomText(txt){
		let text = new father.text(txt,35).alignCenter().set({x:640,y:660,visible:false});
		return text;
	}

	function onclick(e,txt){
		e.target.visible = false;
		txt.visible = true;
		TweenLite.fromTo(txt,0.75,{alpha:0},{alpha:1});
		father.preferSound('click');
	}

})();
