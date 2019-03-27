(function() {
	let father = projectData.courseInterface;
	let p = new father.part(4,0);

	let questions = new Array, answers = new Array;
	let curline;
	p.regCount(5);
	father.loader.addLoadElement('quiz1.png',father.lessonPath);

	p.go = function() {
		let touchContainer = p.addChild(new createjs.Container);

		//建立问题
		let person = father.loader.getImage('quiz1.png').set({x:-90,y:-89,scaleX:0.8,scaleY:0.8});
		let txt = new father.text('',35,'white').set({x:26,y:36,textAlign:'center',textBaseline:'middle'});
		let texts = ['17-9','16-9','13-9','14-9','15-9'];
		let personContainer = new createjs.Container().set({y:207}), _pc;
		personContainer.addChild(person,txt);

		for(let i=0;i<5;i++){
			//quePosX.push(200 + (220*i));
			_pc = touchContainer.addChild(personContainer.clone(true).set({x:200+(220*i)}));
			_pc.mouseChildren = false;
			_pc.getChildAt(1).text = texts[i];
			questions.push(_pc);
		}

		//建立答案，重用之前变量；
		personContainer = new createjs.Container().set({y:542});
		person = new createjs.Shape();
		person.graphics.f('white').s('#DE943E').ss(2).sd([8,8]).dc(0,0,53);
		txt.set({color:'black',x:0,y:0,font:'38px Arial'});
		personContainer.addChild(person,txt);
		texts = [5,8,7,4,6];

		for(i=0;i<5;i++){
			//ansPosX.push(215+(212*i));
			_pc = touchContainer.addChild(personContainer.clone(true).set({x:215+(212*i)}));
			_pc.getChildAt(1).text = texts[i].toString();
			_pc.mouseChildren = false;
			_pc.isAnaswer = true;
			answers.push(_pc);
		}

		touchContainer.on('mousedown',draw);
		touchContainer.on('pressmove',draw);
		touchContainer.on('pressup',draw);
		match();
		match = null;


		delete p.go;
	}

	p.reset = function(){
		//let arrQue = new Array().concat(quePosX), arrAns = new Array().concat(ansPosX);
		for(let i in questions){
			questions[i].set({mouseEnabled:true});
			answers[i].set({mouseEnabled:true});
			questions[i]._line.visible = false;
		}
	}

	function draw(e){
		if(e.type=='mousedown'){
			curline = e.target._line || null;
			if(curline){
				curline._mt.x = e.target.isAnaswer? e.target.x:e.target.x + 22;
				curline._mt.y = e.target.isAnaswer? e.target.y:e.target.y + 67;
				curline._lt.x = e.localX;
				curline._lt.y = e.localY;
				curline.visible = true;
			}
		}else if(e.type=='pressmove' && curline){
			curline._lt.x = e.localX;
			curline._lt.y = e.localY;
		}else if(e.type=='pressup'){
			if(!curline){
				return;
			}
			let gtl = e.target._brother.globalToLocal(e.stageX,e.stageY);
			if(e.target._brother.hitTest(gtl.x,gtl.y)){
				e.target.mouseEnabled = e.target._brother.mouseEnabled = false;
				p.count();
			}else{
				curline.visible = false;
			}
		}
	}

	function match(){
		let line;
		let _parent = questions[0].parent;
		let i, j;

		for(i=0;i<questions.length;i++){
			line = new createjs.Shape().set({visible:false});
			line.graphics.s('#DE943E').ss(3);
			line._mt = line.graphics.mt(0,0).command;
			line._lt = line.graphics.lt(0,0).command;
			_parent.addChild(line);
			_parent.setChildIndex(line,0);

			for(j=0;j<answers.length;j++){
				if(eval(questions[i].getChildAt(1).text)===eval(answers[j].getChildAt(1).text)){
					questions[i]._line = answers[j]._line = line;
					questions[i]._brother = answers[j];
					answers[j]._brother = questions[i];
					break;
				}
			}
		}
	}	
})();