// workaround for "Encoding not recognized: 'UTF-8' (searched as: 'utf8')"
require('../node_modules/iconv-lite').encodingExists('foo');

beforeEach(() => {
  jest.mock('jsdom', () => {
    const actualJsdom = jest.requireActual('jsdom');
    const {JSDOM} = actualJsdom;

    let mockHtml = '';
    function __setMockHtml(newMockHtml) {
      mockHtml = newMockHtml;
    }
    function fromURL(url) {
      return new JSDOM(mockHtml);
    }

    JSDOM.fromURL = jest.fn().mockImplementation(fromURL);
    return {
      ...actualJsdom,
      __setMockHtml: __setMockHtml,
    };
  });
});

afterEach(() => {
  jest.unmock('jsdom');
//  jest.resetModules();
});

it('get og:title,og:description,og:site_name,og:url,og:image', () => {
  /* eslint-disable max-len */
  const MOCK_HTML =
    '<!DOCTYPE html>' +
    '<html dir="ltr" lang="en-US">' +
    '<head>' +
    '<meta charset="utf-8" />' +
    '<title>Design, prototype, and view code in the right sidebar &ndash; Figma</title>' +
    '<meta name="description" content="Before you start Who can use this feature     Users on any team or plan.     Users with can edit access to a file can access all of the..." /><meta property="og:image" content="https://theme.zdassets.com/theme_assets/9325143/ec27c7adedf401a3bc21f3e389011dfad2caa67b.png" />' +
    '<meta property="og:image" content="https://theme.zdassets.com/theme_assets/9325143/ec27c7adedf401a3bc21f3e389011dfad2caa67b.png" />' +
    '<meta property="og:type" content="website" />' +
    '<meta property="og:site_name" content="Figma" />' +
    '<meta property="og:title" content="Design, prototype, and view code in the right sidebar" />' +
    '<meta property="og:description" content="Before you start" />' +
    '<meta property="og:url" content="http://help.figma.com/hc/en-us/articles/360039832014" />' +
    '</head>' +
    '</html>';
  /* eslint-enable max-len */
  require('jsdom').__setMockHtml(MOCK_HTML);

  const getOgData = require('../src/get_og_data');
  const ogData = getOgData('https://hoge');
  expect(ogData.title).toBe(
      'Design, prototype, and view code in the right sidebar',
  );
  expect(ogData.description).toBe('Before you start');
  expect(ogData.site_name).toBe('Figma');
  expect(ogData.image).toBe(
      'https://theme.zdassets.com/theme_assets/9325143/ec27c7adedf401a3bc21f3e389011dfad2caa67b.png',
  );
  expect(ogData.url).toBe(
      'http://help.figma.com/hc/en-us/articles/360039832014',
  );
});

it('get title,description,og:site_name,og:url,og:image', () => {
  /* eslint-disable max-len */
  const MOCK_HTML =
    '<!DOCTYPE html>' +
    '<html dir="ltr" lang="en-US">' +
    '<head>' +
    '<meta charset="utf-8" />' +
    '<title>Design, prototype, and view code in the right sidebar &ndash; Figma</title>' +
    '<meta name="description" content="Before you start Who can use this feature     Users on any team or plan.     Users with can edit access to a file can access all of the..." />' +
    '<meta property="og:image" content="https://theme.zdassets.com/theme_assets/9325143/ec27c7adedf401a3bc21f3e389011dfad2caa67b.png" />' +
    '<meta property="og:type" content="website" />' +
    '<meta property="og:site_name" content="Figma" />' +
    '<meta property="og:url" content="http://help.figma.com/hc/en-us/articles/360039832014" />' +
    '</head>' +
    '</html>';
  require('jsdom').__setMockHtml(MOCK_HTML);

  const getOgData = require('../src/get_og_data');
  const ogData = getOgData('https://hoge');
  expect(ogData.title).toBe(
      'Design, prototype, and view code in the right sidebar – Figma',
  );
  expect(ogData.description).toBe(
      'Before you start Who can use this feature     Users on any team or plan.     Users with can edit access to a file can access all of the...',
  );
  expect(ogData.site_name).toBe('Figma');
  expect(ogData.image).toBe(
      'https://theme.zdassets.com/theme_assets/9325143/ec27c7adedf401a3bc21f3e389011dfad2caa67b.png',
  );
  expect(ogData.url).toBe(
      'http://help.figma.com/hc/en-us/articles/360039832014',
  );
  /* eslint-enable max-len */
});

it('get description,url', () => {
  /* eslint-disable max-len */
  const MOCK_HTML =
    '<!DOCTYPE html>' +
    '<html dir="ltr" lang="en-US">' +
    '<head>' +
    '<meta charset="utf-8" />' +
    '<title>Design, prototype, and view code in the right sidebar &ndash; Figma</title>' +
    '<meta name="Description" content="Before you start Who can use this feature     Users on any team or plan.     Users with can edit access to a file can access all of the..." />' +
    '<meta property="og:image" content="https://theme.zdassets.com/theme_assets/9325143/ec27c7adedf401a3bc21f3e389011dfad2caa67b.png" />' +
    '<meta property="og:type" content="website" />' +
    '<meta property="og:site_name" content="Figma" />' +
    '</head>' +
    '</html>';
  require('jsdom').__setMockHtml(MOCK_HTML);

  const getOgData = require('../src/get_og_data');
  const ogData = getOgData('https://hoge');
  expect(ogData.description).toBe(
      'Before you start Who can use this feature     Users on any team or plan.     Users with can edit access to a file can access all of the...',
  );
  expect(ogData.url).toBe('https://hoge');
  /* eslint-enable max-len */
});

it.skip('error when invalid url', () => {
  jest.unmock('jsdom');
  const getOgData = require('../src/get_og_data');
  const ogData = getOgData('https://hoge');
  // const ogData = getOgData('https://www.youtube.com');
  expect(ogData).toBe('');
});
