var idRE = /^\d+$/;

module.exports = function (url, baseUrl, keys) {
  var request = { key: null, value: null };

  // remove the baseUrl to get the endpoint key and value parameter
  var endpoint = url.indexOf(baseUrl) !== -1 && url.substring(baseUrl.length);

  if (!endpoint) {
    return request;
  }

  // if an ID is given
  if (idRE.test(endpoint)) {
    request.key = 'id';
    request.value = parseInt(endpoint);
  }
  // general object key endpoints
  else {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (endpoint.indexOf(key) === 0) {
        request.key = key;
        request.value = endpoint.substring(key.length + 1 /* +1 for "/" */);
        break;
      }
    }
  }

  return request;
};
