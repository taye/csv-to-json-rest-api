var http = require('http');
var endpointFromUrl = require('./endpointFromUrl');

/**
 * Start a server to serve the data through a RESTful API.
 *
 * @param options object object with data, endpoint keys, API baseUrl and,
 *                       optionally, port and host properties. Default to 8080
 *                       and 0.0.0.0
 */
module.exports.serve = function (options) {
  options = options || {};

  var port = options.port || 8080;
  var host = options.host || '0.0.0.0';

  // Create an HTTP server
  var server = http.createServer(function (req, res) {
    // The server always serves a JSON response
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var endpoint = endpointFromUrl(req.url, options.baseUrl, options.keys);
    console.log("serving request:", endpoint);

    var result = null;

    // if a vlid endpoint was matched
    if (endpoint.key !== null) {
      // filter the records by the requested key/value
      result = options.data.filter(function (dataItem) {
        // double equals comparison to allow casting number/string values
        return dataItem[endpoint.key] == endpoint.value;
      });
    }

    // write the JSON string of the result and end the response
    res.end(JSON.stringify(result));
  });

  server.listen(port, host, function() {
    console.log('Started server on ' + host + ':' + port);
  });

  return server;
};
