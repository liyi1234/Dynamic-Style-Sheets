import * as Util from './Util';

/**
 * Sheet is a class to handle and modify StyleSheets
 */
export default class Sheet {
	/*
	 * @param {Object} selectors - A map of selectors pointing to a map of style properties and values
	 * @param {string} media - specifies a special media query
	 * @param {string} id - Id which refers your stylesheet within your document
	 */
	constructor(selectors) {
		this.selectors = selectors;
	}

	/**
	 * Adds a set of selectors to the sheet
	 * @param {Object} selectors - set of selectors that get added
	 * @param {boolean} overwrite - overwrite existing properties
	 */
	add(selectors, overwrite = false) {
		let selector;
		for (selector in selectors) {
			this.addSelector(selector, selectors[selector], overwrite);
		}
	}

	/**
	 * Adds a selector or extends a given one
	 * @param {string} selector - selector that gets added
	 * @param {Object} rules - key value map of style properties and values
	 * @param {boolean} overwrite - overwrite existing properties
	 */
	addSelector(selector, rules, overwrite = false) {
		if (this.selectors.hasOwnProperty(selector)) {
			let base = this.selectors[selector];
			let extended = Util.extendObject(base, rules, overwrite);
			this.selectors[selector] = extended;
		} else {
			this.selectors[selector] = rules;
		}
	}

	/**
	 * Adds a rule as property, value to a selector
	 * @param {string} selector - selector that gets styles added
	 * @param {string} property - property that gets added
	 * @param {number} value -  value that gets added
	 * @param {boolean} overwrite - overwrite existing properties
	 */
	addRule(selector, property, value, overwrite = false) {
		if (this.selectors.hasOwnProperty(selector)) {
			let current = this.selectors[selector];

			if (current.hasOwnProperty(property)) {
				if (overwrite) {
					current[property] = value;
				}
			} else {
				current[property] = value;
			}
		}
	}

	/**
	 * Removes a set of selectors
	 * @param {Array} selectors - an array of selectors
	 */
	remove(selectors) {
			let i;
			let length = selectors.length;

			for (i = 0; i < length; ++i) {
				delete this.selectors[selectors[i]];
			}
		}
		/**
		 * Removes a selector
		 * @param {string} selector - selector that gets deleted
		 */
	removeSelector(selector) {
		delete this.selectors[selector];
	}

	/**
	 * Removes a set of properties from a selector
	 * @param {string} selector - selector to that gets properties removed
	 * @param {string} property - property that gets removed
	 */
	removeRule(selector, property) {
			delete this.selectors[selector][property];
		}
		/**
		 * Removes a set of properties from a selector
		 * @param {string} selector - selector to that gets properties removed
		 * @param {string[]} properties - set of properties that get removed
		 */
	removeRules(selector, properties) {
		let base = this.selectors[selector];

		if (properties instanceof Array == false) {
			properties = [properties];
		}

		let i;
		let length = properties.length;
		for (i = 0; i < length; ++i) {
			let current = properties[i];

			if (base.hasOwnProperty(current)) {
				delete base[current];
			}
		}
	}

	/**
	 * Removes all selectors
	 */
	removeAll() {
		this.selectors = {};
	}

	/**
	 * Modifies a set of selectors
	 * @param {String} selectors - selector that gets styles added
	 */
	modify(selectors) {
		this.add(selectors, true);
	}

	/**
	 * Modifies selectors style rules
	 * @param {string} selector - selector that gets styles added
	 * @param {Object} rules - key value map of style properties and values
	 */
	modifySelector(selector, rules) {
		this.addSelector(selector, rules, true);
	}

	/**
	 * Modifies a specific property
	 * @param {string} selector - selector that gets styles added
	 * @param {string} property - Property which will be modified
	 * @param {string} value - New value for property
	 */
	modifyRule(selector, property, value) {
		this.selectors[selector][property] = value;
	}

	/**
	 *	Replaces a set of selectors
	 * @param {Object} selectors - selectors that get replaced
	 */
	replace(selectors) {
		let selector;
		for (selector in selectors) {
			this.selectors[selector] = selectors[selector];
		}
	}

	/**
	 *	Replaces a selectors rules
	 * @param {string} selector - selector that gets replaced
	 * @param {Object} rules - key value map of style properties and values
	 */
	replaceSelector(selector, rules) {
		this.selectors[selector] = rules;
	}

	/**
	 * Runs processor(s) to modify your stylesheet
	 * {Object} processor(s) - processor(s) with a valid process() function
	 * {any[]} args - any arguments you need to pass to a processor
	 */
	process(processors, ...args) {
		var checkProcessor = function (processor, ...args) {
			if (processor.hasOwnProperty('process') && processor.process instanceof Function) {
				processor.process(...args);
			}
		}

		args.unshift(this.selectors);

		if (processors instanceof Array === false) {
			checkProcessor(processors, ...args);
		} else {
			processors.forEach(item => {
				checkProcessor(item, ...args);
			});
		}
	}

	/**
	 * Returns all selectors
	 */
	getSelectors() {
		return this.selectors;
	}
}