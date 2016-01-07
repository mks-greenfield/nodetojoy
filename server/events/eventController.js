var eventModel = require('./eventModel.js');
var Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));
//For Google Calendar
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://127.0.0.1:3000/auth/google/callback");

module.exports = {
  postEvent: function(req, res) {
    //checks if event already exists
    var token = req.headers["x-access-token"];
    console.log("ACCESS TOKEN", token);


    eventModel.findOne({
      'eventDate': req.body.dibEvent.eventDate,
      'roomName': req.body.dibEvent.roomName
    }).then(function(result) {
      if (result) {
        res.json({
          result: false
        });
      } else {
        var storeEvent = eventModel.create.bind(eventModel);
        storeEvent(req.body.dibEvent);
        res.json({
          result: true
        });
      }
    });
  },

  postGoogleCal: function(req, res) {

    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken
    });

    var description = req.body.event.eventDescription + " at " + req.body.event.houseName;

    var event = {
      'summary': description,
      'description': description,
      'start': {
        'dateTime': req.body.event.eventDate,
      },
      'end': {
        'dateTime': req.body.event.eventEndDate,
      }
    };

    var calendar = google.calendar('v3');

    calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }

      console.log('Event created: %s', event.htmlLink);
      data = event.htmlLink;
      res.json(event.htmlLink);
    });

  },

  getUser: function(req, res) {
    res.json(req.user);
  },

  getEvent: function(req, res) {
    var token = req.headers["x-access-token"];
    console.log("ACCESS TOKEN", token);
    console.log("REQ SESSION", req.session);
    console.log("REQ USER", req.user);

    eventModel.find({
        'eventDate': {
          $gte: new Date()
        }
      })
      .sort({
        eventDate: 1
      })
      .then(function(booked) {
        return res.json(booked);
      });
  },

  getAllEvents: function(req, res) {
    var token = req.headers["x-access-token"];
    console.log("ACCESS TOKEN", token);
    console.log("REQ SESSION", req.session);
    console.log("REQ USER", req.user);

    eventModel.find()
      .sort({
        eventDate: 1
      })
      .then(function(booked) {
        return res.json(booked);
      });
  }
};