(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,0);
	let point, pointContainer = new createjs.Container;
	let linePool = new Array, pointPool = new Array;
	let currentLine, targPoint;
	let range = 15;

	p.regCount(7);
	father.loader.addLoadElement(father.courseLib + 'customShape.js');

	p.go = function() {
		pointContainer.addChild(new createjs.Shape(new createjs.Graphics().f('rgba(255,255,255,0.01)').r(0,0,1280,720)));

		point = new createjs.Shape;
		point.graphics.f('black').dc(0,0,4,4);

		p.addChild(new myObject.shape('parallelogram',{x:410,y:210,width:304,height:96,skew:87,color:'#BAE3F9'}));
		p.addChild(new myObject.shape('square',{x:900,y:210,diameter:96,color:'#A5D4AD'},{rotation:45}));
		p.addChild(new myObject.shape('square',{x:242,y:486,diameter:128,color:'#FFE792'}));
		p.addChild(new myObject.shape('triangle',{x:602,y:484,width:173,height:134,color:'#F4B4D0'}));
		p.addChild(new myObject.shape('rectangle',{x:977,y:493,width:313,height:115,color:'#BBB3D8'}));

		addPoint([315,139],[501,282]);
		addPoint([794,212],[1004,212]);
		addPoint([899,107],[899,317]);
		addPoint([132,484],[352,484]);
		addPoint([242,375],[242,595]);
		addPoint([602,392],[602,576]);
		addPoint([797,428],[1156,559]);

		p.addChild(pointContainer);
		pointContainer.on('mousedown',draw);
		pointContainer.on('pressmove',draw);
		pointContainer.on('pressup',draw);

		addPoint = null;
		point = null;
		pointContainer = null;
		p.reset();

		p.addChild(new father.tipOnce('请将下面的图形点对点连线，分成二等分或四等分。')).showOut();

		delete p.go;
	}

	p.reset = function(){
		for(let i =0;i<linePool.length;i++){
			linePool[i].visible = false;
		}
	}

	function draw(e){
		if(e.type=='mousedown'){
			for(let i=0;i<pointPool.length;i++){
				if(Math.abs(pointPool[i].x-e.localX)<range && Math.abs(pointPool[i].y-e.localY)<range && pointPool[i]._line.visible===false){
					currentLine = pointPool[i]._line;
					targPoint = pointPool[i].brother;
					currentLine._moveto.x = pointPool[i].x;
					currentLine._moveto.y = pointPool[i].y;
					currentLine._lineto.x = e.localX;
					currentLine._lineto.y = e.localY;
					currentLine.visible = true;
					return;
				}
			}

			targPoint = undefined;
			currentLine = undefined;
		}else if(e.type=='pressmove'){
			if(currentLine){
				currentLine._lineto.x = e.localX;
				currentLine._lineto.y = e.localY;
			}
		}else if(e.type=='pressup'){
			if(targPoint){
				if(Math.abs(targPoint.x-e.localX)<range && Math.abs(targPoint.y-e.localY)<range){
					currentLine._lineto.x = targPoint.x;
					currentLine._lineto.y = targPoint.y;
					father.preferSound('right');
					p.count();
				}else{
					currentLine.visible = false;
				}
			}
		}
	}

	function addPoint(pos1,pos2){
		let line = new createjs.Shape;
		let _p1 = point.clone().set({x:pos1[0],y:pos1[1],_line:line});
		let _p2 = point.clone().set({x:pos2[0],y:pos2[1],_line:line});

		_p1.brother = _p2;
		_p2.brother = _p1;

		line.graphics.s('#F7AB00').ss(4);
		line._moveto = line.graphics.mt(0,0).command;
		line._lineto = line.graphics.lt(0,0).command;

		linePool.push(line);
		pointPool.push(_p1);
		pointPool.push(_p2);
		pointContainer.addChild(_p1,_p2, line);
	}	
})();