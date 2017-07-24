const fs = require('fs-extra');
const stylesInline = require('./index.js');

// load a local html as string
var html = fs.readFileSync( './test/index.html', {"encoding" : "utf-8"} );
// process it
var converted = stylesInline(html, './test');
// do whatever you want with it, for this example I'm saving it
fs.ensureDirSync('./dist');
fs.writeFileSync('./dist/index.html', converted);