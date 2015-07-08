# CSSSheet
CSSSheet is a more advanced extension of [Sheet](Sheet.md) and offers a nice set of DOM interaction methods which gives great possibility to manipulate your CSSStyleSheet during run-time without headtache.     
 
It diffs all your styles within JavaScript to achieve as little as possible DOM actions since we know those are highly inperformant. 

## `constructor(styles [, media = '', id = generated])`
Takes in a set of selectors just like a normal Sheet, but those need to be valid CSS selectors this time.    
You can also apply a `media` string to add a special media-behavoir. This is quite useful for `media-queries`.   
Also consider adding an id if you want to access your `<style>`-tag later. Not set it gets an generated id applied.
> **Note**: Automatically adds an id prefix to prevent id dublicates. Use `dynamic-style-sheet-ID` to address your tag.

```javascript
let sheet = new CSSSheet({
	'.box' : {
		color: 'blue',
		fontSize: 16
	},
	'.box:hover' : {
		color: 'red'
	},
	'.item' : {
		backgroundColor: 'red',
		transition: '300ms all linear'
	}
}, '(min-height: 800px)')
```

# Methods
* [apply](#apply)
* [update](#update)
* [detach](#detach)
* [enable](#enable)
* [disable](#disable)    


* [compile](#compile-selector)
* [toCSS](#tocss-selector)
* [isActive](#isactive)
* [isRegistered](#isregistered)

# DOM Interaction
## `apply()`
Applies your Sheet to the document. 
> You can only call this **once!** use update afterwards.

## `update()`
Updates your applied styles by diffing changes to achieve as much performance as possible. 
> **Note**: Still avoid calling this too often and better do every modification before (even before `apply`) if possible.

## `detach()`
Detaches your sheet from the document. This completely removes your StyleSheet from the DOM to improve performance.
> **Warning**: Only use this if you are sure to not need it later again. If so check `disable`.

## `enable()`
(Re-)Actives your StyleSheet to activate selector matching.

## `disable()`
Disables your StyleSheet. Selectors won't match (better performance), but it remains applied to your document. Use `enable` to reactivate.
 
# Other
## `compile([selector])`
Generates valid CSS strings for each selector or if `selector` is set, for a single selector with the following pattern. `{selector : CSS, ...}`.

## `toCSS([selector])`
Generates a single valid CSS string of your sheet or if `selector` is set of a single selector with the following pattern. `selector : {CSS} ...`

## `isActive()`
Checks if your Sheet actually is **not** disabled.

## `isRegistered()`
Checks if your Sheet has already been applied to your document.