var myObject = {};

(function(){
	var _obj = myObject;
	//自定义形状类
	(function(){
		function shape(shape,opts,attr)
		{
			"use strict";
			this.Shape_constructor();
			opts = opts||{};
			opts.x = opts.x || 0;
			opts.y = opts.y || 0;
			var color = opts.color || 'black';
			opts.width = opts.width || 100;
			opts.height = opts.height || 100;

			this.set({regX:opts.width/2,regY:opts.height/2});

			if(typeof(opts.x)=='number'){
				this.x = opts.x;
			}else if(opts.x=='center'){
				this.x = projectData.width/2;
			}else{
				this.x = 0;
			}

			if(typeof(opts.y)=='number'){
				this.y = opts.y;
			}else if(opts.y=='center'){
				this.y = projectData.height/2;
			}else{
				this.y = 0;
			}

			switch(shape)
			{
				case 'rectangle':
					this._width = opts.width;
					this._height = opts.height;
					break;
				case 'circle':
					this._radius = opts.diameter/2;
					this._diameter = opts.diameter;
					this.regY = this.regX = 0;
					break;
				case 'triangle':
					this._width = opts.width;
					this._height = opts.height;
					break;
				case 'square':
					this._radius = opts.diameter/2;
					this._diameter = opts.diameter;
					this.regX = this.regY = opts.diameter/2;
					break;
				case 'trapezium':
					this._width = opts.width;
					this._height = opts.height;
					this._skew = opts.skew;
					break;
				case 'semiCircle':
					this._diameter = opts.diameter;
					this._radius = opts.diameter/2;
					this.regX = this.regY = 0;
					break;
				case 'parallelogram':
					this._width = opts.width;
					this._height = opts.height;
					this._skew = opts.skew;
					break;
			}

			this.shapeName = shape;
			attr && this.set(attr);
			this._linecolor = this.graphics.append(p.lineThick).s('blue').command;
			this._fillcolor = this.graphics.f(color).command;
			this._linecolor.style = null;

			!opts.color && (this._fillcolor.style=null);
			this.updater();
			opts.addTo && opts.addTo.addChild(this);
		}

		var p = createjs.extend(shape,createjs.Shape);

		p.lineThick = new createjs.Graphics.StrokeStyle(2,1,1);

		p.updater = function(){
			var px1,px2,py1,py2;
			switch (this.shapeName)
			{
				case 'rectangle':
					this.graphics.r(0,0,this._width,this._height);
					break;
				case 'circle':
					this.graphics.dc(0,0,this._radius);
					break;
				case 'triangle':
					px1 = this.regX - this._width/2;
					px2 = this.regX + this._width/2;
					py1 = this.regY - this._height/2;
					py2 = this.regY + this._height/2;
					this.graphics.mt(this.regX,py1).lt(px1,py2).lt(px2,py2).cp();
					break;
				case 'square':
					this.graphics.r(0,0,this._diameter,this._diameter);
					break;
				case 'trapezium':
					px1 = this.regX - this._width/2;
					px2 = this.regX + this._width/2;
					py1 = this.regY - this._height/2;
					py2 = this.regY + this._height/2;
					this.graphics.mt(px1+this._skew,py1).lt(px2-this._skew,py1).lt(px2,py2).lt(px1,py2).cp();
					break;
				case 'semiCircle':
					this.graphics.a(0,0,this._radius,Math.PI,Math.PI*2).cp();
					break;
				case 'parallelogram':
					py1 = this.regY - this._height/2;
					py2 = this.regY + this._height/2;
					if(this._skew>=0){
						px1 = this.regX - this._width/2 + this._skew;
						px2 = this.regX + this._width/2;
						this.graphics.mt(px1,py1).lt(px2,py1).lt(this.regX+this._width/2-this._skew,py2).lt(this.regX-this._width/2,py2).cp();						
					}else{
						px1 = this.regX - this._width/2;
						px2 = this.regX + this._width/2 - Math.abs(this._skew);
						this.graphics.mt(px1,py1).lt(px2,py1).lt(this.regX+this._width/2,py2).lt(this.regX-this._width/2+Math.abs(this._skew),py2).cp();
					}
				break;
			}
		}

		p.newClone = function(){
			var attr = {};
			this._width && (attr.width = this._width);
			this._height && (attr.height = this._height);
			this._diameter && (attr.diameter = this._diameter);
			this._skew && (attr.skew = this._skew);
			attr.x = this.x;
			attr.y = this.y;
			return new this.constructor(this.shapeName,attr);
		}

		p.addLine = function(){
			if(this.lined)
			{
				return;
			}
			this.lined = true;
			this._linecolor.style = 'blue';
			this.updater();
			return this;
		}

		p.unLine = function(){
			this._linecolor.style = null;
			this.updater();
			this.lined = false;
		}

		p.lineColor = function(c){
			this._linecolor.style = c;
			return this;
		}

		p.fill = function(c){
			this._fillcolor.style = c;
			return this;
		}

		p.wiggle = function(){
			!TweenMax.isTweening(this) && TweenMax.to(this,.1,{scaleX:1.07,scaleY:1.07,yoyo:true,repeat:1});
		}

		p.noAlpha = function(){
			this.graphics.f('rgba(255,255,255,0.01)');
			this.updater();
			return this;
		}

		myObject.shape = createjs.promote(shape,"Shape");
	})();

	//虚线描边形状
	(function(){

		function dashShape(shape,opts,attr){
			opts = opts || {};
			this.shape_constructor(shape,opts,attr);
			var color = opts.color || 'black';
			opts.lineColor = opts.lineColor || 'black';

			this._linecolor = this.graphics.c().s(opts.lineColor).command;
			this.linethick = this.graphics.ss(p.linethick,1,1).command;
			this._segments = this.graphics.sd(this.dashStyle).command;
			this._fillcolor = this.graphics.f(color).command;
			!opts.color && (this._fillcolor.style=null);
			this.updater();
			this.getVertex();
		}

		var p = createjs.extend(dashShape,myObject.shape);

		p.dashStyle = [13,18];
		p.linethick = 8;

		p.setThick = function(thick){
			this.linethick.width = thick;
			return this;
		}

		p.getVertex = function(){
			var vertex;

			var w = this._width/2 || this._diameter/2;
			var h = this._height/2 || this._diameter/2;

			switch(this.shapeName)
			{
				case 'triangle':
					vertex = [
						{x:this.x,y:this.y - h},
						{x:this.x - w,y:this.y + h},
						{x:this.x + w,y:this.y + h}
					]
					break;
				case 'rectangle': case 'square':
					vertex = [
						{x:this.x-w,y:this.y-h},
						{x:this.x+w,y:this.y-h},
						{x:this.x-w,y:this.y+h},
						{x:this.x+w,y:this.y+h}
					]
					break;
				case 'circle':
					vertex = [
						{x:this.x-w,y:this.y},
						{x:this.x,y:this.y-w},
						{x:this.x+w,y:this.y},
						{x:this.x,y:this.y+w}
					]
				break;
				case 'trapezium':
					vertex = {
						x1:this.x-w+this._skew,
						x2:this.x+w-this._skew,
						x3:this.x-w,
						x4:this.x+w,
						y1:this.y-h,
						y2:this.y+h
					}
				break;
				case 'parallelogram':
					vertex = {
						x1:this.x-w,
						x2:this.x+w-Math.abs(this._skew),
						x3:this.x-w+Math.abs(this._skew),
						x4:this.x+w
				}
				vertex.y1 = (this._skew>0)? this.y+h:this.y-h;
				vertex.y2 = (this._skew>0)? this.y-h:this.y+h;
				break;
			}



			this.vertex = vertex;
		}

		p.setLineStyle = function(s){
			if(s=='dash'){
				this._segments.segments = this.dashStyle;
			}else if(s=='full'){
				this._segments.segments = null;
			}
			return this;
		}

		myObject.dashShape = createjs.promote(dashShape,"shape");
	})();

	//判断像素检测点是否匹配颜色
	(function(){
		function PixelDetecter(rgb,container,canvas)
		{
			this.rgb = rgb;
			this.container = container;
			this.ctx = canvas.getContext('2d');
		}

		PixelDetecter.prototype.range = 50;
		
		PixelDetecter.prototype.detect = function(x,y){
			var gp = this.container.localToGlobal(x,y);
			x = gp.x;
			y = gp.y;
			var colorData = this.ctx.getImageData(x,y,1,1).data;

			return (Math.abs(colorData[0]-this.rgb[0])<this.range&&Math.abs(colorData[1]-this.rgb[1])<this.range&&Math.abs(colorData[2]-this.rgb[2])<this.range)
		}

		myObject.PixelDetecter = PixelDetecter;
	})();
})();