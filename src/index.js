const getOgData = require('./get_og_data');

const HTML_ESCAPE_REPLACE_RE = /[&<>"']/g;
const HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
}

function unescapeHtml(str) {
  return str.replace(/&quot;/g, '"').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function linkPreviewHtml(ogData) {
  return (
    '<div class="link-preview-widget">' +
    '<a ' +
    'href="' +
    escapeHtml(unescapeHtml(ogData.url)) +
    '" ' +
    'rel="noopener" ' +
    'target="_blank"' +
    '>' +
    '<div class="link-preview-widget-title">' +
    escapeHtml(unescapeHtml(ogData.title)) +
    '</div>' +
    '<div class="link-preview-widget-description">' +
    escapeHtml(unescapeHtml(ogData.description)) +
    '</div>' +
    '<div class="link-preview-widget-url">' +
    escapeHtml(unescapeHtml(ogData.site_name)) +
    '</div>' +
    '</a>' +
    '<a ' +
    'class="link-preview-widget-image" ' +
    'href="' +
    escapeHtml(unescapeHtml(ogData.url)) +
    '" ' +
    'rel="noopener" ' +
    'style="background-image: url(\'' +
    escapeHtml(unescapeHtml(ogData.image)) +
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
