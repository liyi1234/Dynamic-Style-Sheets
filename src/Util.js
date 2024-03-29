import paramCase from 'param-case';
import objectAssign from 'object-assign';

export let Diff = {
	CHANGED: 'change',
	ADDED: 'add',
	REMOVED: 'remove'
}

/**
 * Mixes two maps and optionally overwrites existing values
 * @param {Object} base - A base map which might get overwritten
 * @param {Object} extend - A map which will extend the base map
 * @param {boolean} overwrite - overwrite existing properties
 */
export function extendObject(base, extend, overwrite = true) {
	let extended;
	if (overwrite) {
		extended = objectAssign({}, base, extend);
	} else {
		extended = objectAssign({}, extend, base);
	}
	return extended;
}

/**
 * Clones a Object
 * NOTE: This is much like Immutable.js behavoir
 * @param {Object} object - Object that get's cloned
 */
export function cloneObject(obj, deep = true) {
	let clone = {};
	let i;

	for (i in obj) {
		let temp = obj[i];
		if (temp instanceof Object) {
			clone[i] = this.cloneObject(temp, true);
		} else {
			clone[i] = temp;
		}
	}
	return clone;
}

/**
 * Diffs an object, applies changes and returns a Object of changes
 * @param {Object} base - basic map that gets overwritten
 * @param {Object} diff - map with new data
 */
export function diffObject(base, diff) {
	let changes = new Map();
	let property;

	for (property in base) {
		if (diff.hasOwnProperty(property)) {
			/*
			 * Property still exists
			 */
			let newValue = diff[property];
			if (newValue instanceof Object) {

				let change = this.diffObject(base[property], newValue);

				/*
				 * At least one values changed
				 */
				if (change.size > 0) {
					changes.set(property, this.Diff.CHANGED);
					changes.set('_' + property, change);
				}
			} else {
				if (newValue !== value) {
					base[property] = newValue;
					changes.set(property, this.Diff.CHANGED);
				}
			}
		} else {
			/*
			 * Value has been removed
			 */
			delete base[property];
			changes.set(property, this.Diff.REMOVED);
		}
	}

	/*
	 * Add up all new properties
	 */
	for (property in diff) {
		if (!base.hasOwnProperty(property)) {
			let temp = diff[property];

			if (temp instanceof Object) {
				base[property] = this.cloneObject(temp);
			} else {
				base[property] = temp;
			}
			changes.set(property, this.Diff.ADDED);
		}
	}
	return changes;
}

/**
 * Returns a single CSS rule string out of Object pairs
 * @param {Object} map - Object with CSS rules
 */
export function cssifyObject(obj) {
	let rules = '';
	let property;
	for (property in obj) {
		rules += this.toParamCase(property) + ':' + obj[property] + ';';
	}
	return rules;
}

/**
 * Checks if a property is vendor prefixed
 * @param {string} property - Property that get's checked
 */
export function isPrefixedProperty(property) {
	return property.indexOf("Webkit") == 0 ||  property.indexOf("Moz") == 0 || property.indexOf("ms") == 0;
}

/**
 * Returns the index of a selector within a CSSrules object
 */
export function getCSSRuleIndex(cssRules, selector) {
	return cssRules.findIndex(rule => rule.selectorText == selector);
}

/**
 * Transform a String into param case
 * @param {String} string - String that gets transformed to param case
 */
export function toParamCase(string) {
	return (this.isPrefixedProperty(string) ? '-' : '') + paramCase(string);
}