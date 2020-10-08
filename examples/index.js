const linkPreviewPlugin = require('../src/index');
const md = require('markdown-it')().use(linkPreviewPlugin);
const result = md.render(
    '[@preview](https://github.com/junkawa/figma_jp)',
);
console.log(result);
