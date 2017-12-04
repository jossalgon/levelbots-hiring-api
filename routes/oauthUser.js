var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type: 'application/json'});

var oauthUserController = require('../controllers/oauthUser');

router.route('/signup')
  .post(jsonParser, oauthUserController.createOAuthUser);

router.route('/token')
  .post(jsonParser, oauthUserController.getTokenFromOAuthUser);


module.exports = router;
