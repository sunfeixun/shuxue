(function() {
	let father = projectData.courseInterface;
	let p = new father.part(2);

	let timeline = new TimelineLite;

	p.go = function() {
		let shapecontainer = p.addChild(new createjs.Container).set({x:308,y:35});

		let paraStage = shapecontainer.addChild(new createjs.Container);
		let trapStage = shapecontainer.addChild(new createjs.Container);
		let semiStage = shapecontainer.addChild(new createjs.Container);
		let triaStage = shapecontainer.addChild(new createjs.Container);
		let squaStage = shapecontainer.addChild(new createjs.Container);
		let answStage = p.addChild(new createjs.Container);
		answStage.mouseEnabled = false;

		let datas = [
			['parallelogram',{x:211,y:461,width:422,height:103,skew:133,color:'#B8DFCC'}],
			['parallelogram',{x:543,y:461,width:230,height:103,skew:-66.9,color:'#BBE3F3'}],
			['trapezium',{x:397,y:321,width:520,height:168,skew:203,color:'#E3AECE'}],
			['semiCircle',{x:615,y:362,diameter:70,color:'#F6E49A'},{rotation:41}],
			['triangle',{x:230,y:234,width:337,height:203,color:'#F6E49A'},{rotation:90}],
			['triangle',{x:77,y:156,width:182,height:89,color:'#BBE3F3'},{rotation:-90}],
			['square',{x:72,y:62,diameter:64,color:'#F2B6CF'},{rotation:45}],
			['semiCircle',{x:54,y:28,diameter:40,color:'#E3AECE'},{rotation:-45}],
			['semiCircle',{x:91,y:28,diameter:40,color:'#E3AECE'},{rotation:45}]	
		];

		let parent,str;

		for(let i=0;i<datas.length;i++)
		{
			str = datas[i][0];

			datas[i] = new myObject.shape(str,datas[i][1],datas[i][2]);

			switch(str)
			{
				case 'parallelogram':
					parent = paraStage;break;
				case 'trapezium':
					parent = trapStage;break;
				case 'semiCircle':
					parent = semiStage;break;
				case 'square':
					parent = squaStage;break;
				case 'triangle':
					parent = triaStage;break;
			}
			parent.addChild(datas[i]);
		}
		parent = null;

		let _txt = new createjs.Text('有1块','30px Kaiti').set({textAlign:'center',y:660});

		datas = [
			['square',{x:185,y:614,diameter:64,color:'#595757'}],
			['trapezium',{x:383,y:614,width:134,height:64,skew:40,color:'#E3AECE'}],
			['parallelogram',{x:624,y:614,width:158,height:64,skew:21,color:'#B8DFCC'}],
			['triangle',{x:833,y:616,width:138,height:64,color:'#BBE3F3'}],
			['semiCircle',{x:1051,y:651,diameter:128,color:'#F6E49A'}]
		];

		let arr = [squaStage,trapStage,paraStage,triaStage,semiStage];
		//let pre = ['正方形','梯形','平行四边形','三角形','扇形'];
		let txt;

		for(i=0;i<datas.length;i++)
		{
			datas[i] = p.addChild(new myObject.shape(datas[i][0],datas[i][1])).lineColor('black').fill(null);
			//datas[i].visible = false;
			txt = _txt.clone();
			txt.text = '有' + arr[i].numChildren  + '块';
			txt.x = datas[i].x;
			p.addChild(txt);
			//arr[i].solution = [datas[i],txt];
			timeline.call(father.preferSound,['right']).from([datas[i],arr[i]],0.5,{alpha:0}).addPause().call(father.preferSound,['right']).from(txt,0.5,{alpha:0}).addPause();
		}

		p.on('click',onclick);
		father.getClickBoard(p);

		datas = null;

		delete p.go;
	}

	function onclick() {
		timeline.play();
	}
})();