let QuizPool;

/*
group类 : 用于随机的虚拟group
read()  读旁白/题干
*/

(function(){
	let p = {};
	let readSound;

	p.default = {
		font:'Kaiti',
		width:1280,
		height:720,
	};

	p.text = Lib.text;
	p.ANSWER_CORRECT = 'correct';
	p.ANSWER_INCORRECT = 'incorrect';
	p.ANSWER_FINISH = 'finish';

	// 需要其他接口配置的信息;
	p.loader = null;
	p.quizPath = null;
	p.quizClass = null;

	// functions

	p.read = function(sound){
		readSound && readSound.stop();
		readSound = createjs.Sound.play(sound);
		return readSound;
	}

	p.createElement = function(eles,loader,container){
		let instance = {};
		let statement;
		let prevEle = {};
		// let data, ele;

		for(let i=0;i<eles.length;i++){
			_create(eles[i]);
		}

		return instance;

		function _create(data,isClone){
			let ele;
			let _attr = {};   //为避免statement的attr被重复改写

			if(data.statement){
				statement = data.statement;
				return;
			}else if(data.statement===null){
				statement = null;
				return;
			}

			if(data.clone){
				let n = data.clone;
				delete data.clone;
				for(let i=0;i<n;i++){
					_create(data,true);
				}
				return;
			}

			if(data.type==='image'){
				ele = loader.getImage(data.name,data.center===true? 'center':undefined);
			}else if(data.type==='sprite'){
				ele = loader.getSprite(data.spriteData,data.center)[data.name];
			}else if(data.type==='container'){
				ele = new createjs.Container;
			}else if(data.type==='text'){
				ele = new p.text(data.text,data.size);
				data.center && ele.alignCenter();
			}else if(data.type instanceof createjs.DisplayObject){
				ele = isClone? data.type.clone(true) : data.type;
			}

			if(statement){
				for(let i in statement){
					if(isClone){
						data[i] = statement[i];
					}else{
						data[i] = data[i] === undefined? statement[i]:data[i];
					}
				}
			}

			if(data.on){
				if(typeof(data.on[0])==='string'){
					ele.on.apply(ele,data.on);
				}else if(data.on[0] instanceof Array){
					for(let i=0;i<data.on.length;i++){
						ele.on.apply(ele,data.on[i]);
					}
				}
			}
			
			if(data.instance) {
				if(isClone){
					instance[data.instance] = instance[data.instance] || new Array;
					instance[data.instance].push(ele);
				}else{
					instance[data.instance]!==undefined && console.log('已存在的实例，将被覆盖');
					instance[data.instance] = ele;
				}
			};

			// if(data.x) ele.x = _convert(data.x,p.default.width,prevEle.x);
			// if(data.y) ele.y = _convert(data.y,p.default.height,prevEle.y);
			if(statement && statement.attr){
				for(let i in statement.attr){
					data.attr[i] = data.attr[i]===undefined? statement.attr[i]:data.attr[i];
				}
			}

			if(data.attr){
				for(let i in data.attr){
					_attr[i] = data.attr[i];
				}

				if(typeof(_attr.scale)==='number'){
					_attr.scaleX = _attr.scaleY = _attr.scale;
					delete _attr.scale;
				}
				_attr.x = _convert(_attr.x,p.default.width,prevEle.x);
				_attr.y = _convert(_attr.y,p.default.height,prevEle.y);

				ele.set(_attr);
			}

			if(data.addToArray){
				data.addToArray.push(ele);
			}

			if(data.addTo){
				data.addTo = typeof(data.addTo) === 'string'? instance[data.addTo]:data.addTo;
				data.addTo.addChild(ele);
			}

			data.addTo? data.addTo.addChild(ele):container.addChild(ele);
			prevEle = ele;
		}

		function _convert(value,max,prevNum){
			if(typeof(value)==='number'){
				return value;
			}else if(value===undefined||value===null){
				return 0;
			};

			if(value==='center') return max/2;
			if(value.indexOf('center-=')===0) return max/2 - parseInt(value.replace('center-=',''));
			if(value.indexOf('center+=')===0) return max/2 + parseInt(value.replace('center+=',''));

			prevNum = prevNum===undefined? 0:prevNum;
			if(value.indexOf('+=')===0) return prevNum + parseInt(value.replace('+=',''));
			if(value.indexOf('-=')===0) return prevNum - parseInt(value.replace('-=',''));
		}
	}

	QuizPool = p;
})();

