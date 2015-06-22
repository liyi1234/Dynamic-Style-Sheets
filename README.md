#Shadow-CSS

Shadow-CSS is the idea of having an additional layer between a web application and it's stylesheets which are in general defined by CSS files.

> Note: Those CSS files might be produced by some kind of pre-processed with e.g. Sass, Less & Stylus or post-processed as postcss, Autoprefixer or nextcss do it.
Keep in mind that this doesn't matter here as it is not the focus of this project. Check [Goals](#goals) for further information.

I am also not sure about the name yet. Shadow sounded quite fitting as this layer somehow acts hidden in the background. 

### Disclaimer
This idea is somewhat similar to [VirtualCSS/MSS](https://github.com/VirtualCSS/planning) which Julian Viereck (aka [jviereck](https://github.com/jviereck)) nicely explained in his blog post about [Modularize CSS the React Way](https://medium.com/@jviereck/modularise-css-the-react-way-1e817b317b04).

## Goal
The Goal is to have a global Layer which acts as some kind of interface between App and DOM and helps a developer to better handle his styles without thinking of adding/eliminating, minifying, et cetera. As an ideal use case I would not suggest to use Shadow CSS itself but more some library that builds upon Shadow CSS.

### Characteristics
* independent *(compatibel with any framework/library)*
* designed with performance, (re-)usability in mind
* readability eligible, but not aussumend *(since you should not use Shadow CSS itself)*
* well-documented
* always test proven (performance issues)
* browser compatible with all major browsers as well as older versions

## Roadmap
Right now I am heavily researching best practices, performance differences and general patterns. 
This will be documented within a seperated file as much precise as possible.
     
Read it for any further information.
### [Research](Research.md)

- [x] Vision
- [ ] Research
- [ ] Concept
- [ ] Tests
- [ ] Implementation
- [ ] Publishing

# License
Shadow CSS is licensed under the [MIT License](http://opensource.org/licenses/MIT).     
Created with &hearts; by [@rofrischmann](http://rofrischmann.de)

# Collaborating
Feel free to add ideas, proposals or any useful link but try to be objective and prove anything you state with at least one test case and a short description on how and why this happens to be.    

Best way to do this is by just creating a new issue.

