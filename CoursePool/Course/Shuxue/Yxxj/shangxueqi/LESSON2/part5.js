(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);
	let str1 = '学习重点：本单元学习数数，通过数数活动中，了\n解幼儿数数的水平以及对数数的基本方法的掌握情\n况，帮助幼儿初步了解计数物体个数的基本方法。\n在比较物品多少的活动中，了解幼儿对“同样多”\n“多”“少”及长短高矮等含义的理解以及对比较\n物体多少的基本方法的掌握情况，帮助幼儿体验一\n些具体的比较方法。';
	let str2 = '完成练习册第3页：第一题，第二题。第4页，第三题，第四题。';

	new father.part5Text(str1,str2).addTo(p).set({y:-30});
})();