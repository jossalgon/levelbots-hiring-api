var express = require('express')
  , app = express();


// Controllers
var companyController = require('./controllers/company');
var oauthUserController = require('./controllers/oauthUser');

// Routes
var company = require('./routes/company');
var oauthUser = require('./routes/oauthUser');
app.use('/api/company', company);
app.use('/oauth', oauthUser);

app.route('/api/companies')
  .get(companyController.getAllCompanies);

module.exports = app;
