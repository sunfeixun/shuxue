

(function(){
	let father = projectData.courseInterface;

	let p = new father.part(4,0);

	father.loader.addLoadElement(['quiz1.json','quiz1.png'],father.lessonPath);

	p.go = function(){

		let sprite = father.loader.getSprite('quiz1');
		let engageContainer = new createjs.Container;


		p.addChild(sprite.bg.set({x:90,y:116}),engageContainer);

		engageContainer.addChild(sprite.tree.set({x:727,y:119}));
		engageContainer.addChild(sprite.hand.set({x:778,y:270}));
		engageContainer.addChild(sprite.circle.set({x:847,y:474}));

		addDrawBg(sprite.tree,sprite.hand,sprite.circle);
		addDrawBg = null;

		engageContainer.cursor = 'pointer';
		engageContainer.on('pressmove',draw);

		p.addChild(new father.tipOnce('请你按规律涂一涂')).showOut();

		delete p.go;
	}

	function draw(e) {
		let msk = e.target.targ.mask;
		msk.graphics.dc(e.localX,e.localY,10).cp();
	}

	function addDrawBg() {
		let parent = arguments[0].parent;
		let image;

		for(let i=0;i<arguments.length;i++){
			image = arguments[i];
			_bg = father.getClickBoard(parent,{width:image.getBounds().width,height:image.getBounds().height}).set({cursor:'',x:image.x,y:image.y,targ:image});
			image.mask = new createjs.Shape(new createjs.Graphics().dc(0,0,0));
		}
	}


})();