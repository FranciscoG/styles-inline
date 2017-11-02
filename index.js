const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

/**
 * Loads a local CSS file and creates a <style> tag with its content
 * 
 * @param {string} cssHref the path to the local CSS file
 * @param {Object} linkEl the <link> element repres
 * @param {Object} $ updated Cheerio instance with new <style> tag
 */
function cssToStyle(cssHref, linkEl, $) {
  var css = fs.readFileSync(cssHref, { encoding: "utf-8"});
  
  var styleAttr = [
    `data-href="${cssHref}"`,
    'type="text/css"'
  ]
  if (linkEl.attribs.media) {
    styleAttr.push(`media="${linkEl.attribs.media}"`)
  }

  $('head').append(`<style ${styleAttr.join(' ')}>\n${css}\n</style>`);
  return $;
}

/**
 * Takes in a string of valid HTML, uses cheerio to parse it for all link tags
 * loads each link href and inlines the content inside a <style> tag in the <head>
 * 
 * @param {string} htmlString the valid html file as string
 * @param {string} dir optional - the cwd
 */
function stylesInline(htmlString, dir) {
  var $ = cheerio.load(htmlString);
  dir = dir || "./";

  $('link').each(function(i,el){
    if (el.attribs.rel === "stylesheet") {
      $ = cssToStyle( path.resolve(dir, el.attribs.href), el, $);
      $('head').remove(el);
    }
  });

  return $.html();
}

module.exports = stylesInline;