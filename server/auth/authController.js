var passport = require('passport');

module.exports = {
  
  initialLogin: passport.authenticate('google', {scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']}),

  redirect:  passport.authenticate('google'),

  success: function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
};