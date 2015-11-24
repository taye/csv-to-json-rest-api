var csvToJson = require('./csvToJson');
var server = require('./server');

// convert the CSV file to JSON
csvToJson({
  file: './data.csv',
  headings: [
    'date',
    'agency',
    'postcode',
    'district',
    'toc',
    'ord',
    'mob',
    'ia',
    'ls',
    'ah',
    'mav',
    'cd'
  ]
},
  // on error or completion
  function (err, data) {
  if (err) {
    console.error('Error while converting CSV: ', err.message);
    return;
  }

  // change date separator from "/" to "-"
  data.forEach(function (incident) {
    incident.date = incident.date.replace(/\//g, '-');
  });

  // serve the data through the RESTful API
  server.serve({
    data: data,
    port: 8080,
    host: '0.0.0.0'
  });
});
