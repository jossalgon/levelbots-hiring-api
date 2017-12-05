var express = require('express')
  , app = express();

// Controllers
var companyController = require('./controllers/company')
  , oauthUserController = require('./controllers/oauthUser');

var oauth = require('./middlewares/oauthUser').isAllowed;

// Routes
var company = require('./routes/company')
  , oauthUser = require('./routes/oauthUser');
app.use('/api/company', oauth, company);
app.use('/oauth', oauthUser);

app.route('/api/companies')
  .get(oauth, companyController.getAllCompanies);

module.exports = app;
