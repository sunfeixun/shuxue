
(function(){
	let father = projectData.courseInterface;
	let p = new father.part(4,2);
	let tf;
	let selectedTarg;
	let choosers;

	p.regCount(5);

	father.loader.addLoadElement(['quiz3','tf'],father.lessonPath,'.png');

	p.go = function(){
		let img = father.loader.getImage('quiz3.png').set({x:240,y:73,scaleX:0.7,scaleY:0.7});
		let dashline = new createjs.Shape().set({y:500});
		dashline.graphics.s('#AC712C').ss(5).sd([20,15]).mt(0,0).lt(1280,0);
		p.addChild(img,dashline);

		let squa = new myObject.shape('square',{x:145,y:565,diameter:83,color:'#FFE792'});
		let semi = new myObject.shape('semiCircle',{x:370,y:592,diameter:104,color:'#CAE5CD'});
		let rect = new myObject.shape('rectangle',{x:649,y:563,width:190,height:70,color:'#BBB3D8'});
		let circle = new myObject.shape('circle',{x:926,y:567,diameter:94,color:'#BAE3F9'});
		let tria = new myObject.shape('triangle',{x:1144,y:564,width:83,height:72,color:'#F4B4D0'});
		p.addChild(squa,semi,rect,circle,tria);

		let sps = [squa,semi,rect,circle,tria];
		let spCon = new createjs.Container;
		let _sheet = new createjs.SpriteSheet({
			images:[father.loader.getImage('tf.png',1)],
			frames:{width:84,height:52,count:5,regX:42.5}
		});

		let _sprite = new createjs.Sprite(_sheet).set({y:620});
		choosers = new Array;
		for(let i = 0;i<sps.length;i++){
			choosers.push(spCon.addChild(_sprite.clone()).set({x:sps[i].x,_v:i===0? 'incorrect':'correct'}));
		}

		let c1 = _sprite.clone(), c2 = _sprite.clone();
		c1.set({_val:'correct',x:41,y:0}).gotoAndStop(3);
		c2.set({_val:'incorrect',x:-41,y:0}).gotoAndStop(4);

		tf = spCon.addChild(new createjs.Container).set({y:580,visible:false});
		tf.addChild(c1,c2);

		p.addChild(spCon).set({cursor:'pointer'}).on('click',choosetf);
		p.on('added',hideTF);

		p.addChild(new father.tipOnce('请你仔细观察，看看哪个图形没有出现，并在对应的(  )里画“×”')).showOut();
		delete p.go;
	}

	p.reset = function(){
		tf.visible = false;
		for(let i in choosers){
			choosers[i].currentFrame && choosers[i].gotoAndStop(0);
		}
	}

	function hideTF(){
		tf.visible = false;
	}

	function choosetf(e){
		if(!e.target._val){
			selectedTarg = e.target;
			tf.visible = true;
			tf.x = e.target.x;
		}else{
			if(selectedTarg._v === e.target._val){
				selectedTarg.mouseEnabled = false;
				selectedTarg.gotoAndStop(e.target._val==='incorrect'? 1:2);
				father.preferSound('right');
				tf.visible = false;
				p.count();
			}else{
				father.preferSound('wrong');
			}
		}
	}

})();