import paramCase from 'paramCase';

export function toParamCase(string) {
	return paramCase(string);
}

/**
 *	Mixes two maps and optionally overwrites existing values
 * @param {Map} base - A base map which might get overwritten
 * @param {Map} extend - A map which will extend the base map
 * @param {Boolean} overwrite - overwrite existing properties
 */
export function extendMap(base, extend, overwrite) {
	let extended = base;

	if (overwrite) {
		for (var [property, value] of extend) {
			extended.set(property, value);
		}
	} else {
		for (var [property, value] of extend) {
			if (!base.has(property)) {
				extended.set(property, value);
			}
		}
	}
	return extended;
}
/**
 *	Applies selectors to a style DOMElement
 * NOTE: This is the clean way and creates a text node for every selector
 * @param {Object} DOMElement - Style tag that gets all the selectors applied
 * @param {Map} selectors - selectors that get applied
 * @param {Set} appliedSelectors - a set that memorizes applied selectors
 */
export function apply(DOMElement, selectors, appliedSelectors) {
	for (var [property, value] of selectors) {
		appliedSelectors.set(property);

		let CSS = property + '{' + value + '}';
		let node = document.createTextNode(CSS);
		DOMElement.appendChild(node);
	}

	return DOMElement;
}

/**
 *	Applies selectors to a style DOMElement (dirtymode)
 * NOTE: Creates only one text node with a CSS String within
 * @param {Object} DOMElement - Style tag that gets all the selectors applied
 * @param {Map} stylesheet - stylesheet thats selectors get applied
 * @param {Set} appliedSelectors - a set that memorizes applied selectors
 */
export function applyDirty(DOMElement, stylesheet, appliedSelectors) {
	let CSS = stylesheet.toCSS(stylesheet.selectors);

	let node = document.createTextNode(CSS);
	DOMElement.appendChild(node);

	return DOMElement;
}