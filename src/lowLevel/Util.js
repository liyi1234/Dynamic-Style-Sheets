import paramCase from 'param-case';

let Diff = {
	CHANGED: 'change',
	ADDED: 'add',
	REMOVED: 'remove'
}

export function toParamCase(string) {
	return (this.isPrefixedProperty(string) ? '-' : '')) + paramCase(string);
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

export function cssifyMap(map) {
	let styles = '';

	for (let [property, value] of map) {
		styles && (styles += ';');
		styles += Util.toParamCase(property) + ':' + value;
	}
	return styles;
}

export function diffMap(base, diff) {
	let changes = new Map();

	for (let [property, value] of base) {
		//if still existing
		if (diff.has(property)) {
			let newValue = diff.get(property);

			//if value changed
			if (newValue instanceof Map) {
				changes.set(property, Diff.CHANGED);
				changes.set('_' + property, diffMap(value, newValue));
			} else {
				if (newValue !== value) {
					base.set(property, newValue);
					changes.set(property, Diff.CHANGED);
				}
			}
		} else {
			base.delete(property);
			changes.set(property, Diff.REMOVED);
		}
	}

	for (let [property, value] of diff) {
		if (!base.has(property)) {
			base.set(property, value);
			changes.set(property, Diff.ADDED);
		}
	}
	return changes;
}

/**
 *	Applies selectors to a style DOMElement
 * NOTE: Creates only one text node with a CSS String within
 * @param {Object} DOMElement - Style tag that gets all the selectors applied
 * @param {Map} selectors - selectors that get applied
 */
export function apply(DOMElement, selectors) {
	let CSS = '';

	for (let [property, styles] of selectors) {
		CSS += property + '{' + styles + '}';
	}
	let node = document.createTextNode(CSS);
	DOMElement.appendChild(node);

	return DOMElement;
}

export function getCSSRuleIndex(cssRules, selector) {
	let i;
	let length = cssRules.length;

	for (i = 0; i < length; ++i) {
		if (cssRules[i].selectorText == selector) {
			return i;
		}
	}
}

export function applyChanges(sheet, selectors, changes, index) {
	for (let [property, state] of changes) {
		if (!index) {
			//selectors
			if (state == this.Diff.ADDED) {
				let CSS = this.cssifyMap(selectors.get(property));
				//TODO: add browser support later
				sheet.insertRule(CSS);
			} else if (state == this.Diff.REMOVED) {
				sheet.deleteRule(this.getCSSRuleIndex(sheet.cssRules, property));
			} else if (state == this.Diff.CHANGED) {
				let CSSRuleIndex = this.getCSSRuleIndex(sheet.cssRules, property);
				let propertyChanges = changes.get('_' + property);
				this.applyChanges(sheet, property, propertyChanges, CSSRuleIndex);
			}
		} else {
			//properties
			if (state == this.Diff.ADDED || state == this.Diff.CHANGED) {
				sheet.cssRules[index].style.setProperty(this.toParamCase(property), state);
			} else if (state == this.Diff.REMOVED) {
				sheet.cssRules[index].style.removeProperty(this.toParamCase(property));
			}
		}
	}
}

export function isPrefixedProperty(property) {
	return property.indexOf("Webkit") == 0 ||  property.indexOf("Moz") == 0 || property.indexOf("ms") == 0;
}