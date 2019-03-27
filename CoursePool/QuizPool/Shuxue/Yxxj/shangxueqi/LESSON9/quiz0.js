(function() {
	let father = QuizPool;

	father.loader.add(['QUIZ9.json','QUIZ9.png'],father.quizPath);
	father.loader.add(['splitStar.png','splitStar.js','cubeNumber.js'],father.quizClass+'public/');
})();