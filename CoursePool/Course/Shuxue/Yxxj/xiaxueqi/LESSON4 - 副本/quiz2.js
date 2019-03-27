
(function(){
	let father = projectData.courseInterface;

	let p = new father.part(4,1);
	let chooser, targ, targs = new Array;


	father.loader.addLoadElement(['quiz2.png','tf.json','tf.png'],father.lessonPath);

	p.go = function(){
		p.addChild(father.loader.getImage('quiz2.png')).set({x:103,y:166,scaleX:0.95,scaleY:0.95});

		let tf = father.loader.getSprite('tf');
		let tfCon = p.addChild(new createjs.Container);
		let ansArr = ['incorrect','correct','correct','correct'];

		tf.a1.set({x:1110,y:176});

		for(let i=1;i<=4;i++){
			targs.push(tfCon.addChild(tf.a1.clone().set({ans:ansArr[i-1]})));
			tf.a1.y += 129;
		}

		tfCon.on('click',clicktf);
		tfCon.cursor = 'pointer';
		chooser = tfCon.addChild(new createjs.Container).set({x:1150,visible:false});
		chooser.addChild(tf.a4.clone()).set({x:-79,y:-26,val:'correct'});
		chooser.addChild(tf.a5.clone()).set({x:-3,y:-26,val:'incorrect'});

		p.addChild(new father.tipOnce('请你仔细看一看，找出与其它3组规律不同的一组，\n并在“(   )”里画“×”')).showOut();

		delete p.go;
	}

	p.reset = function(){
		for(let i in targs){
			targs[i].currentFrame && targs[i].gotoAndStop(0);
			targs[i].mouseEnabled = true;
		}
	}

	function clicktf(e){
		if(e.target.val===undefined){
			chooser.y = e.target.y - 15;
			chooser.visible = true;
			targ = e.target;
		}else{
			if(targ.ans===e.target.val){
				targ.mouseEnabled = false;
				father.preferSound('click');
			}else{
				father.loader.playSound('aao.mp3');
				return;
			}
			chooser.visible = false;
			targ.gotoAndStop(e.target.val=='correct'? 'a3':'a2');

		}
	}

})();