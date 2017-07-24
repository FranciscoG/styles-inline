const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function cssToStyle(cssHref, $) {
  // read file as string  
  var css = fs.readFileSync(cssHref, { encoding: "utf-8"});
  $('head').append(`<style data-href="${cssHref}" type="text/css">\n${css}\n</style>`);
  return $;
}

module.exports = function(htmlString, dir) {
  var $ = cheerio.load(htmlString);
  dir = dir || "./";

  $('link').each(function(i,el){
    if (el.attribs.rel === "stylesheet") {
      $ = cssToStyle( path.resolve(dir, el.attribs.href), $);
      $('head').remove(el);
    }
  });

  return $.html();
}