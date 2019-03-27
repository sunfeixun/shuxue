QuizPool.addSplitStar = function(_parent){
	let img = QuizPool.loader.getImage('splitStar.png','center');
	img.x = 640;
	img.y = 600;
	_parent && _parent.addChild(img);
	return img;
}