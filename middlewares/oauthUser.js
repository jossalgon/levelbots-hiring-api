var oauthUserService = require('../services/oauthUser');

var isAllowed = function(request, response, next) {
  var accessToken = request.headers.accesstoken;
  if (accessToken) {
    oauthUserService.isValidAccessToken(accessToken, next, function(){
      response.sendStatus(401);
    });
  }
};

module.exports =  {
  isAllowed
}
