const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

module.exports = function(passport) {
   passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(null, user);
        });
    });

   passport.use(new LocalStrategy(
       {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
                process.nextTick(function() {
                User.findOne({ email }, async function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.session.sessionFlash = {
                        type: 'loginMessage',
                        message: 'Email không tồn tại.'
                      });
                if (!user.validatePassword(password)) {
                  return done(null, false, req.session.sessionFlash = {
                    type: 'loginMessage',
                    message: 'Mật khẩu không đúng.'
                  });
                }
                return done(null, user);
                });
            });
        }
   ));
}