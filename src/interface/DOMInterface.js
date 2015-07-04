import * as Util from './Util';

let globalSheets = new Map();

let head = document.head || document.getElementsByTagName('head')[0];
let idPrefix = 'DynamicStyleSheet-';

export default {
	/**
	 * Registers a new stylsheet
	 * @param {Sheet} stylesheet - dynamic style sheet that gets registered to your DOM
	 */
	register(stylesheet) {
			if (!stylesheet.isRegistered()) {
				let id = stylesheet.id;


				globalSheets.set(id, Util.cloneMap(stylesheet.selectors));

				let style = document.createElement('style');
				style.type = 'text/css';
				style.id = idPrefix + id;

				stylesheet.DOM = style;
				stylesheet.registered = true;
			}
		},

		/**
		 * Updates the local stylesheet information
		 * @param {Sheet} stylesheet - stylesheet you want to update
		 */
		update(stylesheet) {
			if (stylesheet.isActive()) {
				let oldSheet = globalSheets.get(stylesheet.id);

				let changes = Util.diffMap(oldSheet, stylesheet.selectors);
				
				this.applyChangesToDOM(stylesheet, changes);
			} else {
				throw "You can't update an unapplied stylesheet. Apply first using .apply()";
			}
		},

		/**
		 * Applies StyleSheet to the DOM
		 * @param {Sheet} stylesheet - stylesheet you want to update
		 */
		apply(stylesheet) {
			let style = stylesheet.DOM;

			if (!stylesheet.isActive()) {
				this.applyToDOM(style, stylesheet.compile());
				head.appendChild(style);

				stylesheet.sheet = style.sheet ? style.sheet : style.styleSheet;
			} else {
				throw "StyleSheet has already been applied. Use the .update() function instead or .detach() first";
			}
		},

		/**
		 * Applies StyleSheet selectors to the DOM
		 * @param {Object} DOMElement - Style tag that gets all the selectors applied
		 * @param {Map} selectors - selectors that get applied
		 */
		applyToDOM(DOMElement, selectors) {
			let CSS = '';

			for (let [property, rules] of selectors) {
				CSS += property + '{' + rules + '}';
			}
			let node = document.createTextNode(CSS);
			DOMElement.appendChild(node);

			return DOMElement;
		},

		/**
		 * Applies StyleSheet changes to the DOM
		 * @param {Sheet} sheet - Sheet that gets the changes applied
		 * @param {changes} Map - Changes map as output of StyleSheet diffing
		 */
		applyChangesToDOM(stylesheet, changes, index) {
			let sheet = stylesheet.sheet;
			let selectors = stylesheet.selectors;

			for (let [property, state] of changes) {
				if (index == undefined) {
					//selectors
					if (state == Util.Diff.ADDED) {
						//TODO: add browser support later
						sheet.insertRule(stylesheet.toCSS(property));
					} else if (state == Util.Diff.REMOVED) {
						sheet.deleteRule(Util.getCSSRuleIndex(sheet.cssRules, property));
					} else if (state == Util.Diff.CHANGED) {
						let CSSRuleIndex = Util.getCSSRuleIndex(sheet.cssRules, property);
						let propertyChanges = changes.get('_' + property);

						this.applyChangesToDOM(stylesheet, propertyChanges, CSSRuleIndex);
					}
				} else {
					//propertie
					if (state == Util.Diff.ADDED || state == Util.Diff.CHANGED) {
						sheet.cssRules[index].style.setProperty(Util.toParamCase(property), state);
					} else if (state == Util.Diff.REMOVED) {
						sheet.cssRules[index].style.removeProperty(Util.toParamCase(property));
					}
				}
			}
		},

		/**
		 * Detaches a stylesheet to the document
		 * @param {Object} stylesheet - StyleSheet that gets the changes applied
		 */
		detach(sheet) {
			head.removeChild(sheet.DOM);

			delete sheet.DOM;
			delete sheet.sheet;

			sheet.registered = false;
		},

		disable(sheet) {
			sheet.sheet.disabled = true;
			sheet.active = false;
		},

		enable(sheet) {
			sheet.sheet.disabled = false;
			sheet.active = false;
		},

		/**
		 * Returns stylesheet count
		 */
		getStyleSheetCount() {
			return globalSheets.size;
		}
}