var csvToJson = require('./csvToJson');

csvToJson('./data.csv', function (err, data) {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log(data);
});
