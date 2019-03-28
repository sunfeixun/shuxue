(function() {
	let father = projectData.courseInterface;
	let p = new father.part(5);

	let str1 = '学习重点：\n本课着重培养了幼儿的空间方位的认知，增强了明\n确的方位词，通过直观感受，让幼儿得到空间方位\n的认知。';
	let str2 = '延伸练习：\n完成练习册第5页：第一题。\n第6页：第三题、第四题。';
	new father.part5Text(str1,str2).addTo(p);
})();