var http = require('http');

var endpointRE = /^\/incidents\/(.*)$/;
var idRE = /^\d+$/;
var districtRE = /district\/(.*)$/;
var dateRE = /date\/(.*)$/;
var postcodeRE = /postcode\/(.*)$/;

function parseUrl (url) {
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
}


module.exports.serve = function (data) {
  // Create an HTTP server
  var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    var request = parseUrl(req.url);
    console.log("serving request:", request);

    var result;

    if (request.endpoint === 'id') {
      result = data[request.param];
    }
    else if (request.endpoint === 'date') {
      result = data.filter(function (incident) {
        return incident.date === request.param;
      });
    }
    else if (request.endpoint === 'district') {
      result = data.filter(function (incident) {
        return incident.district === request.district;
      });
    }
    else if (request.endpoint === 'postcode') {
      result = data.filter(function (incident) {
        return incident.postcode === request.postcode;
      });
    }

    res.write(JSON.stringify(result || null));
    res.end('');
  });

  server.listen(8080, '127.0.0.1', function() {
    console.log('Started server');
  });
};
