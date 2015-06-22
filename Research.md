#Efficiency
This is probably more relevant for the user itself but I will still add it here as it might let people rethink their process of greating stylesheets.

###Links
* https://css-tricks.com/efficiently-rendering-css/
* http://csswizardry.com/2011/09/writing-efficient-css-selectors/

##Conclusion
* Do not link selectors which greats overqualified relations e.g. `body ul.list li a.active:hover`
* Try to only use **class** and **id** selectors which are defined by a preceding `.` or `#`
* Avoid using the **universal** `*` selector

#Performance
## Adding Styles with Javascript
The most performant way to manually add a stylesheet is by creating a new `<style></style>`-tag which includes all your rules as a single CSS-valid string.

```javascript
//creates a new <style></style>-tag
var style = document.createElement('style');

/*** GENERATE CSS HERE ***/

//adds the whole css rules to your styles tag
style.appendChild(document.createTextNode(CSS));

//applied it to your head which now start effecting your DOM
document.head.appendChild(style)
```

## Changing a CSS rule
Since your browser most likely needs to rematch **ALL** selectors if you even only change one of those this first sounds not effective at all.     But consider you're about the change a rule which affects e.g. 1000 list elements. It's far more performant to just manipulate that given CSS Rule within your `<style></style>`-tag than by adding/removing/editing the className of every single list elements since each is a adequate DOM manipulation which are known to be expensive in general.

## Keeping a minimum selector count
**Assumption:** More selectors = less performance
    
**Detail:**     
Believing that with every rendering your browser needs to match through all your selectors, it sounds more than logic that more selectors automatically lead to more checks / selector matching thus more time to render which is equivalent to less performance.     

**Goal:**    
Eliminate all empty, unnecessary or unused styles from your DOM. The latter should be done dynamically at which you'd however need to be sure it won't be used anymore.     
Also some kind of inteligent clustering/grouping of styles could help to keep a stylesheet as simple as possible.    
> Note: This might only be wise while building for production since clustering/grouping is a non-trivial task and could cost more time than it actually saves. 

## Test Cases
Since everyone could tell you anything all those statements above should be proven by test cases.    
I will add those later on.