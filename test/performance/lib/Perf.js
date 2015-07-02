let Timestamp;
try {
	Timestamp = performance;
} catch (e) {
	Timestamp = Date;
};


function roundDouble(number, digits) {
	var multiple = Math.pow(10, digits);
	var roundedNum = Math.round(number * multiple) / multiple;
	return roundedNum;
}

export default {
	test(func, args, times = 10000, count = 10, precision = 4) {
			let i, j, start, stop;
			let erg = 0;

			for (j = 0; j < count; ++j) {
				start = Timestamp.now();

				for (i = 0; i < times; ++i) {
					func(...args);
				}
				stop = Timestamp.now();
				erg += (stop - start);
			}
			let out = roundDouble((erg / count), precision);

			this.out(func.name + ' = ' + out + 'ms');
			return out;
		},
		out(text, lineGap) {
			text = text ? text : '';
			console.log(text);
			lineGap && console.log('');
		},
		outGap() {
			console.log();
			console.log();
			console.log();
		}
}