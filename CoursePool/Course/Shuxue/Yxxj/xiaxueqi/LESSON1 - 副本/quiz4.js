
(function(){
	let father = projectData.courseInterface;
	let p = new father.part(4,3);
	p.regCount(4);

	father.loader.addLoadElement(father.courseLib + 'customShape.js');
	father.loader.addLoadElement(['bgrec.png'],father.lessonPath);

	let shapeArr = new Array;


	p.go = function(){
		p.addChild(father.loader.getImage('bgrec.png')).set({scaleX:0.9,scaleY:0.9,x:72,y:433});

		let shapeContainer = p.addChild(new createjs.Container).set({cursor:'pointer'});
		shapeContainer.on('click',clickshape);

		shapeContainer.addChild(new myObject.shape('triangle',{x:317,y:220,width:211,height:185,color:null}).lineColor('#11A4D5').noAlpha())
						.set({_targ:add(new myObject.shape('triangle',{x:192,y:518,width:99,height:98,color:null}).lineColor('#F36DBD'))});

		shapeContainer.addChild(new myObject.dashShape('square',{x:316,y:264,diameter:97}).noAlpha().setThick(2).lineColor('#11A4D5'))
						.set({_targ:add(new myObject.shape('square',{x:441,y:518,diameter:104}).lineColor('#F36DBD'))});

		shapeContainer.addChild(new myObject.shape('rectangle',{x:953,y:229,width:202,height:153}).lineColor('#87BE4D').noAlpha())
						.set({_targ:add(new myObject.shape('rectangle',{x:1081,y:517,width:104,height:104}).lineColor('#FF7E00'))});

		shapeContainer.addChild(new myObject.dashShape('rectangle',{x:876.5,y:229,width:49,height:153}).lineColor('#87BE4D').setThick(2).noAlpha())
						.set({_targ:add(new myObject.shape('rectangle',{x:835,y:517,width:42,height:105}).lineColor('#FF7E00'))});

		p.addChild(new father.tipOnce('这个三角形和长方形里面还藏着什么图形呢？')).showOut();

		p.reset();
		delete p.go;

		function add(con){
			p.addChild(con);
			shapeArr.push(con);
			return con;
		}
	}

	p.reset = function(){
		TweenLite.killTweensOf(shapeArr);
		for(let i in shapeArr){
			shapeArr[i].alpha = 0;
		}
	}

	function clickshape(e){
		if(e.target._targ.alpha===0){
			TweenLite.to(e.target._targ,0.75,{alpha:1});
			father.preferSound('right');
			p.count();
		}
	}

})();