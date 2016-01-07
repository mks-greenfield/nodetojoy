var eventController = require('./eventController.js');

module.exports = function(app) {
  app.get('/events', eventController.getEvent);
  app.get('/allevents', eventController.getAllEvents);
  app.post('/booked', eventController.postEvent);
  app.post('/googlecal', eventController.postGoogleCal);
  app.get('/user', eventController.getUser);
};
