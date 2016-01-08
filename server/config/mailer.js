var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PWD
    }
});

exports.sendMail = function(receiverEmail, eventURL) {
  // setup e-mail data
  var mailOptions = {
      from: process.env.USER_EMAIL, // sender address
      to: receiverEmail,  // list of receivers
      subject: '✔ Event Confirmation', // Subject line
      text: 'You have successfully created an event! View it here: '+eventURL, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
          return console.log(error);
      }
      console.log('Message sent: ' + info.response + '\n');
  });
};