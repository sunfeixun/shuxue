(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	let timeline = new TimelineLite, duration = 0.5;

	p.custom.noFade = true;

	p.go = function() {
		let sjxStage = new createjs.Container;
		let rectangleStage = new createjs.Container;
		let circleStage = new createjs.Container;
		let squareStage = new createjs.Container;

		let ans =[
				new myObject.shape('square',{x:265,y:600,diameter:50,color:'#F6E49A'}).lineColor('black').fill(null),
				new myObject.shape('rectangle',{x:520,y:600,width:120,height:50,color:'#C4A8D0'}).lineColor('black').fill(null),
				new myObject.shape('circle',{x:775,y:600,diameter:50,color:'#BBE3F3'}).lineColor('black').fill(null),
				new myObject.shape('triangle',{x:1029,y:600,width:61,height:50,color:'#E3AECE'}).lineColor('black').fill(null)
			];

		squareStage.addChild(ans[0]);
		rectangleStage.addChild(ans[1]);
		circleStage.addChild(ans[2]);
		sjxStage.addChild(ans[3]);

		let shapeDatas = [
			['square',{x:434,y:493,diameter:72,color:'#B7E0CB'}],
			['rectangle',{x:640,y:493,width:336,height:72,color:'#F2B8CE'}],
			['square',{x:846,y:493,diameter:72,color:'#B7E0CB'}],
			['rectangle',{x:434,y:381,width:34,height:140,color:'#F6E59A'}],
			['rectangle',{x:535,y:381,width:60,height:140,color:'#C4A9CF'}],
			['square',{x:640,y:381,diameter:140,color:'#ED91B6'}],
			['rectangle',{x:743,y:381,width:61,height:140,color:'#C4A9CF'}],
			['rectangle',{x:845,y:381,width:34,height:140,color:'#F6E59A'}],
			['circle',{x:434,y:272,diameter:60,color:'#DDF2F6'}],
			['rectangle',{x:640,y:272,width:269,height:64,color:'#B7E0CB'}],
			['circle',{x:846,y:272,diameter:60,color:'#DDF2F6'}],
			['triangle',{x:434,y:209,width:84,height:54,color:'#ED92B6'}],
			['square',{x:548,y:190,diameter:85,color:'#F6E59A'}],
			['square',{x:640,y:190,diameter:85,color:'#F6E59A'}],
			['square',{x:731,y:190,diameter:85,color:'#F6E59A'}],
			['triangle',{x:846,y:209,width:84,height:54,color:'#ED92B6'}],
			['triangle',{x:640,y:97,width:336,height:89,color:'#ED92B6'}]
		];

		let _sp;

		for(let i=0;i<shapeDatas.length;i++)
		{
			_sp = new myObject.shape(shapeDatas[i][0],shapeDatas[i][1]);
			switch(shapeDatas[i][0]){
				case 'square':
					squareStage.addChild(_sp);
					break;
				case 'rectangle':
					rectangleStage.addChild(_sp);
					break;
				case 'triangle':
					sjxStage.addChild(_sp);
					break;
				case 'circle':
					circleStage.addChild(_sp);
					break;
			}
		}

		let txt1 = new createjs.Text('有1块','30px Kaiti').set({textAlign:'center',y:640});
		let txt2 = txt1.clone(), txt3 = txt1.clone(), txt4 = txt1.clone();


		let tts = [txt1,txt2,txt3,txt4];
		//let shapetext = ['正方形','长方形','圆形','三角形'];
		let stages = [squareStage,rectangleStage,circleStage,sjxStage];

		for(let i=0;i<4;i++)
		{
			tts[i].x = ans[i].x;
			tts[i].text = '有' + (stages[i].numChildren-1) + '块';
			p.addChild(stages[i]);
			p.addChild(tts[i]);

			timeline.call(father.preferSound,['click']).from(stages[i],duration,{alpha:0}).addPause().call(father.preferSound,['click']).from(tts[i],duration,{alpha:0}).addPause();
		}

		father.getClickBoard(p).on('click',onclick);

		delete p.custom.noFade;
		delete p.go;
	}

	p.reset = function() {
		timeline.seek(0).resume();
	}

	function onclick() {
		timeline.play();
	}

})();