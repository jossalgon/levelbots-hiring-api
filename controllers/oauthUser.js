var mongoose = require('mongoose')
  , OAuthUser = require('../models/oauthUser');

var url = process.env.MONGODB_URI || "mongodb://localhost:27017/hiring";
mongoose.connect(url);

var createOAuthUser = function(request, response) {
  var body = request.body;
  var oauthUser = new OAuthUser({
      email: body.email,
      firstname: body.firstname,
      lastname: body.lastname,
      password: body.password
  });

  oauthUser.save(function(err) {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
};

var getTokenFromOAuthUser = function(request, response) {
  OAuthUser.findOne({'email': request.body.email, 'password': request.body.password},
    {'accessToken': 1, '_id': 0}, function (err, token) {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      response.send(token);
    }
  });
};


module.exports = {
  createOAuthUser,
  getTokenFromOAuthUser
}
