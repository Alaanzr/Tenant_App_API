var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
              type: String,
              match: [/.+\@\.+\..+/,
              "Please fill a valid e-mail address"]
    },
    username: {
              type: String,
              trim: true,
              require: 'Username is required',
              unique: true
    },
    password: {type: String, validate: [function(password) {
      return password && password.lenght > 6;
    }, 'Password should be longer']},
    salt: {type: String},
    provider: {type: String, required: 'Provider is required'},
    providrId: String,
    providerData: {},
    created: {type: Date, default: Date.now}
  });

  UserSchema.pre('save',
      function(next) {
          if (this.password) {
              var md5 = crypto.createHash('md5');
              this.password = md5.update(this.password).digest('hex');
          }

          next();
      }
  );

  UserSchema.methods.authenticate = function(password) {
      var md5 = crypto.createHash('md5');
      md5 = md5.update(password).digest('hex');

      return this.password === md5;
  };

  UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
      var _this = this;
      var possibleUsername = username + (suffix || '');

      _this.findOne(
          {username: possibleUsername},
          function(err, user) {
              if (!err) {
                  if (!user) {
                      callback(possibleUsername);
                  }
                  else {
                      return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                  }
              }
              else {
                  callback(null);
              }
          }
      );
  };

mongoose.model('User', UserSchema);
