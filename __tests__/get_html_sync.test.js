// workaround for "Encoding not recognized: 'UTF-8' (searched as: 'utf8')"
require('../node_modules/iconv-lite').encodingExists('foo');

const getHtmlSync = require('../src/get_html_sync');

beforeEach(() => {});
afterEach(() => {});

it('throw on invalid url', () => {
  expect(() => {
    getHtmlSync('https://github.com/junkawa/figma_jpa');
  }).toThrow();
});

it('success on redirect url', () => {
  expect(() => {
    getHtmlSync('https://github.com/defunkt/hub');
  }).not.toThrow();
});
