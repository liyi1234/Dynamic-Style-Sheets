import paramCase from 'param-case';

export let Diff = {
	CHANGED: 'change',
	ADDED: 'add',
	REMOVED: 'remove'
}

/**
 * Transform a String into param case
 * @param {String} string - String that gets transformed to param case
 */
export function toParamCase(string) {
	return (this.isPrefixedProperty(string) ? '-' : '') + paramCase(string);
}

/**
 * Mixes two maps and optionally overwrites existing values
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
 * Clones a Map
 * NOTE: This is much like Immutable.js behavoir
 * @param {Map} map - Map that get's cloned
 */
export function cloneMap(map, deep = true) {
	let clone = new Map();
	for (var [property, value] of map) {
		if (deep && value instanceof Map) {
			clone.set(property, this.cloneMap(value, true));
		} else {
			clone.set(property, value);
		}
	}
	return clone;
}

/**
 * Returns a single CSS rule string out of Map pairs
 * @param {Map} map - Map with CSS rules
 */
export function cssifyMap(map) {
	let rules = '';
	for (let [property, value] of map) {
		rules += this.toParamCase(property) + ':' + value + ';';
	}
	return rules;
}


/**
 * Diffs a map, applies changes and returns a Map of changes
 * @param {Map} base - basic map that gets overwritten
 * @param {Map} diff - map with new data
 */
export function diffMap(base, diff) {
	let changes = new Map();
	for (let [property, value] of base) {
		//if still existing
		if (diff.has(property)) {
			let newValue = diff.get(property);
			//if value changed
			if (newValue instanceof Map) {

				let change = this.diffMap(value, newValue);

				if (change.size > 0) {
					changes.set(property, this.Diff.CHANGED);
					changes.set('_' + property, change);
				}
			} else {
				if (newValue !== value) {
					base.set(property, newValue);
					changes.set(property, this.Diff.CHANGED);
				}
			}
		} else {
			base.delete(property);
			changes.set(property, this.Diff.REMOVED);
		}
	}
	for (let [property, value] of diff) {
		if (!base.has(property)) {
			if (value instanceof Map) {
				base.set(property, this.cloneMap(value));
			} else {
				base.set(property, value);
			}
			changes.set(property, this.Diff.ADDED);
		}
	}
	return changes;
}

/**
 * Checks if a property is vendor prefixed
 * @param {String} property - Property that get's checked
 */
export function isPrefixedProperty(property) {
	return property.indexOf("Webkit") == 0 ||  property.indexOf("Moz") == 0 || property.indexOf("ms") == 0;
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