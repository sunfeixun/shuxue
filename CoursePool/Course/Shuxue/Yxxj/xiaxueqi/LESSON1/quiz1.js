
(function(){
	let father = projectData.courseInterface;
	let p = new father.part(4,0);
	p.regCount(4);

	father.loader.addLoadElement(father.courseLib + 'customShape.js');

	p.go = function(){
		let container = new createjs.Container;
		let tabContainer = new createjs.Container;
		let bg = new myObject.shape('rectangle',{width:1280,height:720,color:'rgba(255,2255,255,0.01)',x:'center',y:230,addTo:container});
		let triangle = new myObject.dashShape('triangle',{x:'center',y:273,width:420,height:360,addTo:container},{visible:false});
		let rectangle = new myObject.dashShape('rectangle',{x:'center',y:273,width:420,height:230,addTo:container},{visible:false});
		let square = new myObject.dashShape('square',{x:'center',y:273,diameter:420,addTo:container},{visible:false});
		let circle = new myObject.dashShape('circle',{x:'center',y:273,diameter:420,addTo:container},{visible:false});

		p.addChild(container,tabContainer);

		container.on('mousedown',ondown);

		let a = {visible:true,scaleX:.25,scaleY:.25,y:640,_sca:.25};

		let tabTriangle = new myObject.dashShape('triangle',{width:300,height:260},a).set({x:325}).noAlpha();
		let tabRectangle = new myObject.dashShape('rectangle',{width:360,height:195},a).set({x:535}).noAlpha();
		let tabSquare = new myObject.dashShape('square',{diameter:300},a).set({x:745}).noAlpha();
		let tabCircle = new myObject.dashShape('circle',{diameter:300},a).set({x:955}).noAlpha();

		tabTriangle.ref = triangle;
		tabRectangle.ref = rectangle;
		tabSquare.ref = square;
		tabCircle.ref = circle;

		triangle.ref = tabTriangle;
		rectangle.ref = tabRectangle;
		square.ref = tabSquare;
		circle.ref = tabCircle;

		tabContainer.addChild(tabTriangle,tabRectangle,tabSquare,tabCircle);
		tabContainer.cursor = 'pointer';
		tabContainer.on('click',switchTab);

		p.answerShapes = [triangle,rectangle,square,circle];
		p._stage = container;
		p.tabStage = tabContainer;
		p._lineGroup = new Array;

		p._range = 30;
		
		p.lineStyle = new createjs.Graphics.StrokeStyle(8,1,1);
		p.pixelDetecter = new myObject.PixelDetecter([255,0,0],container,father.canvas);

		p.addChild(new father.tipOnce('请你描一描吧！')).showOut();

		delete p.go;
	}

	p.reset = function(){
		backLine(true);
		for(let i in p.answerShapes)
		{
			p.answerShapes[i].setLineStyle('dash').lineColor('black');
			p.answerShapes[i].ref.setLineStyle('dash').lineColor('black');
			p.answerShapes[i].done = false;
		}
	}

	function doneTab(){
		backLine(true);
		p.shape.setLineStyle('full').lineColor('red');
		p.shape.ref.setLineStyle('full').lineColor('red');
		p.shape.done = true;
		father.preferSound('right');
		p.count();
	}

	function switchTab(e){
		if(e.target.ref.visible){
			return;
		}
		backLine(true);

		for(let i in p.answerShapes){
			p.answerShapes[i].visible = false;
		}
		e.target.ref.visible = true;
		p.shape = e.target.ref;

		if(p.shape.shapeName=='square'||p.shape.shapeName=='rectangle')
		{
			let leftX = p.shape.x, rightX = leftX;
			let upY = p.shape.y, downY = upY;

			for(let i in p.shape.vertex){
				leftX > p.shape.vertex[i].x && (leftX = p.shape.vertex[i].x);
				rightX < p.shape.vertex[i].x && (rightX = p.shape.vertex[i].x);
				upY > p.shape.vertex[i].y && (upY = p.shape.vertex[i].y);
				downY < p.shape.vertex[i].y && (downY = p.shape.vertex[i].y);
			}
			p.limite = {leftX:leftX,rightX:rightX,upY:upY,downY:downY};
		}else if(p.shape.shapeName=='triangle'){
			let upY = p.shape.y - p.shape._height/2
			let downY = p.shape.y + p.shape._height/2;
			let leftX = p.shape.x - p.shape._width/2;
			let rightX = p.shape.x + p.shape._width/2;
			p.limite = {leftX:leftX,rightX:rightX,upY:upY,downY:downY};
		}
	}

	function ondown(e){
		if(!p.shape || p.shape.done)  return;

		if(p.shape.shapeName=='circle'){
			if(tightCircle(e.localX,e.localY,p.shape.x,p.shape.y,p.shape._radius)){
				createLine();
				p.startPoint = getAngle(e.localX,e.localY);
				onEvent(drawingCircle);
			}
			return;
		}else if(p.shape.shapeName=='square'||p.shape.shapeName=='rectangle'){
			createLine();
			onEvent(drawingRect);
		}else if(p.shape.shapeName=='triangle'){

			let xy = getTriaPoint(e.localX,e.localY);

			if(xy)
			{
				onEvent(drawingTriangle);
				createLine();
			}
		}
	}

	function getTriaPoint(x,y)
	{
		if(p.limite.upY - y > p._range || y - p.limite.downY > p._range || p.limite.leftX - x > p._range || x - p.limite.rightX > p._range)
		{
			return false;
		}

		for(let i in p.shape.vertex)
		{
			if(Math.abs(x-p.shape.vertex[i].x)<=p._range*1.7 && Math.abs(y-p.shape.vertex[i].y)<=p._range*1.7)
			{
				return [p.shape.vertex[i].x,p.shape.vertex[i].y];
			}
		}

		if(Math.abs(y - p.limite.downY) < p._range)
		{
			return [x,p.limite.downY];
		}

		let cw = x < p.shape.x ? (x - p.limite.leftX):(p.limite.rightX - x);
		let ch = p.limite.downY - y;
		let fixw = 	p.shape._width/2/(p.shape._height/ch);

		if(Math.abs(fixw - cw) > p._range)
		{
			return false;
		}else{
			fixw = x < p.shape.x? p.limite.leftX + fixw:p.limite.rightX - fixw;
			return [fixw,p.limite.downY-ch];
		}
	}

	function drawingTriangle(e)
	{
		if(e.type=='pressmove'){
			let xy = getTriaPoint(e.localX,e.localY);
			xy? p._liner.graphics.lt(xy[0],xy[1]):judgeFinishTriangle();
		}else if(e.type=='pressup'){
			judgeFinishTriangle();
		}
	}

	function drawingRect(e)
	{
		if(e.type=='pressmove'){

			if(e.localX<p.limite.leftX-p._range || e.localX > p.limite.rightX+p._range || e.localY < p.limite.upY-p._range || e.localY > p.limite.downY+p._range)
			{
				judgeFinishRect();
				return;
			}

			let vertex = p.shape.vertex;

			for(let i in vertex)
			{
				if(Math.abs(e.localX - vertex[i].x)<p._range && Math.abs(e.localY - vertex[i].y)<p._range){
					p._liner.graphics.lt(vertex[i].x,vertex[i].y);
					return;
				}
			}

			for(i in vertex)
			{
				if(Math.abs(e.localX - vertex[i].x)<p._range && e.localY > p.limite.upY && e.localY < p.limite.downY){  //垂直方向划线
					p._liner.graphics.lt(vertex[i].x,e.localY);
					return;
				}else if(Math.abs(e.localY - vertex[i].y)<p._range && e.localX > p.limite.leftX && e.localX < p.limite.rightX){
					p._liner.graphics.lt(e.localX,vertex[i].y);
					return;
				}
			}
			judgeFinishRect();
		}else if(e.type=='pressup'){
			judgeFinishRect();
		}
	}

	function judgeFinishTriangle()
	{
		offEvent();
		let _x,_y;

		for(_x=p.limite.leftX;_x<=p.limite.rightX;_x+=8)
		{
			if(!p.pixelDetecter.detect(_x,p.limite.downY))
			{
				return;
			}
		}

		let fixw;

		for(_y=p.limite.upY;_y<=p.limite.downY;_y+=8)
		{
			fixw = p.shape._width/2/p.shape._height * (_y - p.limite.upY);
			if(!p.pixelDetecter.detect(p.shape.x + fixw,_y) || !p.pixelDetecter.detect(p.shape.x - fixw,_y))
			{
				return;
			}
		}
		doneTab();
	}

	function judgeFinishRect()
	{
		offEvent();
		let _x, _y;
		let limite = p.limite;

		for(_x=limite.leftX;_x<=limite.rightX;_x+=9)
		{
			if(!p.pixelDetecter.detect(_x,limite.upY) || !p.pixelDetecter.detect(_x,limite.downY))
			{
				return;
			}
		}

		for(_y=limite.upY;_y<=limite.downY;_y+=9)
		{
			if(!p.pixelDetecter.detect(limite.leftX,_y) || !p.pixelDetecter.detect(limite.rightX,_y))
			{
				return;
			}
		}

		doneTab();
	}

	function drawingCircle(e)
	{
		let radina = getAngle(e.localX,e.localY);
		if(e.type=='pressmove'){
			if(tightCircle(e.localX,e.localY,p.shape.x,p.shape.y,p.shape._radius)){
				
				if((p.startPoint < radina || p.startPoint - radina > 5) && p.startPoint - radina > -5){
					p._liner.graphics.a(p.shape.x,p.shape.y,210,p.startPoint,radina);
				}else{
					p._liner.graphics.a(p.shape.x,p.shape.y,210,radina,p.startPoint);
				}

				p.startPoint = radina;
			}else{
				judgeFinishCircle();
			}
		}else if(e.type=='pressup'){
			judgeFinishCircle();
		}
	}

	function tightCircle(mouseX,mouseY,circleX,circleY,radius)
	{
		let bigX = circleX - mouseX, bigY = circleY - mouseY;
		let juli = Math.abs(Math.sqrt(Math.pow(bigX,2)+Math.pow(bigY,2)));
		let offset = juli - radius;
		return Math.abs(offset)<=p._range;
	}

	function judgeFinishCircle()
	{
		offEvent();
		let x0 = p.shape.x, y0 = p.shape.y;
		let r = p.shape._radius;

		for(let i=0;i<=Math.PI*2;i+=.11)
		{
			if(!p.pixelDetecter.detect(x0 + Math.cos(i)*r,y0 + Math.sin(i)*r))
			{
				return;
			}
		}
		doneTab();
	}

	function getAngle(mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
		let pi = Math.PI;
		let px = p.shape.x, py = p.shape.y;
        let x = Math.abs(px-mx), y = Math.abs(py-my);
        let z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        let cos = x/z;
        let radina = Math.acos(cos);//用反三角函数求弧度
      // 	let angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

        if(mx==px&&my<py){   //鼠标在y正轴方向
        	radina = pi*1.5;
        }else if(mx==px&&my>py){//鼠标在y轴负方向上
        	radina = pi/2;
        }else if(mx>px&&my==py){//鼠标在x轴正方向上
        	radina = 0;
        }else if(mx<px&&my>py){//鼠标在第三象限
        	radina = pi - radina;
        }else if(mx<px&&my==py){//鼠标在x轴负方向
        	radina = pi;
        }else if(mx<px&&my<py){//鼠标在第二象限
        	radina = radina + pi;
        }else if(mx>px&&my<py){    //第一象限
        	radina = pi*2 - radina;
        }

        return radina;
    }

	function onEvent(f)
	{
		p._pressmove = p._stage.on('pressmove',f);
		p._pressup = p._stage.on('pressup',f);
	}

	function offEvent()
	{
		p._stage.off('pressmove',p._pressmove);
		p._stage.off('pressup',p._pressup);
		p._pressmove = null;
		p._pressup = null;
	}

	function createLine(igoneStyle)
	{
		p._liner = p._stage.addChild(new createjs.Shape);
		!igoneStyle && p._liner.graphics.s('red').append(p.lineStyle);
		p._lineGroup.push(p._liner);
	}

	function backLine(all){
		if(all){
			while(p._lineGroup.length){
				p._lineGroup[0].graphics.clear();
				p._stage.removeChild(p._lineGroup.shift());
			}
		}else{
			let l = p._lineGroup.pop();
			l.graphics.clear();
			p._stage.removeChild(l);
			l = null;
		}
		p._liner = null;
	}

})();