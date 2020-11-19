const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getHtmlSync(url) {
  // TODO url check

  const xhr = new XMLHttpRequest();
  try {
    xhr.open('GET', url, false);
    xhr.send();
  } catch (err) {
    throw new Error('XMLHttpRequest failed: ', err);
  }

  if (xhr.status != 200) {
    throw new Error('XMLHttpRequest ', xhr.status, ' ', xhr.statusText);
  }
  return xhr.responseText;
}
module.exports = getHtmlSync;
