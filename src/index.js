const getOgData = require('./get_og_data');

function linkPreviewHtml(ogData) {
  return (
    '<div class="link-preview-widget">' +
    '<a ' +
    'href="' +
    ogData.url +
    '" ' +
    'rel="noopener" ' +
    'target="_blank"' +
    '>' +
    '<div class="link-preview-widget-title">' +
    ogData.title +
    '</div>' +
    '<div class="link-preview-widget-description">' +
    ogData.description +
    '</div>' +
    '<div class="link-preview-widget-url">' +
    ogData.site_name +
    '</div>' +
    '</a>' +
    '<a ' +
    'class="link-preview-widget-image" ' +
    'href="' +
    ogData.url +
    '" ' +
    'rel="noopener" ' +
    'style="background-image: url(\'' +
    ogData.image +
    '\');" ' +
    'target="_blank"' +
    '></a>' +
    '</div>'
  );
}

function linkPreviewPlugin(md, options) {
  // Remember old renderer, if overriden, or proxy to default renderer
  const defaultRender =
    md.renderer.rules.link_open ||
    function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  function isLinkPreview(tokens, idx) {
    const t = tokens[idx + 1];
    if (t.type === 'text' && t.content === '@preview') {
      return true;
    } else {
      return false;
    }
  }

  function hideTokensUntilLinkClose(tokens, idx) {
    tokens[idx + 1].content = ''; // hidden ???
    for (let i = idx + 1; i < tokens.length; i++) {
      tokens[i].hidden = true;
      if (tokens[i].type === 'link_close') break;
    }
  }

  function getHref(tokens, idx) {
    const hrefIdx = tokens[idx].attrIndex('href');
    // if (hrefIdx < 0) error;
    return tokens[idx].attrs[hrefIdx][1];
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    if (isLinkPreview(tokens, idx)) {
      hideTokensUntilLinkClose(tokens, idx);
      const url = getHref(tokens, idx);
      const ogData = getOgData(url);

      return linkPreviewHtml(ogData);
    } else {
      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self);
    }
  };
}

module.exports = linkPreviewPlugin;
