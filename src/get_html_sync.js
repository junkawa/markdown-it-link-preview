const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getHtmlSync(url) {
  // TODO url check

  const xhr = new XMLHttpRequest();
  try {
    xhr.open('GET', url, false);
    xhr.send();
  } catch (err) {
    throw new Error('XMLHttpRequest(' + url + ') failed. ' + err);
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
