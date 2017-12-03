var request = require("request")
var fs = require('fs');
var exec = require('child_process').exec;
var getDirName = require('path').dirname;

var json_url = "https://levelbot.com/hiring/companies.json"
var db = 'hiring';
var collection = 'companies';
var jsonfilePath = 'jsonData/companies.json';


var safeMakeFileDir = function(filepath) {
  var dirname = getDirName(filepath);
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
};

var mongoImport = function(db, collection, jsonfilePath) {
  console.log('Importing...')
  var mongoImportCommand = 'mongoimport --db ' + db + ' --collection ' +
    collection + ' --drop --file ' + jsonfilePath + ' --jsonArray';

  exec(mongoImportCommand, function(err, stdout, stderr) {
    if(stdout) console.log(stdout);
    if(stderr) console.log('stderr: ' + stderr);
    if(err) throw err;
  });
};

var importCompanies = function() {
  safeMakeFileDir(jsonfilePath);
  var jsonStream = fs.createWriteStream(jsonfilePath);
  request(json_url).pipe(jsonStream);

  jsonStream.on('finish', function(){
    // TODO: Only import to mongo if json file didn't exist
    mongoImport(db, collection, jsonfilePath);
  });
};

module.exports = importCompanies;
