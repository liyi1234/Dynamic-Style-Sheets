<img src="https://github.com/dynamicstylesheets/Dynamic-Style-Sheets/blob/develop/res/logo.png" width="200">

Dynamic Style Sheets (DSS) is an ES6 API that let's you create StyleSheets and work with them. Those ship with functionality to **add, remove, modify, replace, merge, compile** or **process selectors** and **rules**.
Using javascript allows you to add **variables**, **functions/mixins** and a lot more. This gives you enorm powers in comparision to vanilla CSS. 
#### Fine, so why don't just use Sass, Less or similar?
Because they're build to be dynamic and yet still remain static. ..Huh? You can do a lot of things with those tools but in the end there's a hard-coded CSS file which you won't touch during run-time at least if you're not some crazy geek.    
> **Note**: If you're doing that - respect!

### Disclaimer
> This idea somehow overlaps with [VirtualCSS/MSS](https://github.com/VirtualCSS/planning) (and was heavily inspired by) which Julian Viereck (aka [jviereck](https://github.com/jviereck)) nicely explained in his blog post about [Modularize CSS the React Way](https://medium.com/@jviereck/modularise-css-the-react-way-1e817b317b04).


# Benefit
* independent *(compatible with any framework/library)*
* designed with performance & (re-)usability in mind
* modern (ES6 Modules)
* hackable
* browser compatible
* extendable
* compatible with both CSS and inline styles

# Roadmap

- [x] **API Reference**
- [ ] [Performance Improvement > Research](docs/Research.md) (*Check for further information*)
- [ ] Documentation
- [ ] Core Processors & Tools

- [ ] Publishing  :tada:

# [Sheet](docs/api/Sheet.md) vs. [CSSSheet](docs/api/CSSSheet.md)
There are two options to use DSS. Either you take `Sheet` which is the lightweight variant without any DOM interaction ability or you go with `CSSSheet` which offers a nice set of DOM interaction methods to apply your CSS to your document.

Both files are well documented using JSDoc/ESDoc syntax, but if you still want a summed up version check out the [API reference](docs/api).

# Processors
Put simply, a processor is just a set of functions. You may compare it to a lightweight library or a toolchain with one relevant difference. In general it takes an object in and modifies if certain conditions are fulfilled. This is most likely to be your set of selectors.

## Usage
Processors are nothing new. They're widely used by Frontend-Developers all over the world. We are just bringing them to JavaScript directly, so you won't need to add yet another annoying build step.    

Using processors you will likely improve your workflow multiple times since you don't have to handle every versatile browser incompatibility or issue. 

## Processors for DSS
You can use a processor without DSS, but we've added a `process` hook to simplify that.

####Did you know creating your own is as easy as using one?
HowTo is coming soon.

## Available Processors
Since DSS is very young and new there are not many processors yet.    
*(more coming soon!)*     
Yet there are some core processors which we provide out of the box.

| Name | npm | Version | Description |
|------|-----| --------| ------------|
|[DSS-Prefixer](https://github.com/dynamicstylesheets/DSS-Prefixer)|`dss-prefixer`| 0.0.4 | Autoprefixer for Dynamic Style Sheets |
|[DSS-Flexbox](https://github.com/dynamicstylesheets/DSS-Flexbox)|`dss-flexbox`|0.0.6 | Flexbox support for all specifications |
|[DSS-Mixins](https://github.com/dynamicstylesheets/DSS-Mixins)|`dss-mixins`|0.0.3 | Custom property support 

# Docs 
* [Research](docs/Research.md)
* Workflow

### Guides
* Getting Started 
* [HowTo]: Create your own processor!
* [HowTo]: Build on top of DSS]
	    
						
### API 
* [Sheet](docs/api/Sheet.md)
* [CSSSheet](docs/api/Sheet.md)

# License
Dynamic Style Sheets is licensed under the [MIT License](http://opensource.org/licenses/MIT).     
Created with &hearts; by [@rofrischmann](http://rofrischmann.de)

# Collaborating
Feel free to suggest any processor, idea, proposal or useful link, but try to be objective and prove anything you state with at least one test case and a short description on how and why this happens to be.    

Best way to do this is by just creating a new issue.
