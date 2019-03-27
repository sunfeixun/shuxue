(function() {
	let father = QuizPool;
	father.loader.add(['QUIZ10.png','QUIZ10.json'],father.quizPath);
	father.loader.add(['splitStar.png','splitStar.js','cubeNumber.js'],father.quizClass+'public/');
	father.Cube.setDefault({fillColor:'#9DC3E6',lineColor:'gray'});

	let p = {};
	const margin = 40;
	let Positions = [
		[{x:0,y:0}],
		[{x:-margin,y:0},{x:margin,y:0}],
		[{x:0,y:-margin},{x:-margin,y:margin},{x:margin,y:margin}],
		[{x:-margin,y:-margin},{x:margin,y:-margin},{x:-margin,y:margin},{x:margin,y:margin}],
		[{x:-margin,y:-margin},{x:margin,y:-margin},{x:-margin,y:margin},{x:margin,y:margin},{x:0,y:-margin*3}]
	];

	p.dragPositionX = [365,502,640,777,915];
	p.dragPositionY = 655;

	p.createObj = function(cubenumber,img,count){
		let con = new createjs.Container;
		count = count || 4;
		for(let i=1;i<=count;i++){
			con.addChild(img.clone());
		}
		cubenumber.objContainer = con;
		cubenumber.addChildAt(con,0);
		con.y = -150;
		p.freshCount(cubenumber);
		return con;
	}

	p.freshCount = function(cubenumber,n){
		let oc = cubenumber.objContainer;
		let children = oc.children;
		let v = cubenumber.value();
		let pos = Positions[v-1];

		for(let i=0;i<children.length;i++){
			if(i<v){
				children[i].visible = true;
				children[i].set(pos[i]);
			}else{
				children[i].visible = false;
			}
		}

		p.freshObj(cubenumber,n);
	}

	p.freshObj = function(cubenumber,n){
		n = n||1;
		let children = cubenumber.objContainer.children;
		for(let i=0;i<children.length;i++){
			children[i].gotoAndStop('obj'+n);
			children[i].regX = children[i].getBounds().width/2;
			children[i].regY = children[i].getBounds().height/2;		
		}
	}

	father.quiz10 = p;
})();