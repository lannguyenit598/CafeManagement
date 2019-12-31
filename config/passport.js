const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
((email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
})));