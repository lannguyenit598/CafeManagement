const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
((email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'Tài khoản hoặc mật khẩu': 'không đúng!' } });
      }
      return done(null, user);
    }).catch(done);
})));