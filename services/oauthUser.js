var mongoose = require('mongoose')
  , OAuthUser = require('../models/oauthUser');

var url = process.env.MONGODB_URI || "mongodb://localhost:27017/hiring";
mongoose.connect(url);

var isValidAccessToken = function(accessToken, callbackOk, callbackfail) {
  OAuthUser.findOne({'accessToken': accessToken}, function (err, oauthUser) {
    if (err) throw err;
    if (oauthUser !== null) {
      callbackOk();
    } else {
      callbackfail();
    }
    return oauthUser !== null;
  });
};

module.exports = {
  isValidAccessToken
}
