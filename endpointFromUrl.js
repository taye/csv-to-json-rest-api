module.exports = function (url, baseUrl, keys) {
  var endpoint = { key: null, value: null };

  // remove the baseUrl to get the request endpoint and value parameter
  var request = url.indexOf(baseUrl) !== -1 && url.substring(baseUrl.length);

  if (!request) {
    return endpoint;
  }

  // general object key endpoints
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (request.indexOf(key) === 0) {
      endpoint.key = key;
      endpoint.value = request.substring(key.length + 1 /* +1 for "/" */);
      break;
    }
  }

  // if no endpoint was found assume a value for the first key in keys was
  // provided
  if (!endpoint.key) {
    endpoint.key = keys[0];
    endpoint.value = request;
  }

  return endpoint;
};
