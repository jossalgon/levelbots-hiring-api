var express = require('express');
var router = express.Router();

var companyController = require('../controllers/company');

router.route('/:id')
  .get(companyController.getCompanyById);

router.route('/:id/products')
  .get(companyController.getProductsByCompanyId);

router.route('/:id/members')
  .get(companyController.getMembersByCompanyId);


module.exports = router;
