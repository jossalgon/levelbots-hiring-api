var express = require('express')
  , router = express.Router();

var bodyParser = require('body-parser')
  , jsonParser = bodyParser.json({ type: 'application/json'});

var companyController = require('../controllers/company');

router.route('/')
  .post(jsonParser, companyController.createCompany);

router.route('/:id')
  .get(companyController.getCompanyById)
  .delete(companyController.deleteCompanyById)
  .put(jsonParser, companyController.updateCompanyById);

router.route('/:id/products')
  .get(companyController.getProductsByCompanyId);

router.route('/:id/members')
  .get(companyController.getMembersByCompanyId);

router.route('/:id/producto')
  .post(jsonParser, companyController.addProductToCompanyById);


module.exports = router;
