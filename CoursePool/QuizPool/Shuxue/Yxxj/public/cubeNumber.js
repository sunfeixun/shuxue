	(function(){
		let defaultInfo = {size:60};
		let father = QuizPool;

		function cubenumber(num,size){
			this.Container_constructor();
			size = size || defaultInfo.size;
			num = num || 1;
			let cube = new father.Cube({width:size,height:size,fillColor:'#9DC3E6',lineColor:'gray'});
			let txt = new father.text(num.toString(),size,'white').alignCenter();
			let bound = cube.getBounds();
			this._size = size;
			this._value = num;
			this.txt = txt;
			this.mouseChildren = false;
			this.addChild(cube,txt);
			this.setBounds(bound.x,bound.y,bound.width,bound.height);
		}

		let p = createjs.extend(cubenumber,createjs.Container);

		p.addTo = function(_parent){
			return _parent.addChild(this);
		}

		p.value = function(n){
			if(typeof(n) !== 'number') return this._value;
			this.txt.text = n.toString();
			return this._value = n;
		}

		p.hideValue = function(){
			this.txt.visible = false;
			return this;
		}

		p.clone = function(){
			let c = new cubenumber(this.value(),this._size);
			c.x = this.x;
			c.y = this.y;
			c.scaleX = this.scaleX;
			c.scaleY = this.scaleY;
			c.regX = this.regX;
			c.regY = this.regY;
			c.alpha = this.alpha;
			c.visible = this.visible;
			c.rotation = this.rotation;
			return c;
		}

		p.top = function(){
			return this.getTransformedBounds().y;
		}

		p.bottom = function(){
			return this.getTransformedBounds().y + this.getTransformedBounds().height;
		}

		p.left = function(){
			return this.getTransformedBounds().x;
		}

		p.right = function(){
			return this.getTransformedBounds().x + this.getTransformedBounds().width;
		}

		father.Cube.prototype.top = p.top;
		father.Cube.prototype.bottom = p.bottom;
		father.Cube.prototype.left = p.left;
		father.Cube.prototype.right = p.right;

		QuizPool.cubeNumber = createjs.promote(cubenumber,'Container');
	})();