var authController = require('./authController.js');

module.exports = function(app) {
  app.get('/google', authController.initialLogin);
  app.get('/google/callback', authController.redirect, authController.success);
};
