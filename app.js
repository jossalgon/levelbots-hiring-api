var express = require('express');
var app = express();

var companyController = require('./controllers/company');

// Import companies by json
var importCompanies = require('./importCompanies')
importCompanies();

// Routes
var company = require('./routes/company');
app.use('/company', company);

app.route('/companies')
  .get(companyController.getAllCompanies);


// App listen
app.listen(3000);
