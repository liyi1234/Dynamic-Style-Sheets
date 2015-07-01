import DOMInterface from '../lowLevel/DOMInterface';
import * as Util from '../lowLevel/Util';

/**
 *	DynamicStyleSheet is a class to handle StyleSheets
 */
export default class DynamicStyleSheet {
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
	 *	Adds a map of style properties and values to a selector
	 * @param {String} selector - selector that gets styles added
	 * @param {Map} styles - key value map of style properties and values
	 * @param {Boolean} overwrite - overwrite existing properties
	 */
	add(selector, styles, overwrite) {
		if (this.selectors.has(selector)) {
			let base = this.selectors.get(selector);
			let extended = Util.extendMap(base, styles, overwrite);
			this.selectors.set(selector, extended);
		} else {
			this.selectors.set(selector, styles);
		}
	}

	/**
	 *	Removes a selector
	 * @param {String} selector - selector that gets deleted
	 */
	remove(selector) {
		this.selectors.delete(selector);
	}

	/**
	 *	Removes a set of properties from a selector
	 * @param {String} selector - selector to that gets properties removed
	 * @param {Array} properties - set of properties that get removed
	 */
	removeProperties(selector, properties) {
		let i;
		let length = properties.length;
		let base = this.selectors.get(selector);

		if (!properties instanceof Array) {
			properties = [properties];
		}
		for (i = 0; i < length; ++i) {
			let current = properties[i];

			if (base.has(current)) {
				base.delete(current);
			}
		}
	}

	/**
	 *	Removes all selectors
	 */
	removeAll() {
		this.selectors.clear();
	}

	/**
	 *	Hands your sheet to the DOMInterface which applies the styles to your document
	 * NOTE: Also automatically updates the sheet to DOMInterface
	 */
	apply() {
		DOMInterface.register(this);

		DOMInterface.apply(this.id, this.active);
		this.active = true;
	}

	/**
	 *	Updates your sheet reference within DOMInterface
	 */
	update() {
		DOMInterface.update(this);
	}

	/**
	 *	Detaches your sheet form your document
	 * WARNING: Only use this if you are sure you will not need the styles anymore
	 * NOTE: Helps to improve the performance
	 */
	detach() {
		DOMInterface.detach(this.id);
		this.active = false;
	}

	/**
	 *	Returns a map with selectors and a valid CSS String
	 */
	compile() {
			let compiledSheet = new Map();
			for (let [selector, styles] of this.selectors) {
				let selectorStyles = Util.cssifyMap(styles);
				compiledSheet.set(selector, selectorStyles);
			}
			return compiledSheet;
		}
		/**
		 * Runs a processor to modify your stylesheet
		 * {Object} processor - a processor with a valid process() function
		 */
	process(processor) {
		if (processor.hasOwnProperty('process') && processor.process instanceof Function) {
			processor.process(this);
		}
	}

	/**
	 *	Returns a concated valid CSS String
	 * @param {Map} compiledSheet - a compiled StyleSheet with selectors and their styles
	 */
	toCSS(compiledSheet = this.compile()) {

		let CSS = '';

		for (let [selector, styles] of compiledSheet) {
			CSS += selector + '{' + styles + '}';
		}
		return CSS;
	}
}