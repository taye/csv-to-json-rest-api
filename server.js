var http = require('http');
var requestFromUrl = require('./requestFromUrl');

/**
 * Start a server to serve the data through a RESTful API.
 *
 * @param options object object with data and, optionally, port and host
 *                       properties. Default to 8080 and 0.0.0.0
 */
module.exports.serve = function (options) {
  options = options || {};

  var data = options.data;
  var port = options.port || 8080;
  var host = options.host || '0.0.0.0';

  // Create an HTTP server
  var server = http.createServer(function (req, res) {
    // The server always serves a JSON response
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var request = requestFromUrl(req.url);
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
        return incident.district === request.param;
      });
    }
    else if (request.endpoint === 'postcode') {
      result = data.filter(function (incident) {
        return incident.postcode === request.param;
      });
    }

    res.end(JSON.stringify(result || null));
  });

  server.listen(port, host, function() {
    console.log('Started server on ' + host + ':' + port);
  });

  return server;
};
