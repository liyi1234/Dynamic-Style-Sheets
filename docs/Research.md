# Table of contents
* [Performance](#performance)
* [Efficiency](#efficiency)
* [Experimental](#experimental)

#Performance
Since working with StyleSheet is all about usability and performance there're a lot of cases that need to be tested in order to provide the fastest dynamic styling library.
> **Note**: These Tests and Research almost only concern [CSSSheets](api/CSSSheet.md) since those heavily interact with your DOM.

## Test Cases

- [x] [Adding a Sheet](#adding-a-sheet)
- [ ] Removing a Sheet
- [ ] [Handling selector changes](#applying-changes)

# Result
## Adding a Sheet
The most performant way to manually add a stylesheet is by creating a new `<style></style>`-tag which includes all your rules as a single CSS-valid string.

```javascript
let style = document.createElement('style');

let sheet = new CSSSheet({
  '.class1' : {
    color: 'blue'
  },
  '.class2' : {
    color: 'red'
  }
})

let CSS = sheet.toCSS();
style.appendChild(document.createTextNode(CSS));
document.head.appendChild(style)
```
This one is actually faster than `insertRule` & `addRule`.

## Handling selector changes
### Background
Since your browser most likely needs to rematch **ALL** selectors if you even only change one of those this first sounds not effective at all.     
But consider you're about the change a rule which affects e.g. 1000 list elements. It's far more performant to just manipulate that given CSS Rule within your `<style></style>`-tag than by adding/removing/editing the className of every single list elements since each is a adequate DOM manipulation which are known to be expensive in general.

### Detecting Changes
It seems to be a lot easier to just do some **String-Replacement**, but as we know that's kind of expensive at any time. Wheather or not a complicated **Map-Diffing** could push performance while applying changes should be found out.

### Applying Changes
#### Case: new selector
#### Case: selector removed
#### Case: selector changed

#Efficiency
> **Note**: This is probably more relevant for the user itself but I will still add it here as it might let people rethink their process of greating stylesheets.

###Links
* https://css-tricks.com/efficiently-rendering-css/
* http://csswizardry.com/2011/09/writing-efficient-css-selectors/

##Conclusion
* Do not link selectors which greats overqualified relations e.g. `body ul.list li a.active:hover`
* Try to only use **class** and **id** selectors which are defined by a preceding `.` or `#`
* Avoid using the **universal** `*` selector


# Experimental
Following are yet experimental and rather fictional than actually planned soon.

## Keeping a minimum selector count
####Assumption
> More selectors = less performance
    
####Detail   
Believing that with every rendering your browser needs to match through all your selectors, it sounds more than logic that more selectors automatically lead to more checks / selector matching thus more time to render which is equivalent to less performance.     

####Goal   
Eliminate all empty, unnecessary or unused styles from your DOM. The latter should be done dynamically at which you'd however need to be sure it won't be used anymore.     
Also some kind of inteligent clustering/grouping of styles could help to keep a stylesheet as simple as possible.    
> Note: This might only be wise while building for production since clustering/grouping is a non-trivial task and could cost more time than it actually saves. 
