var csvToJson = require('./csvToJson');
var server = require('./server');

csvToJson('./data.csv', function (err, data) {
  if (err) {
    console.error(err.message);
    return;
  }

  // serve the data through the RESTful API
  server.serve(data);
});
