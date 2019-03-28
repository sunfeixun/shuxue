(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);
	let str1 = '学习重点：\n本单元学习数数，通过数数活动中，了解幼儿数数\n的水平以及对数数的基本方法的掌握情况，帮助幼\n儿初步了解计数物体个数的基本方法，生活到处都\n有数学，数学对我们每个人都很重要。';
	let str2 = '延伸练习：\n完成练习册第1页：第一题，第二题。\n第2页，第三题，第四题，第五题。';
	
	new father.part5Text(str1,str2).set({y:-50}).addTo(p);

})();