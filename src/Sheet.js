import DOMInterface from '../interface/DOMInterface';
import * as Util from '../interface/Util';

/**
 * DynamicStyleSheet is a class to handle and modify StyleSheets
 */
export default class Sheet {
	/*
	 * @param {Map} selectors - A map of selectors pointing to a map of style properties and values
	 * @param {String} id - Id which refers your stylesheet within your document
	 */
	constructor(selectors, id = DOMInterface.getStyleSheetCount()) {
		this.id = id;
		this.selectors = selectors;
		this.active = false;
		this.registered = false;
	}

	/**
	 * Adds a map of style properties and values to a selector
	 * @param {String} selector - selector that gets styles added
	 * @param {Map} rules - key value map of style properties and values
	 * @param {Boolean} overwrite - overwrite existing properties
	 */
	add(selector, rules, overwrite) {
		if(this.selectors.has(selector)) {
			let base = this.selectors.get(selector);
			let extended = Util.extendMap(base, rules, overwrite);
			this.selectors.set(selector, extended);
		} else {
			this.selectors.set(selector, rules);
		}
	}

	/**
	 * Modifies selectors CSS style rules
	 * @param {String} selector - selector that gets styles added
	 * @param {Map} rules - key value map of style properties and values
	 */
	modify(selector, rules) {
		this.add(selector, rules, true);
	}

	/**
	 * Modifies a specific property
	 * @param {String} selector - selector that gets styles added
	 * @param {String} property - Property which will be modified
	 * @param {String} value - New value for property
	 */
	modifyRule(selector, property, value) {
		this.selectors.get(selector).set(property, value);
	}

	/**
	 *	Replaces a selectosr CSS rules
	 * @param {String} selector - selector that gets styles added
	 * @param {Map} rules - key value map of style properties and values
	 */
	replace(selector, rules) {
		this.selectors.set(selector, rules);
	}

	/**
	 * Removes a selector
	 * @param {String} selector - selector that gets deleted
	 */
	remove(selector) {
		this.selectors.delete(selector);
	}

	/**
	 * Removes a set of properties from a selector
	 * @param {String} selector - selector to that gets properties removed
	 * @param {Array} properties - set of properties that get removed
	 */
	removeRule(selector, properties) {
		let i;
		let length = properties.length;
		let base = this.selectors.get(selector);

		if(!properties instanceof Array) {
			properties = [properties];
		}
		for(i = 0; i < length; ++i) {
			let current = properties[i];

			if(base.has(current)) {
				base.delete(current);
			}
		}
	}

	/**
	 * Removes all selectors
	 */
	removeAll() {
		this.selectors.clear();
	}

	/**
	 * Hands your sheet to the DOMInterface which applies the styles to your document
	 * NOTE: Also automatically updates the sheet to DOMInterface
	 */
	apply() {
		DOMInterface.register(this);

		DOMInterface.apply(this.id, this.active);
		this.active = true;
	}

	/**
	 * Updates your sheet reference within DOMInterface
	 */
	update() {
		DOMInterface.update(this);
	}

	/**
	 * Detaches your sheet form your document
	 * WARNING: Only use this if you are sure you will not need the styles anymore
	 * NOTE: Helps to improve the performance
	 */
	detach() {
		DOMInterface.detach(this.id);
		this.active = false;
	}

	/**
	 * Runs a processor to modify your stylesheet
	 * {Object} processor - a processor with a valid process() function
	 */
	process(processor) {
		if(processor.hasOwnProperty('process') && processor.process instanceof Function) {
			processor.process(this);
		}
	}

	/**
	 * Returns a map with selectors and a valid CSS String
	 * @param {Map} selector - a specific selector to be compiled
	 */
	compile(selector) {
		let compiledSheet = new Map();

		if(selector) {
			compiledSheet.set(selector, Util.cssifyMap(this.selectors.get(selector)));
		} else {
			for(let [sel, rules] of this.selectors) {
				compiledSheet.set(sel, Util.cssifyMap(rules));
			}
		}
		return compiledSheet;
	}

	/**
	 * Returns a concated valid CSS String
	 * @param {Map} selector - a special selector to cssify
	 */
	toCSS(selector) {
		let CSS = '';

		if(selector) {
			CSS = selector + '{' + Util.cssifyMap(this.selectors.get(selector)) + '}';
		} else {
			for(let [sel, rules] of this.selectors) {
				CSS += sel + '{' + Util.cssifyMap(rules) + '}';
			}
		}
		return CSS;
	}
}