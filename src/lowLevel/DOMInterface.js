import * as Util from './Util';

let globalSheets = new Map();
let styleTags = new Map();

let head = document.head || document.getElementsByTagName('head')[0];
let idPrefix = 'DynamicStyleSheet-';

export default {
	/**
	 * Registers a new stylsheet
	 * @param {DynamicStyleSheet} stylesheet - dynamic style sheet that gets registered to your DOM
	 */
	register(stylesheet) {
			if (!stylesheet.registered) {
				let id = stylesheet.id;
				globalSheets.set(id, stylesheet);

				let style = document.createElement('style');
				style.type = 'text/css';
				style.id = idPrefix + id;
				styleTags.set(id, style);
			}
		},

		/**
		 * Updates the local stylesheet information
		 * @param {DynamicStyleSheet} stylesheet - stylesheet you want to update
		 */
		update(stylesheet) {
			if (stylesheet.active) {
				let global = gobalSheets.get(stylesheet.id);
				
				let changes = Util.diffMap(global.selectors, stylesheet.selectors);
				
				let DOMElement = styleTags.get(id);
				let sheet = DOMElement.sheet ? DOMElement.sheet : DOMElement.styleSheet;
				Util.applyChanges(sheet, global.selectors, changes, selector);
			} else {
				throw "You can't update an unapplied stylesheet. Apply first using .apply()";
			}
		},

		/**
		 * Applies a stylesheet to the document
		 * @param {String} id - stylesheet id that gets applied
		 * @param {Boolean} active - activated state of stylesheet
		 */
		apply(id, active) {
			let style = styleTags.get(id);
			let stylesheet = globalSheets.get(id);

			if (!active) {
				style = Util.apply(style, stylesheet.compile());
				head.appendChild(style);
			} else {
				throw "StyleSheet has already been applied. Use the .update() function instead or .detach() first";
			}
		},

		/**
		 * Detaches a stylesheet to the document
		 * @param {String} id - stylesheet id that gets detached
		 */
		detach(id) {
			head.removeChild(document.getElementById(Util.idPrefix + id));
		},

		/**
		 * Returns stylesheet count
		 */
		getStyleSheetCount() {
			return globalSheets.size;
		}
}