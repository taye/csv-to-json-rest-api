var csvToJson = require('./csvToJson');
var server = require('./server');

var headings = [
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
];

// convert the CSV file to JSON
csvToJson({
  file: './data.csv',
  headings: headings
},
  // on error or completion
  function (err, data) {
  if (err) {
    console.error('Error while converting CSV: ', err.message);
    return;
  }

  // make some adjustments to the objects
  data.forEach(function (incident, index) {
    // give each incident an ID which is it's index in the data array
    incident.id = index;

    // change date separator from "/" to "-"
    incident.date = incident.date.replace(/\//g, '-');
  });

  // Serve the data through the RESTful API. The keys option defines endpoint
  // urls. Here, we allow all incident properties to be used
  server.serve({
    data: data,
    // add id to the API endpoint keys and use it as the default endpoint
    keys: ['id'].concat(headings),
    baseUrl: '/incidents/',
    port: 8080,
    host: '0.0.0.0'
  });
});
