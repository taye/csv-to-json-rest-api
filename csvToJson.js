/**
 * parse a CSV file and add an ID to each entry
 * @param options  object   options with file and optional beadings
 * @param callback function the function to be called on error or success.
 *                          first argument is the error if any,
 *                          second is the array of record objects
 */
module.exports = function (options, callback) {
  var fs = require('fs');
  var parse = require('csv-parse');

  // Create a CSV parser
  var parser = parse({delimiter: ',', comment: '#'});

  // the keys for the record objects provided in options.headings or taken
  // from the csv table headings
  var dataKeys;
  var recordLength;
  var records = [];

  var needHeadings = true;

  // Whenever data is ready to be read from the input
  parser.on('readable', function(){
    // the first record will be an array of headings
    if (needHeadings) {
      var headings = parser.read();

      // if alternative headings are supplied, discared the headings read
      // fromt the file
      if (options.headings) {
        headings = options.headings;
      }

      recordLength = headings.length;

      // make the headings lower case and use them as keys for the record
      // objects
      dataKeys = headings.map(function (heading) {
        return heading.toLowerCase();
      });

      needHeadings = false;
    }

    var recordArray;

    // read each available record
    while ((recordArray = parser.read())) {
      // Each record is read as an array of string values
      // An object is made for the record and appended to the records array
      // Use the record's index in the array as an ID
      var recordObject = { id: records.length };
      records.push(recordObject);

      // Each entry will have as properties: "id" and the strings in the
      // dataKeys array. The values of those properties will be the
      // corresponding record values
      for (var i = 0; i < recordLength; i++) {
        recordObject[dataKeys[i]] = recordArray[i];
      }
    }
  });

  // Catch any error
  parser.on('error', function(err){
    callback(err, null);
  });

  // When we are done, test that the parsed output matched what expected
  parser.on('finish', function(){
    callback(null, records);
  });

  fs.readFile(options.file, function (err, data) {
    parser.write(data.toString());

    parser.end();
  });
};
