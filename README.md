# Styles Inline

A simple build tool that takes an external stylesheet referenced via a `<link>` tag and places the styles in an inlined `<style>` tag in the `<head>` of your file.

Not to be confused with [inline-css](https://www.npmjs.com/package/inline-css) which is a great tool take styles and inlines them to their target elements (like you would need for an HTML email for example).



## USAGE

```javascript
const fs = require('fs');
const stylesInline = require('styles-inline');

// load a local html as string
var html = fs.readFileSync( 'index.html', {"encoding" : "utf-8"} );

// process it
var converted = stylesInline(html);

// do whatever you want with it
fs.writeFileSync('./dist/index.html', converted);
```