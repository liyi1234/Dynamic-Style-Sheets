#Dynamic Style Sheets

> **Warning**: DSS is under heavy construction and some vast changes may be coming soon. Use on your own risk.

Dynamic Style Sheets (DSS) is a ES6 class module that let's you create custom StyleSheets and work with them. They are dynamic and let you **add/remove/modify** selectors.       
You can create any kind of StyleSheet with the full power of JavaScript and CSS combined. Meaning you're able to do anything e.g. Sass or Less does. You also have abilities to **process** your sheet or write your very own, since DSS is **extendable** and kind of **plugin-based**.     
While you edit your StyleSheet there's a totally new **layer** that interacts directly with your DOM but in the background. This Interface does all the tricky work such as **modifying** your `document.styleSheets` with **intelligent diffing** methods that are well-proven according several [performance tests](Research.md).



> This idea is somewhat similar to [VirtualCSS/MSS](https://github.com/VirtualCSS/planning) which Julian Viereck (aka [jviereck](https://github.com/jviereck)) nicely explained in his blog post about [Modularize CSS the React Way](https://medium.com/@jviereck/modularise-css-the-react-way-1e817b317b04).

### Benefit
* independent *(compatibel with any framework/library)*
* designed with performance & (re-)usability in mind
* modern (ES6 Modules)
* test proven
* browser compatible
* extendable / plugin-based

## Roadmap


- [x] Vision
- [ ] [Research](Research.md) (*Check for further information*)
- [x] Concept
- [ ] Tests (**in progress**)
- [x] Code Draft
- [ ] Implementation
- [ ] Publishing

# License
Dynamic Style Sheets is licensed under the [MIT License](http://opensource.org/licenses/MIT).     
Created with &hearts; by [@rofrischmann](http://rofrischmann.de)

# Collaborating
Feel free to add ideas, proposals or any useful link but try to be objective and prove anything you state with at least one test case and a short description on how and why this happens to be.    

Best way to do this is by just creating a new issue.
