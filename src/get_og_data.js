const jsdom = require('jsdom');
const {JSDOM} = jsdom;

function getOgData(url) {
  try {
    const dom = JSDOM.fromURL(url);
    // console.log(dom.serialize());
    const doc = dom.window.document;
    const ogData = {};

    // title
    const titleSelector = doc.querySelector('title');
    const title = titleSelector != null ? titleSelector.textContent : undefined;
    const titleMetaSelector = doc.querySelector('meta[property="og:title"]');
    const titleMeta = titleMetaSelector != null ?
      titleMetaSelector.content : undefined;
    // const title = doc.querySelector('title')?.textContent;
    // const titleMeta =
    //   doc.querySelector('meta[property="og:title"]')?.content;
    ogData.title = titleMeta ? titleMeta : title;

    // description
    const descSelector = doc.querySelector('meta[name="description"]');
    let desc = descSelector != null ? descSelector.content : undefined;
    const desc2Selector = doc.querySelector('meta[name="Description"]');
    const desc2 = desc2Selector != null ? desc2Selector.content : undefined;
    desc = desc ? desc : desc2;
    // let desc = doc.querySelector('meta[name="description"]')?.content;
    // desc = desc ?
    //   desc :
    //   doc.querySelector('meta[name="Description"]')?.content;
    const descMetaSelector =
      doc.querySelector('meta[property="og:description"]');
    const descMeta = descMetaSelector != null ?
      descMetaSelector.content : undefined;
    // const descMeta = doc.querySelector('meta[property="og:description"]')
    //    ?.content;
    ogData.description = descMeta ? descMeta : desc;

    // image
    const imageMetaSelector = doc.querySelector('meta[property="og:image"]');
    ogData.image = imageMetaSelector != null ?
      imageMetaSelector.content : undefined;
    // ogData.image = doc.querySelector('meta[property="og:image"]')?.content;

    // site_name
    const siteMetaSelector = doc.querySelector('meta[property="og:site_name"]');
    ogData.site_name = siteMetaSelector != null ?
      siteMetaSelector.content : undefined;
    // ogData.site_name = doc.querySelector(
    //     'meta[property="og:site_name"]',
    // )?.content;

    // url
    const urlMetaSelector = doc.querySelector('meta[property="og:url"]');
    const urlMeta = urlMetaSelector != null ?
      urlMetaSelector.content : undefined;
    // const urlMeta = doc.querySelector('meta[property="og:url"]')?.content;
    ogData.url = urlMeta ? urlMeta : url;

    return ogData;
  } catch (error) {
    console.log('Error:', error);
    return '';
  }
}

module.exports = getOgData;