(function(){
	const allQuizes = new Array;

	function Quiz(order){
		this.Container_constructor();
		this.custom = {};
		if(order >= 0){
			if(allQuizes[order]){
				console.log('这个位置已经被占用');
				allQuizes.push(this);
			}else{
				allQuizes[order] = this;
			}		
		}else{
			allQuizes.push(this);
		}
	}

	Quiz.getAllQuiz = function(){
		return new Array().concat(allQuizes);
	}

	let p = createjs.extend(Quiz,createjs.Container);

	QuizPool.quiz = createjs.promote(Quiz,'Container');
})();

(function(){
	let p = {};

	p.random = function(){
		if(arguments.length===0){
			return Math.random()>=0.5;
		}else if(arguments.length===1){
			return Math.ceil(Math.random()*arguments[0]);
		}else if(arguments.length===2){
			return Math.round(Math.random()*(arguments[1] - arguments[0])) + arguments[0];
		}
	}

	p.pointInRect = function(x,y,area){
		return x>area.x && y>area.y && x<area.x+area.width && y<area.y+area.height;
	}

	QuizPool.publicFunction = p;
})();

(function(){

	let backArr = new Array, reorderArr = new Array;

	function Group(){
		this.array = new Array;
		for(let i=0;i<arguments.length;i++){
			this.array.push(arguments[i]);
		}
	}

	function clearArr(){
		for(let i=0;i<arguments.length;i++){
			while(arguments[i].length>0) arguments[i].shift();
		}
	}

	let p = Group.prototype;

	p.set = function(attr){
		TweenLite.set(this.array,attr);
		return this;
	}

	p.randomOrder = function(){
		let i;

		if(this.array.length===0){
			console.log('长度为0，无法重新排列');
			return this;
		}

		for(i=0;i<this.array.length;i++){
			backArr.push(this.array[i]);
		}

		while(this.array.length>0) reorderArr.push(this.chooseOne());


		for(i=0;i<backArr.length;i++){
			if(backArr[i]!==reorderArr[i]){
				while(reorderArr.length>0) this.array.push(reorderArr.shift());
				clearArr(backArr);
				return this;
			}
		}

		clearArr(reorderArr);
		while(backArr.length>0) this.array.push(backArr.shift());

		this.randomOrder();
		return this;
	}

	p.chooseOne = function(noChange){
		let arr = this.constructor === Array? this:this.array;

		if(noChange){
			return arr[Math.floor(Math.random()*arr.length)];
		}else{
			return arr.splice(Math.floor(Math.random()*arr.length),1)[0];
		}
	}

	p.clone = function(everyone){
		let g = new Group;

		for(i=0;i<this.array.length;i++){
			g.array.push(this.array[i].clone(true));
		}

		return g;
	}

	p.sumAttr = function(attrName,initValue,sumValue){

		for(let i=0;i<this.array.length;i++){
			this.array[i][attrName] = initValue+sumValue*i;
		}

		return this;
	}

	p.getAttrToArray = function(attr){
		let arr = new Array;
		for(let i=0;i<this.array.length;i++){
			arr.push(this.array[i][attr]);
		}

		return arr;
	}

	p.setAttrFromArray = function(attr,arr){
		if(attr.constructor === Array){
			for(let i=0;i<this.array.length;i++){
				for(let j=0;j<attr.length;j++){
					this.array[i][attr[j]] = arr[i][j];
				}
			}
		}else{
			for(let i=0;i<this.array.length;i++){
				this.array[i][attr] = arr[i];
			}			
		}

		return this;
	}

	p.setAttrFromSelf = function(attr){
		for(let i=0;i<this.array.length;i++){
			for(let j in attr){
				this.array[i][j] = this.array[i][attr[j]];
			}
		}

		return this;
	}

	p.freshAttr = function(attr){
		let _tempArr = [], i;
		for(i=0;i<this.array.length;i++){
			_tempArr.push(this.array[i][attr]);
		}

		this.randomOrder();

		for(i=0;i<this.array.length;i++){
			this.array[i][attr] = _tempArr[i];
		}

		return this;
	}

	p.addTo = function(father){
		for(let i=0;i<this.array.length;i++){
			father.addChild(this.array[i]);
		}
		return this;
	}

	p.countAttr = function(attr,targ){
		let _attr, i, j;
		let counter = 0;

		if(typeof(attr)==='string'){
			for(i=0;i<this.array.length;i++){
				this.array[i][attr] === targ && counter ++;
			}
		}else if(attr instanceof Array){
			for(i=0;i<this.array.length;i++){
				_attr = this.array[i][attr[0]];

				for(j=1;j<attr.length;j++){
					if(_attr===undefined || _attr===null) break;
					_attr = _attr[attr[j]];
				}
				if(j < attr.length-1) continue;
				_attr === targ && counter ++;
			}
		}

		return counter === this.array.length? 'all':counter;
	}

	p.do = function(funcStr,params){
		let func;
		for(let i=0;i<this.array.length;i++){
			func = this.array[i][funcStr];
			func.apply(this.array[i],params);
		}
		return this;
	}

	p.mergeInContainer = function(_parent){
		let c = new createjs.Container;
		for(let i=0;i<this.array.length;i++){
			if(this.array[i] instanceof createjs.DisplayObject){
				c.addChild(this.array[i]);
			}else{
				console.log('非显示对象，未加入到容器');
			}
		}

		_parent && _parent.addChild(c);
		return c;
	}
	
	QuizPool.group = Group;
})();

