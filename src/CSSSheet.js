import Interface from './Interface';
import * as Util from './Util';
import Sheet from './Sheet';


let counter = 0;
/**
 * DynamicStyleSheet is a class to handle and modify StyleSheets
 */
export default class CSSSheet extends Sheet {
	/*
	 * @param {Object} selectors - A map of selectors pointing to a map of style properties and values
	 * @param {string} media - specifies a special media query
	 * @param {string} id - Id which refers your stylesheet within your document
	 */
	constructor(selectors, media = '', id = counter) {
		super(selectors);

		this.id = id;
		this.media = media;

		this.active = false;
		this.registered = false;
		++counter;
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