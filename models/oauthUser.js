var mongoose = require('mongoose'),
    crypto = require('crypto');

var oauthUserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String, required: true },
  accessToken: { type: String }
});

oauthUserSchema.pre('save', function(next) {
  var self = this;
  crypto.randomBytes(32, function(err, buffer) {
    self.accessToken = buffer.toString('hex');
    next(err);
  });
});

module.exports = mongoose.model('OAuthUser', oauthUserSchema);
