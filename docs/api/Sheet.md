# Sheet
Sheet is the module to work with. 

##constructor(styles)
It just takes in an object with selectors and style rules. e.g.
```javascript
let sheet = new Sheet({
	box : {
		color: 'blue',
		fontSize: 16
	},
	item : {
		backgroundColor: 'red',
		transition: '300ms all linear'
	}
})
```

# Methods
* [process](#processprocessor-args)
* 
* [add](#addselectors--overwrite--false)
* [addSelector](#addselectorselector--overwrite--false)
* [addRule](#addruleselector-property-value--overwrite--false)
* 
* [remove](#removeselectors)
* [removeSelector](#removeselectorselector)
* [removeRule](#removeruleselector-rule)
* [removeRules](#removerulesselector-rules)
* [removeAll](#removeall)
* 
* [modify](#modifyselector)
* [modifySelector](#modifyselectorselector-rules)
* [modifyRule](#modifyselector-property-value)
* 
* [replace](#replaceselectors)
* [replaceSelector](#replaceselector-rules)

# `process(processor, [...args])`
Runs a `processor` with an array of `args`. 
> First argument is **always** Sheet `selectors`.

# add
### `add(selectors [, overwrite = false])`
Adds a map of `selectors` and overwrites existing if `overwrite`.

### `addSelector(selector [, overwrite = false])`
Adds a single`selector` and overwrites existing properties if `overwrite`.

### `addRule(selector, property, value [, overwrite = false])`
Adds a `property`-`value` pair to a `selector` and overwrites existing value if `overwrite`.

### `addRule(selector, rules [, overwrite = false])`
Adds an aray of `rules` pair to a `selector` and overwrites existing rules if `overwrite`.

# remove
### `remove(selectors)`
Removes an array of `selectors` by name.

### `removeSelector(selector)`
Removes a single `selector`.

### `.removeRule(selector, rule)`
Removes a single `rule` by name from a `selector`.

### `removeRules(selector, rules)`
Removes an array of `rules` by name from a `selector`.

### `removeAll()`
Removes all selectors.

# modify
### `modify(selector)`
Modifies a map of `selectors`.

> Possible duplicate: `add(selectors, true)`

### `modifySelector(selector, rules)`
Modifies a map of `rules` of a `selector`.

> Possible dublicate: `addSelector(selector, rules, true)`

### `modifyRule(selector, property, value)`
Modifies a `selectors` `property` with a new `value`.

> Possible dublicate: `addRule(selector, property, value, true)`

# replace
### `replace(selectors)`
Replaces a map of `selectors`.

### `replaceSelector(selector, rules)`
Replaces a map of `rules` of a `selector`.

