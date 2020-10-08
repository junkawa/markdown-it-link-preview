const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const deasyncPromise = require('deasync-promise');

function getOgData(url) {
  try {
    const dom = deasyncPromise(JSDOM.fromURL(url));
    // console.log(dom.serialize());
    const doc = dom.window.document;
    const ogData = {};

    // title
    const title = doc.querySelector('title')?.textContent;
    const titleMeta = doc.querySelector('meta[property="og:title"]')?.content;
    ogData.title = titleMeta ? titleMeta : title;

    // description
    let desc = doc.querySelector('meta[name="description"]')?.content;
    desc = desc ?
      desc :
      doc.querySelector('meta[name="Description"]')?.content;
    const descMeta = doc.querySelector('meta[property="og:description"]')
        ?.content;
    ogData.description = descMeta ? descMeta : desc;

    // image
    ogData.image = doc.querySelector('meta[property="og:image"]')?.content;

    // site_name
    ogData.site_name = doc.querySelector(
        'meta[property="og:site_name"]',
    )?.content;

    // url
    const urlMeta = doc.querySelector('meta[property="og:url"]')?.content;
    ogData.url = urlMeta ? urlMeta : url;

    return ogData;
  } catch (error) {
    console.log('Error:', error);
    return '';
  }
}

module.exports = getOgData;