(function(){

	function title(text,addTo,mode){
		this.text_constructor(text,title.default.size);
		this.alignCenter();
		// this.x = QuizPool.default.width/2;
		this.textAlign = 'left';
		this.x = (QuizPool.default.width - this.getBounds().width)/2;
		this.y = QuizPool.default.height*0.14;


		addTo.addChild(this);
	}

	title.default = {
		size:40
	}

	let p = createjs.extend(title,QuizPool.text);

	QuizPool.title = createjs.promote(title,'text');
})();

(function() {
	let defaultInfo = {color:'black',thick:2};

	function line(points,color,thick){
		this.Shape_constructor();
		color = color || defaultInfo.color;
		thick = thick || defaultInfo.thick;
		this.graphics.s(color).ss(thick);
		this.drawline(points);
	}

	line.setDefault = function(info){
		for(let i in info){
			defaultInfo[i] = info[i];
		}
	}

	let p = createjs.extend(line,createjs.Shape);

	p.drawline = function(po){
		if(typeof(po[0])==='number'){
			this.graphics.mt(po[0],po[1]).lt(po[2],po[3]);
		}else if(po[0] instanceof Array){
			for(let i=0;i<po.length;i++){
				this.graphics.mt(po[i][0],po[i][1]).lt(po[i][2],po[i][3]);
			}
		}

		return this;
	}

	p.addTo = function(_parent){
		return _parent.addChild(this);
	}

	QuizPool.Line = createjs.promote(line,'Shape');
})();

(function(){
	let defaultInfo = {
		width:60,
		height:60,
		fillColor:null,
		lineColor:'black',
		lineThick:2,
		round:5,
		center:true
	}

	function cube(attr){
		this.Shape_constructor();
		attr = attr || {};
		let width = attr.width || defaultInfo.width;
		let height = attr.height || defaultInfo.height;
		let fillColor = attr.fillColor || defaultInfo.fillColor;
		let lineColor = attr.lineColor || defaultInfo.lineColor;
		let lineThick = attr.lineThick || defaultInfo.lineThick;
		let round = attr.round || defaultInfo.round;
		let center = attr.center || defaultInfo.center;
		let ptX = center? -width/2:0, ptY = center? -height/2:0;

		this.graphics.f(fillColor).s(lineColor).ss(lineThick);
		this.graphics.rr(ptX,ptY,width,height,round);
		this.setBounds(ptX,ptY,width,height);
	}

	cube.setDefault = function(info){
		for(let i in info){
			defaultInfo[i] = info[i];
		}
	}

	let p = createjs.extend(cube,createjs.Shape);

	p.addTo = function(_parent){
		return _parent.addChild(this);
	}

	QuizPool.Cube = createjs.promote(cube,'Shape');
})();