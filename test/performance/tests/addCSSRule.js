import Perf from '../lib/Perf';


function add(sheet, css, i) {
	sheet.addRule('.c' + i, css);
}

function insert(sheet, css, i) {
	sheet.insertRule('.c' + i + '{' + css + '}');
}

function append(style, css, i) {
	style += '.c' + i + '{' + css + '}';
}


function addRule(css, times) {
	let style = document.createElement("style");
	document.head.appendChild(style);
	let sheet = style.sheet ? style.sheet : style.styleSheet;

	for (let i = 0; i < times; ++i) {
		add(sheet, css, i)
	}
	document.head.removeChild(style);
}

function insertRule(css, times) {
	let style = document.createElement("style");
	document.head.appendChild(style);
	let sheet = style.sheet ? style.sheet : style.styleSheet;

	for (let i = 0; i < times; ++i) {
		insert(sheet, css, i)
	}
	document.head.removeChild(style);
}

function appendStyle(css, times) {
	let style = document.createElement("style");
	let CSS = '';

	for (let i = 0; i < times; ++i) {
		append(CSS, css, i);
	}
	style.appendChild(document.createTextNode(CSS));
	document.head.appendChild(style);
	document.head.removeChild(style);
}



export default function addCSSRule(times, runs, css) {
	let style = document.createElement("style");
	document.head.appendChild(style);
	let sheet = style.sheet ? style.sheet : style.styleSheet;

	if (sheet.addRule) {
		Perf.test(addRule, [css, times], 1, runs);
	} else {
		console.warn("addRule function not supported by browser");
	}

	if (sheet.insertRule) {
		Perf.test(insertRule, [css, times], 1, runs);
	} else {
		console.warn("insertRule function not supported by browser");
	}

	Perf.test(appendStyle, [css, times], 1, runs);
}