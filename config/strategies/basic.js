var passport = require('passport'),
Strategy = require('passport-http').BasicStrategy,
User = require('mongoose').model('User');

module.exports = function() {

    passport.use(new Strategy(

      function(username, password, done) {

        User.findOne({ username: username }, function (err, user) {

          if (err) { return done(err); }

          if (!user) { return done(null, false); }

          if (!user.authenticate(password)) { return done(null, false); }

          return done(null, user);

        });

      }

  ));

};