var endpointRE = /^\/incidents\/(.*)$/;
var idRE = /^\d+$/;
var districtRE = /district\/(.*)$/;
var dateRE = /date\/(.*)$/;
var postcodeRE = /postcode\/(.*)$/;

module.exports = function (url) {
  var endpointMatch = url.match(endpointRE);

  var request = { endpoint: null, param: null };

  if (!endpointMatch) {
    return request;
  }

  var endpoint = endpointMatch[1];

  // if an ID is given
  if (idRE.test(endpoint)) {
    request.endpoint = 'id';
    request.param = endpoint;
  }
  // date endpoint
  else if (endpoint.indexOf('date') === 0) {
    request.endpoint = 'date';

    var dateMatch = endpoint.match(dateRE);
    request.param = dateMatch && dateMatch[1];
  }
  // date endpoint
  else if (endpoint.indexOf('district') === 0) {
    request.endpoint = 'district';

    var districtMatch = endpoint.match(districtRE);
    request.param = districtMatch && districtMatch[1];
  }
  // postcode endpoint
  else if (endpoint.indexOf('postcode') === 0) {
    request.endpoint = 'postcode';

    var postcodeMatch = endpoint.match(postcodeRE);
    request.param = postcodeMatch && postcodeMatch[1];
  }

  return request;
};
