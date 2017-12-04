var express = require('express');
var app = express();

var companyController = require('./controllers/company');

// Import companies by json
var importCompanies = require('./importCompanies')
importCompanies();

// Routes
var company = require('./routes/company');
app.use('/api/company', company);

app.route('/api/companies')
  .get(companyController.getAllCompanies);

module.exports = app;
