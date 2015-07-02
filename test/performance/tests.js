//add test compatibility for phantomic ES6
import polys from 'babel/polyfill';

//import all tests
import addCSSRule from './tests/addCSSRule';

import Perf from './lib/Perf';
import Cases from './cases';
import {
	times, runs
}
from './config';

/*
 * Helper that runs tests with different cases 
 * @param {Function} func - function which will be executed
 * @param {Array} args - all needed arguments to execute func correctly
 * @param {Set} cases - a set of test cases
 */
function run(func, args, cases) {
	Perf.out("## " + func.name + " (" + cases.size + " cases)");
	let values;
	for (values of cases.values()) {
		Perf.out("#" + values);
		args.push(values);
		func(...args);
		args.pop(values);
		Perf.out();
	}
}

Perf.out("###### TESTS STARTED ######");

let values;
for (values of times.values()) {
	Perf.out("---- Times=" + values + ", Runs=" + runs + " ----", true)

	/**
	 * tests difference ways to add css styles to your document
	 */
	run(addCSSRule, [values, runs], Cases.addCSSRule);
	Perf.outGap();
}