(function() {
	let father = projectData.courseInterface;
	let p = new father.part(3);

	const conArr = new father.orderContent([new createjs.Container,new createjs.Container,new createjs.Container]);
	const titleTexts = ['你能发现什么一样吗？请你点击相同的两个数','你知道他们两个相差多少个吗？','他们两个相加是多少？'];
	let title;
	let order = 0;
	let prevnext;

	p.go = function() {
		let i;
		let prevnextCon = p.addChild(new createjs.Container);

		prevnext = new father.prevNext();
		prevnext.addTo(prevnextCon);
		prevnextCon.cursor = 'pointer';
		prevnextCon.on('click',swip);

		title = new father.text(titleTexts[0],40).alignCenter().set({x:640,y:70});
		p.addChild(title);

		//第一题
		let q1 = new createjs.Container;
		let txt = new father.text('',100).alignCenter(),_txt;
		let texts = [1,30,10,2,3,20];
		let txs = [149,334,546,732,891,1077], ty = 380;
		let colors = {c1:'red',c2:'green',c3:'#00B0F0'};
		conArr.getContentAt(0).cursor = 'pointer';
		conArr.getContentAt(0).on('click',clickQ1);
		conArr.getContentAt(0).selectedText = null;
		conArr.getContentAt(0).rightCount = 0;

		for(i=0;i<texts.length;i++){
			_txt = txt.clone().set({text:texts[i].toString()});
			_txt = addClickShape(_txt).set({x:txs[i],y:ty,mouseChildren:false});

			_txt.val = texts[i] < 10? texts[i]:texts[i]/10;
			_txt.toColor = colors['c'+_txt.val.toString()];

			conArr.getContentAt(0).addChild(_txt);
		}

		conArr.getContentAt(0).reset = function(){
			TweenLite.killTweensOf(conArr[0].children);
			for(let i=0;i<conArr[0].children.length;i++){
				conArr.getContentAt(0).children[i].set({scaleX:1,scaleY:1,mouseEnabled:true});
				conArr.getContentAt(0).children[i].getChildAt(1).color = 'black';
			}
			conArr.getContentAt(0).selectedText = null;
			conArr.getContentAt(0).rightCount = 0;
		}

		//第二题
		let 
		chooser = new createjs.Container;
		txt = new father.text('',100).alignCenter().set({x:640,y:250});
		conArr.getContentAt(1).addChild(txt);
		conArr.getContentAt(1).add = null;
		conArr.getContentAt(1).reset = que23Reset.bind(conArr[1]);
		conArr.getContentAt(1).question = txt;

		txs = 121;
		ty = 450;
		let sumX = 130;

		for(i=10;i<=90;i+=10){
			_txt = new father.text(i.toString(),100).alignCenter();
			_txt = addClickShape(_txt).set({x:txs,y:ty,mouseChildren:false,val:i});
			txs += sumX;
			chooser.addChild(_txt);
		}

		chooser.cursor = 'pointer';
		chooser.on('click',choose,conArr[1]);
		conArr.getContentAt(1).addChild(chooser);
		conArr.getContentAt(1).reset = que23Reset.bind(conArr.getContentAt(1));
		conArr.getContentAt(1).reset();


		//第三题
		chooser = new createjs.Container;
		txt = new father.text('',100).alignCenter().set({x:640,y:250});
		conArr.getContentAt(2).addChild(txt,chooser);
		conArr.getContentAt(2).add = 'add';
		conArr.getContentAt(2).reset = que23Reset.bind(conArr.getContentAt(2));
		conArr.getContentAt(2).question = txt;
		txs = 121;

		for(i=20;i<=100;i+=10){
			_txt = new father.text(i.toString(),80).alignCenter();
			_txt = addClickShape(_txt).set({x:txs,y:ty,mouseChildren:false,val:i});
			txs += sumX;
			chooser.addChild(_txt);
		}

		chooser.cursor = 'pointer';
		chooser.on('click',choose,conArr.getContentAt(2));
		conArr.getContentAt(2).reset = que23Reset.bind(conArr.getContentAt(2));
		conArr.getContentAt(2).reset();

		conArr.init();
		for(i=0;i<conArr.length;i++){
			p.addChild(conArr[i]);
		}

		delete p.go;
	}

	function swip(e){
		if(conArr.swip(e.target.funcName)===null) return;
		prevnext.prev.visible = !conArr.isHead();
		prevnext.next.visible = !conArr.isEnd();
	}

	function addClickShape(txt){
		let bound = txt.getBounds();
		let con = new createjs.Container;
		let shape = new createjs.Shape;
		shape.graphics.f('rgba(255,255,255,0.01)').r(bound.x,bound.y,bound.width,bound.height);
		con.addChild(shape,txt);
		return con;
	}

	function next(){
		if(order>=conArr.length-1) return;

		conArr[order].visible = false;
		order ++;
		conArr[order].visible = true;
		TweenLite.fromTo(conArr[order],0.75,{alpha:0},{alpha:1});
		title.text = titleTexts[order];
		TweenLite.fromTo(title,0.75,{alpha:0},{alpha:1});
		conArr[order].reset();
	}

	function clickQ1(e){
		let ca = conArr[0];

		if(ca.selectedText===null){
			e.target.mouseEnabled = false;
			TweenLite.to(e.target,0.1,{scaleX:'+=0.2',scaleY:'+=0.2'});
			ca.selectedText = e.target;
		}else{
			if(ca.selectedText.val === e.target.val){
				e.target.mouseEnabled = false;
				father.preferSound('right');
				TweenLite.to(e.target,0.1,{scaleX:'+=0.2',scaleY:'+=0.2'});
				changeColor(ca.selectedText,e.target);
				conArr[0].rightCount ++;
				if(conArr[0].rightCount >= 3){
					father.playFire();
				};
			}else{
				ca.selectedText.set({scaleX:1,scaleY:1,mouseEnabled:true});
				father.preferSound('wrong');
			}
			ca.selectedText = null;
		}
	}

	function changeColor(txt1,txt2){
		txt1.getChildAt(1).color = txt1.toColor;
		txt2.getChildAt(1).color = txt2.toColor;
	}

	function getRandomText(mode){
		let str;
		let n1, n2, value;
		if(mode==='add'){
			n1 = Math.ceil(Math.random()*9);
			n2 = Math.ceil(Math.random()*(10-n1));	
		}else{
			n1 = Math.ceil(Math.random()*8)+1;
			n2 = Math.ceil(Math.random()*(n1-1));
		}

		n1 *= 10;
		n2 *= 10;

		str = mode==='add'? n1.toString() + ' + ' + n2.toString() + ' = ?':n1.toString() + ' - ' + n2.toString() + ' = ?';
		value = mode==='add'? n1+n2:n1-n2;

		return {text:str,value:value}
	}

	function que23Reset(){
		let v = getRandomText(this.add);
		this.question.text = v.text;
		this.answer = v.value;
		this.mouseEnabled = true;
	}

	function choose(e){
		if(e.target.val===this.answer){
			father.preferSound('right');
			father.playFire();
			e.target.getChildAt(1).color = 'red';
			this.mouseEnabled = false;
		}else{
			father.preferSound('wrong');
		}
	}
})();