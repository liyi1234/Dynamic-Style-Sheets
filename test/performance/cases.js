let addCSSRule = new Set();
addCSSRule.add('color: blue');
//addCSSRule.add('color: blue; background-color: red');
addCSSRule.add('color: blue; background-color: red; font-size: 15px');
//addCSSRule.add('color: blue; background-color: red; font-size: 15px; transition: 300ms all linear');

export default {
	addCSSRule: addCSSRule
}