const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getHtmlSync(url, redirectLimit = 5) {
  // TODO url check

  if (redirectLimit <= 0) {
    throw new Error('Too many redirects');
  }

  const xhr = new XMLHttpRequest();
  try {
    xhr.open('GET', url, false);
    xhr.followRedirects = true;
    xhr.send();
  } catch (err) {
    throw new Error('XMLHttpRequest(' + url + ') failed. ' + err);
  }

  if (xhr.readyState === 4 && (xhr.status === 301 || xhr.status === 302)) {
    const redirectUrl = xhr.getResponseHeader('Location');
    return getHtmlSync(redirectUrl, redirectLimit - 1);
  }
  if (xhr.status != 200) {
    const statusText = xhr.statusText ? xhr.statusText : '';
    throw new Error(
      'XMLHttpRequest(' + url + ') status:' + xhr.status + ' ' + statusText,
    );
  }
  return xhr.responseText;
}
module.exports = getHtmlSync;
