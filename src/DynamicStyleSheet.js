import DOMInterface from './DOMInterface';
import * as Util from './util/Util';

/**
 *	Creates a new DynamicStyleSheet
 * NOTE: Also registers automatically to the DOMInterface
 * @param {Map} selectors - A map of selectors pointing to a map of style properties and values
 * @param {String} id - Id which refers your stylesheet within your document
 */
export default class DynamicStyleSheet {
	constructor(selectors, id) {
		this.id = id;
		this.selectors = selectors;
		this.active = false;

		DOMInterface.register(this);
	}

	/**
	 *	Adds a map of style properties and values to a selector
	 * @param {String} selector - selector that gets styles added
	 * @param {Map} styles - key value map of style properties and values
	 * @param {Boolean} overwrite - overwrite existing properties
	 */
	add(selector, styles, overwrite) {
		let base = this.selectors.get(selector);

		let extended = Util.extendMap(base, styles, overwrite);
		this.selectors.set(selector, extended);
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
	 * WARNING: Only apply dirty if you do not want to edit your stylesheet afterwards
	 * @param {Boolean} dirty - applying dirty is much more performant but complicates editing later 
	 */
	apply(dirty) {
		this.update();

		DOMInterface.apply(this.id, dirty);
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
		for (let [selector, styles] of sheet) {
			let selectorStyles = '';

			for (let [property, value] of styles) {
				selectorStyles && (selectorStyles += ';');
				selectorStyles += Util.toParamCase(property) + ':' + value;
			}
			compiledSheet.set(selector, selectorStyles);
		}
		return compiledSheet;
	}

	/**
	 *	Returns a concated valid CSS String
	 */
	toCSS(compiledSheet = this.compile()) {

		let CSS = '';

		for (let [selector, styles] of compiledSheet) {
			CSS += selector + '{' + styles + '}';
		}
		return CSS;
	}
}