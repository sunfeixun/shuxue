(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);
	let button, twoButton;
	let limit = 4;
	const timeline = new TimelineLite();

	p.go = function() {
		let txt = new father.text('',50).set({x:650,y:240,textAlign:'center',textBaseline:'middle'}), _txt;
		let texts = ['你能说出这些图形的名字吗？','你会摆出新的造型吗？','这些图形可以单独立起来吗？'];
		let duration = 0.4;

		let timelinetext = new father.timelineText(texts);
		twoButton = new createjs.Container;
		timelinetext.otherButton(2,twoButton);


		button = new createjs.Container().set({x:640,y:480});

		button.addChild(
			new createjs.Shape(new createjs.Graphics().f('#3399FF').rr(-110,-50,220,100,49)),
			new father.text('确 定',50,'white').set({textAlign:'center',textBaseline:'middle'})
			);

		p.addChild(button);

		
		
		
		twoButton.addChild(button.clone(true),button.clone(true));

		twoButton.getChildAt(0).x -= 150;
		twoButton.getChildAt(0).set({mouseChildren:false,correct:true});
		twoButton.getChildAt(0).getChildAt(1).text = '不可以';

		twoButton.getChildAt(1).x += 150;
		twoButton.getChildAt(1).getChildAt(1).text = '可 以';

		twoButton.tween = TweenLite.from(twoButton,duration,{alpha:0}).pause();

		p.addChild(twoButton).cursor = 'pointer';
		twoButton.on('click',clickTwoButton);

		for(let i=0;i<texts.length;i++){
			if(_txt){
				timeline.to(_txt,duration,{alpha:0});
			}

			_txt = txt.clone().set({text:texts[i]});
			p.addChild(_txt);
			timeline.from(_txt,duration,{alpha:0}).call(showbtn,[i],this,'-='+duration.toString()).addPause();
		}

		button.tween = TweenLite.from(button,duration,{alpha:0}).pause();

		button.cursor = 'pointer';
		button.on('click',onclick);

		delete p.go;
	}

	function onclick(e) {
		if(e.currentTarget.tween.isActive()) return;

		limit --;
		if(limit===0){
			button.visible = false;
			father.playFire();
		}else{
			timeline.play();
			button.tween.seek(0).pause();			
		}
	}

	function showbtn(id) {
		id<2? button.tween.restart():twoButton.tween.restart();
	}

	function clickTwoButton(e) {
		if(e.currentTarget.tween.isActive()) return;

		if(e.target.correct){
			twoButton.visible = false;
			father.playFire();
		}else{
			father.preferSound('wrong');
		}
	}
})();