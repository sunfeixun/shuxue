(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,1);

	let flags = new Array;
	p.regCount(4);
	father.loader.addLoadElement('quiz2.png',father.lessonPath);

	p.go = function() {
		let flagCon = new createjs.Container, _flaghcon;
		let txt = new father.text('5',35).set({textAlign:'center',textBaseline:'middle',y:-28});
		let pos = [[410,239],[865,207],[453,527],[920,497]];
		let texts = ['15 - 9','14 - 9','13 - 9','12 - 9'];

		flagCon.addChild(
			father.loader.getImage('quiz2.png','center').set({scaleX:0.63,scaleY:0.63}),
			txt.clone().set({x:-58}),
			txt.clone().set({x:76})
		);	

		for(let i=0;i<pos.length;i++){
			_flaghcon = flagCon.clone(true).set({x:pos[i][0],y:pos[i][1],mouseChildren:false});
			_flaghcon.zhi = _flaghcon.getChildAt(2);
			_flaghcon.zhi.alpha = 0;
			_flaghcon.getChildAt(2).text = eval(texts[i]);
			_flaghcon.getChildAt(1).text = texts[i];

			flags.push(p.addChild(_flaghcon));
		}

		p.cursor = 'pointer';
		p.on('click',onclick);


		delete p.go;
	}

	p.reset = function(){
		for(let i=0;i<flags.length;i++){
			flags[i].mouseEnabled = true;
			flags[i].zhi.alpha = 0;
		}
	}

	function onclick(e){
		TweenLite.to(e.target.zhi,0.5,{alpha:1});
		p.count();
		e.target.mouseEnabled = false;
	}	
})();