let quiz1;


(function(){
	let father = projectData.courseInterface;
	let p = new father.part(4,0);

	let curFunc, curJudge, drawble;

	p.regCount(3);

	father.loader.addLoadElement(father.courseLib + 'customShape.js');

	p.go = function(){

		let bg = new createjs.Shape;
		bg.graphics.f('rgba(255,255,255,0.01').r(0,0,1280,500);

		let tabContainer = p.addChild(new createjs.Container);
		tabContainer.cursor = 'pointer';
		tabContainer.on('click',clickTab);

		let shapeContainer = p.addChild(new createjs.Container);
		shapeContainer.addChild(bg);
		shapeContainer.on('mousedown',ondown);
		shapeContainer.on('pressmove',moving);
		shapeContainer.on('pressup',moving);
		
		let trapezium = new myObject.dashShape('trapezium',{x:'center',y:300,width:500,height:325,skew:100,addTo:shapeContainer},{visible:false});
		let semiCircle = new myObject.dashShape('semiCircle',{x:'center',y:400,diameter:500,addTo:shapeContainer},{visible:false});
		let parallelogram = new myObject.dashShape('parallelogram',{x:'center',y:300,width:500,height:325,skew:100,addTo:shapeContainer},{visible:false})

		let a = {scaleX:.25,scaleY:.25,y:600,_sca:.25};
		
		let traptab = trapezium.newClone().set(a).set({x:340,_shape:trapezium}).noAlpha();
		let semitab = semiCircle.newClone().set(a).set({x:640,_shape:semiCircle,y:630}).noAlpha();
		let paratab = parallelogram.newClone().set(a).set({x:940,_shape:parallelogram}).noAlpha();

		trapezium.ref = traptab;
		semiCircle.ref = semitab;
		parallelogram.ref = paratab;
		
		tabContainer.addChild(traptab,semitab,paratab);


		p.addChild(new father.tipOnce('小朋友，请你描一描下面的图形吧')).showOut();

		p._tabs = [traptab,semitab,paratab];
		p._lineGroup = new Array;
		p._shapeStage = shapeContainer;
		p._lineStyle = new createjs.Graphics.StrokeStyle(8,1,1);
		p._range = 15;
		p.pixelDetecter = new myObject.PixelDetecter([255,0,0],shapeContainer,father.canvas);
		p.reset();
		delete p.go;
	}

	p.reset = function(){
		p._finishedShape = 0;
		backLine(true);
		for(let i in p._tabs)
		{
			p._tabs[i].setLineStyle('dash').lineColor('black');
			p._tabs[i]._shape.done = false;
			p._tabs[i]._shape.setLineStyle('dash').lineColor('black');
		}
	}

	function ondown(e)
	{
		if(!p._shape || p._shape.done)
		{
			return;
		}

		createLine();

		if(p._shape.shapeName=='trapezium'){
			curJudge = judgeTrapezium;
			curFunc = drawTrapezium;
		}else if(p._shape.shapeName=='semiCircle'){

			p.startPoint = getAngle(e.localX,e.localY);
			curFunc = drawSemiCircle;
			curJudge = judgeSemiCircle;
		}else if(p._shape.shapeName=='parallelogram'){
			curFunc = drawParalle;
			curJudge = judgeParalle;
		}
	}

	function moving(e){
		if(!p._shape || !drawble)
		{
			return;
		}

		if(e.type=='pressmove'){
			curFunc && curFunc(e.localX,e.localY);
		}else if(e.type=='pressup'){
			breakAndJudge();
		}
	}

	function drawParalle(x,y){
		let vfp = p._vertexForPoint;
		let vertex = p._shape.vertex;


		if(vfp[0][0]-x>p._range || x-vfp[3][0]>p._range || (p._shape.y-p._shape._height/2)-y>p._range || y-(p._shape.y+p._shape._height/2)>p._range)
		{
			breakAndJudge();
			return;
		}

		for(let i in vfp)
		{
			if(Math.abs(x-vfp[i][0])<p._range*2 && Math.abs(y-vfp[i][1])<p._range*2)
			{
				p._liner.graphics.lt(vfp[i][0],vfp[i][1]);
				return;
			}
		}

		let fix;

		fix = p._shape._skew/(p._shape._height/(y-p._shape.y+p._shape._height/2));

		if(x>vertex.x1 && x<vertex.x2 && Math.abs(y-vertex.y1)<p._range){
			p._liner.graphics.lt(x,vertex.y1);
		}else if(x>vertex.x3 && x<vertex.x4 && Math.abs(y-vertex.y2)<p._range){
			p._liner.graphics.lt(x,vertex.y2);
		}else if(x>vertex.x1 && x<vertex.x3){
			Math.abs(vertex.x3-fix-x)<p._range && p._liner.graphics.lt(vertex.x3-fix,y);
		}else if(x>vertex.x2 && x<vertex.x4){
			Math.abs(vertex.x4-fix-x)<p._range && p._liner.graphics.lt(vertex.x4-fix,y);
		}else{
			breakAndJudge();
		}
	}

	function judgeParalle(){
		let vertex = p._shape.vertex;

		let line = p._shapeStage.addChild(new createjs.Shape)
		line.graphics.s('red').ss(2);

		for(let i=vertex.x1;i<=vertex.x2;i+=6)
		{
			if(!p.pixelDetecter.detect(i,vertex.y1))
			{
				return false;
			}
		}

		for(let i=vertex.x3;i<=vertex.x4;i+=6)
		{
			if(!p.pixelDetecter.detect(i,vertex.y2))
			{
				return false;
			}
		}

		i = vertex.y1 < vertex.y2?  vertex.y1:vertex.y2;
		let y2 = vertex.y1 < vertex.y2? vertex.y2:vertex.y1;
		let fix;

		for(;i<=y2;i+=6)
		{
			fix = p._shape._skew/(p._shape._height/(i-p._shape.y+p._shape._height/2));
			if(!p.pixelDetecter.detect(vertex.x3-fix,i) || !p.pixelDetecter.detect(vertex.x4-fix,i))
			{
				return false;
			}
		}

		return true;
	}

	function drawSemiCircle(x,y){
		if(y-p._shape.y>p._range)
		{
			breakAndJudge();
			return;
		}

		let juli;

		if(Math.abs(y-p._shape.y)<p._range && x>p._shape.x-p._shape._radius && x<p._shape.x+p._shape._radius)
		{
			p.startPoint = x>p._shape.x? Math.PI*2:Math.PI*1



			if(Math.abs(x-p._shape.x+p._shape._radius)<=p._range){
				p._liner.graphics.lt(p._shape.x-p._shape._radius,p._shape.y);
				return;
			}else if(Math.abs(x-p._shape.x-p._shape._radius)<=p._range){
				p._liner.graphics.lt(p._shape.x+p._shape._radius,p._shape.y);
			}

			p._liner.graphics.lt(x,p._shape.y);
			return;
		}

		juli = Math.sqrt(Math.pow(p._shape.x-x,2)+Math.pow(p._shape.y-y,2));
		let radina = getAngle(x,y);

		radina = radina < Math.PI/2? Math.PI*2: radina;


		if(Math.abs(juli-p._shape._radius)<=p._range && y<p._shape.y){
			if(p.startPoint<radina){
				p._liner.graphics.a(p._shape.x,p._shape.y,p._shape._radius,p.startPoint,radina);
			}else{
				p._liner.graphics.a(p._shape.x,p._shape.y,p._shape._radius,radina,p.startPoint);
			}
			p.startPoint = radina;
			return;
		}

		breakAndJudge();
	}

	function getAngle(mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
		let pi = Math.PI;
		let px = p._shape.x, py = p._shape.y;
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

	function judgeSemiCircle(){
		let x0 = p._shape.x, y0 = p._shape.y;
		let r = p._shape._radius;

		for(let i=Math.PI;i<=Math.PI*2;i+=.11)
		{
			if(!p.pixelDetecter.detect(x0 + Math.cos(i)*r,y0 + Math.sin(i)*r))
			{
				return false;
			}
		}

		for(i=x0-r;i<=x0+r;i+=6)
		{
			if(!p.pixelDetecter.detect(i,p._shape.y))
			{
				return false;
			}
		}

		return true;
	}

	function drawTrapezium(x,y){
		let vertex = p._shape.vertex;

		if(x<vertex.x3 || x>vertex.x4 || vertex.y1-y>p._range || y-vertex.y2>p._range){
			breakAndJudge();
			return;
		}

		for(let i in p._vertexForPoint)
		{
			if(Math.abs(x-p._vertexForPoint[i][0])<=p._range*1.4 && Math.abs(y-p._vertexForPoint[i][1])<=p._range*1.4)
			{
				p._liner.graphics.lt(p._vertexForPoint[i][0],p._vertexForPoint[i][1]);
				return;
			}
		}

		let fix;

		if(Math.abs(y - vertex.y1) < p._range && x > vertex.x1 && x < vertex.x2){
			p._liner.graphics.lt(x,vertex.y1);
			return;
		}else if(Math.abs(y - vertex.y2) < p._range && x > vertex.x3 && x < vertex.x4){
			p._liner.graphics.lt(x,vertex.y2);
			return;
		}else if(x<vertex.x1 && x>vertex.x3){
			fix = vertex.x1 - p._shape._skew/(p._shape._height/(y-p._shape.y+p._shape._height/2));
			Math.abs(fix-x)<p._range? p._liner.graphics.lt(fix,y):breakAndJudge();
		}else if(x>vertex.x2 && x<vertex.x4){
			fix = vertex.x2 + p._shape._skew/(p._shape._height/(y-p._shape.y+p._shape._height/2));
			Math.abs(fix-x)<p._range? p._liner.graphics.lt(fix,y):breakAndJudge();
		}
	}

	function judgeTrapezium(){
		let vertex = p._shape.vertex;

		for(let i = vertex.x1;i<=vertex.x2;i+=6)
		{
			if(!p.pixelDetecter.detect(i,vertex.y1)){
				return false;
			}
		}

		for(i = vertex.x3;i<=vertex.x4;i+=6)
		{
			if(!p.pixelDetecter.detect(i,vertex.y2)){
				return false;
			}
		}

		let fix;

		for(i=vertex.y1;i<=vertex.y2;i+=6)
		{
			
			fix = p._shape._skew/(p._shape._height/(i-p._shape.y+p._shape._height/2));
			if(!p.pixelDetecter.detect(vertex.x1-fix,i) || !p.pixelDetecter.detect(vertex.x2+fix,i)){
				return false;
			}
		}

		return true;
	}

	function doneTab()
	{
		drawble = false;
		curFunc = null;
		p._shape.done = true;
		p._shape.ref.setLineStyle('full').lineColor('red');
		backLine(true);
		p._shape.setLineStyle('full').lineColor('red');
		father.preferSound('right');
		p.count();
	}

	function clickTab(e)
	{
		if(e.target._shape.visible)
		{
			return;
		}

		backLine(true);

		for(let i in p._tabs)
		{
			p._tabs[i]._shape.visible = false;
		}
		e.target._shape.visible = true;
		p._shape = e.target._shape;

		let vertex = p._shape.vertex;

		if(p._shape.shapeName=='trapezium' || p._shape.shapeName=='parallelogram'){
			p._vertexForPoint = [
				[vertex.x1,vertex.y1],
				[vertex.x2,vertex.y1],
				[vertex.x3,vertex.y2],
				[vertex.x4,vertex.y2]
			];
		}
	}

	function breakAndJudge(){
		drawble = false;
		curJudge() && doneTab();
	}

	function createLine(igoneStyle)
	{
		drawble = true;
		p._liner = p._shapeStage.addChild(new createjs.Shape);
		!igoneStyle && p._liner.graphics.s('red').append(p._lineStyle);
		p._lineGroup.push(p._liner);
	}

	function backLine(all){
		if(all){
			while(p._lineGroup.length){
				p._lineGroup[0].graphics.clear();
				p._shapeStage.removeChild(p._lineGroup.shift());
			}
		}else{
			let l = p._lineGroup.pop();
			l.graphics.clear();
			p._shapeStage.removeChild(l);
			l = null;
		}
		p._liner = null;
	}

	quiz1 = p;
})();