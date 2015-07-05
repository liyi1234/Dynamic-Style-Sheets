import Interface from './interface/Interface';
import * as Util from './interface/Util';

let counter = 0;
/**
 * DynamicStyleSheet is a class to handle and modify StyleSheets
 */
export default class Sheet {
	/*
	 * @param {Object} selectors - A map of selectors pointing to a map of style properties and values
	 * @param {string} media - specifies a special media query
	 * @param {string} id - Id which refers your stylesheet within your document
	 */
	constructor(selectors, media = '', id = counter) {
		this.id = id;
		this.selectors = selectors;
		this.media = media;

		this.active = false;
		this.registered = false;
		++counter;
	}

	/**
	 * Adds a map of style properties and values to a selector
	 * @param {string} selector - selector that gets styles added
	 * @param {Object} rules - key value map of style properties and values
	 * @param {boolean} overwrite - overwrite existing properties
	 */
	add(selector, rules, overwrite = true) {
		if (this.selectors.hasOwnProperty(selector)) {
			let base = this.selectors[selector];
			let extended = Util.extendObject(base, rules, overwrite);
			this.selectors[selector] = extended;
		} else {
			this.selectors[selector] = rules;
		}
	}

	/**
	 * Modifies selectors CSS style rules
	 * @param {string} selector - selector that gets styles added
	 * @param {Object} rules - key value map of style properties and values
	 */
	modify(selector, rules) {
		this.add(selector, rules, true);
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
	 *	Replaces a selectosr CSS rules
	 * @param {string} selector - selector that gets styles added
	 * @param {Object} rules - key value map of style properties and values
	 */
	replace(selector, rules) {
		this.selectors[selector] = rules;
	}

	/**
	 * Removes a selector
	 * @param {string} selector - selector that gets deleted
	 */
	remove(selector) {
		delete this.selectors[selector];
	}

	/**
	 * Removes a set of properties from a selector
	 * @param {string} selector - selector to that gets properties removed
	 * @param {string[]} properties - set of properties that get removed
	 */
	removeRule(selector, properties) {
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
	 * Hands your sheet to the Interface which applies the styles to your document
	 * NOTE: Also automatically updates the sheet to Interface
	 */
	apply() {
		Interface.register(this);

		Interface.apply(this);
		this.active = true;
	}

	/**
	 * Updates your sheet reference within Interface
	 */
	update() {
		Interface.update(this);
	}

	/**
	 * Detaches your sheet form your document
	 * WARNING: Only use this if you are sure you will not need the styles anymore
	 * NOTE: Helps to improve the performance
	 */
	detach() {
		Interface.detach(this);
		this.active = false;
	}

	/**
	 * Enables the Sheet (selectors get active)
	 */
	enable() {
		Interface.enable(this);
	}

	/**
	 * Disables the Sheet (selectors get inactive)
	 */
	disable() {
		Interface.disable(this);
	}

	/**
	 * Runs a processor to modify your stylesheet
	 * {Object} processor - a processor with a valid process() function
	 * {strings[]} args - any arguments you need to pass to a processor
	 */
	process(processor, ...args) {
		args.unshift(this.selectors);
		if (processor.hasOwnProperty('process') && processor.process instanceof Function) {
			processor.process(...args);
		}
	}

	/**
	 * Returns a map with selectors and a valid CSS String
	 * @param {Object} selector - a specific selector to be compiled
	 */
	compile(selector) {
		let compiledSheet = {};

		if (selector) {
			compiledSheet[selector] = Util.cssifyObject(this.selectors[selector]);
		} else {
			let sel;
			for (sel in this.selectors) {
				compiledSheet[sel] = Util.cssifyObject(this.selectors[sel]);
			}
		}
		return compiledSheet;
	}

	/**
	 * Returns a concated valid CSS String
	 * @param {Object} selector - a special selector to cssify
	 */
	toCSS(selector) {
		let CSS = '';

		if (selector) {
			CSS = selector + '{' + Util.cssifyObject(this.selectors[selector]) + '}';
		} else {
			let sel;
			for (sel in this.selectors) {
				CSS += sel + '{' + Util.cssifyObject(this.selectors[sel]) + '}';
			}
		}
		return CSS;
	}

	/**
	 * Returns if the Sheet is active (not disabled)
	 */
	isActive() {
		return this.active;
	}

	/**
	 * Returns if the Sheet is registered (applied to DOM)
	 */
	isRegistered() {
		return this.registered;
	}
}