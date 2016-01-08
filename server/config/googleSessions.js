var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports.restrict = function(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/failure');
};

module.exports.initialize = function(app) {
  app.use(cookieParser());

  app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: 3600000 //1 Hour
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  var callback = process.env.CALLBACK || "http://127.0.0.1:5000/auth/google/callback";

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: callback
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        var user = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        };        
        return done(null, user);
      });
    }
  )); 
};