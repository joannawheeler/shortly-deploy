var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password);
  next();
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword) {
  return bcrypt.compareSync(attemptedPassword, this.password);
}

module.exports = User;




// var db = require('../config');
// var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

