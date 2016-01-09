var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./config/middleware.js');
var app = express();
var server = http.createServer(app);
var database  = (process.env.MONGOLAB_URI || 'mongodb://localhost/dibbr');

mongoose.connect(database, function(error) {
  if (error) {
    console.error("Database connection error ", error);
  } else {
    console.log("We've opened a connection");
  }
});

middleware(app, express);

app.use(express.static(__dirname +  "/../public"));

var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Listening on port', port);
});
