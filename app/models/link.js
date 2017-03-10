var crypto = require('crypto');
var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
  url: String,
  baseURL: String,
  code: String,
  title: String,
  visits: Number
});


urlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  this.visits = 0;
  next();
});

var Link = mongoose.model('Link', urlSchema);

module.exports = Link;





// var db = require('../config');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//     });
//   }
// });

