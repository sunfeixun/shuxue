(function() {
	let father = QuizPool;
	father.loader.add(['QUIZ1.png','QUIZ1.json'],father.quizPath);
	father.loader.add(['splitStar.png','splitStar.js','cubeNumber.js'],father.quizClass+'public/');
	father.loader.add(['lijie1','lijie2','lijie3','lijie4'],father.quizPath,'.mp3');
	father.Cube.setDefault({fillColor:'#9DC3E6',lineColor:'gray'});
})();