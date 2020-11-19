let url;
if (process.argv.length === 2) {
  url = 'https://github.com/junkawa/figma_jp';
} else {
  url = process.argv[2];
}

const linkPreviewPlugin = require('../src/index');
const md = require('markdown-it')().use(linkPreviewPlugin);
const result = md.render('[@preview](' + url + ')');
console.log(result);
