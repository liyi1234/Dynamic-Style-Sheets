let globalSheets = new Map();
let appliedSelectors = new Map();
let styleTags = new Map();

let idPrefix = 'DynamicStyleSheet-';
let head = document.head || document.getElementsByTagName('head')[0];

export default {
	/**
	 * Registers a new stylsheet
	 * @param {DynamicStyleSheet} stylesheet - dynamic style sheet that gets registered to your DOM
	 */
	register(stylesheet) {
			let id = stylesheet.id;
			let applied = new Set();

			globalSheets.set(id, stylesheet.compile());
			appliedSelectors.set(id, applied);

			/*
			 * Creates a new style tag
			 */
			if (!stylesheet.active) {
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
			//TODO: Diff changes and only apply, detach those

			/*globalSheets.set(stylesheet.id, stylesheet.compile());
			let selector;
			let applied = appliedSelectors.get(stylesheet.id);
			for (selector of applied.keys()) {
				if (!stylesheet.selectors.has(selector)) {
					applied.delete(selector);
				}
			}*/
		},

		/**
		 * Applies a stylesheet to the document
		 * @param {String} id - stylesheet id that gets applied
		 */
		apply(id, dirty) {
			let style = styleTags.get(id);
			let stylesheet = globalSheets.get(id);
			let applied = appliedSelectors.get(id);

			if (!stylesheet.active) {
				if (dirty) {
					style = Util.applyDirty(style, stylesheet, applied);
				} else {
					style = Util.apply(style, stylesheet.selectors, applied);
				}
				head.appendChild(style);
			}
		},

		/**
		 * Detaches a stylesheet to the document
		 * @param {String} id - stylesheet id that gets detached
		 */
		detach(id) {
			let applied = appliedSelectors.get(id);

			head.removeChild(document.getElementById(idPrefix + id));
			applied.clear();
		}
}