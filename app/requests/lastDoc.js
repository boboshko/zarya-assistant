const fetch = require('node-fetch');
const config = require('../config');

// Set data for API authorization
async function makeApiRequest(url) {
  const response = await fetch(config.zaryaApiRequest + url, {
    method: 'GET',
    headers: { Authorization: config.zaryaApiAuthorization },
  });
  const data = await response.json();
  return data;
}

// Run the request
async function lastDoc(id) {
  if (id === 'last') {
    return makeApiRequest(id)
      .then((res) => res,
        (err) => {
          console.log(err);
        });
  }
  return makeApiRequest(id)
    .then((res) => res,
      (err) => {
        console.log(err);
      });
}

exports.lastDoc = lastDoc;
