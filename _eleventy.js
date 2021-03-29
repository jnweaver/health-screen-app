const shortcodes = require('./src/shortcodes')
require('dotenv-flow').config()

module.exports = function(eleventyConfig) {

  // Shortcodes
  Object.keys(shortcodes).forEach(shortCodeName => {
    eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName])
  })

  // ETC.
  eleventyConfig
    .addPassthroughCopy('src/favicon.ico')
    .addPassthroughCopy('src/manifest.webmanifest')

  // minify the html output
  if (process.env.ELEVENTY_ENV == "production") {
    const htmlmin = require("html-minifier");
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      console.log(outputPath)
      if( outputPath && outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          collapseWhitespace: true
        });
        return minified;
      }
      return content;
    })
  }


  return {
    templateFormats: ['njk', 'md', 'html','webmanifest'],
    dir: {
      input: 'src/site',
      includes: '_templates',
      data: '_data',
      output: 'public',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
