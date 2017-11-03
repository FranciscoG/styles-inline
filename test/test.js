const fs = require('fs-extra');
const stylesInline = require('../index.js');
const chai = require('chai');
const expect = chai.expect;

const cwd = process.cwd();

// load a local html as string
var html = fs.readFileSync( cwd + '/test/fixtures/simple.html', {"encoding" : "utf-8"} );
var expectedHtml = fs.readFileSync( cwd + '/test/expected/simple.html', {"encoding" : "utf-8"} );

describe('Do all the tests', function(){
  
  it('sync test', function(done){
    var converted = stylesInline(html, cwd+'/test/fixtures');
    expect(converted.replace(/\n/g,'')).to.equal(expectedHtml.replace(/\n/g,''));
    done();
  });

});