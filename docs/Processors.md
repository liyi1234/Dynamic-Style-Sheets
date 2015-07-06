# Processors

Put simply, a processor is just a set of functions. You may compare it to a lightweight library or a toolchain with one relevant difference. In general it takes an object in and modifies if some conditions match. This is most likely to be your set of selectors.

###  A processor should always only have one main goal!

More specifically this means that only method that are relevant for reaching a this goal should be included/executed. They're only a means to an end.

## Usage
With processors you can do whatever you want. Popular and frequently used processors often tackle browser incompatibilities such as vendor prefixes or different naming.       
Probably the best known so far is  [Autoprefixer]([Autoprefixer](https://github.com/postcss/autoprefixer), a post-processor.

## Processors for DSS
It'd be possible to use any **pre-** as well as **post-processor** in combination with Dynamic Style Sheets, but to simplify and optimize this step we added process ability out of the box.

> Check out [HowTo: Create custom processors for DSS](Guides/CreateCustomProcessors.md) if you want to create your very own processor for DSS.

## Available Processors
Since DSS very young and new there are not many processors yet. *(more coming soon!)*     
Yet there are some core processors which we provide out of the box.

### Core
| Name | npm | Version | Description |
|------|-----| --------| ------------|
|[DSS-Prefixer](https://github.com/dynamicstylesheets/DSS-Prefixer)|`dss-prefixer`| 0.0.4 | Autoprefixer for Dynamic Style Sheets |
|[DSS-Flexbox](https://github.com/dynamicstylesheets/DSS-Flexbox)|`dss-flexbox`|0.0.6 | Flexbox support for all specifications

### Third-Party
-

