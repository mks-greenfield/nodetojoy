var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var googleSessions = require('./googleSessions.js');

module.exports = function(app, express) {

  // Middleware to parse request body
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(morgan('combined'));

  //initializes client sessions and Google login
  googleSessions.initialize(app);

  var authRouter = express.Router();
  var userRouter = express.Router();
  var eventRouter = express.Router();

  app.use('/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/events', googleSessions.restrict, eventRouter);

  app.get('/failure', function(req, res) {
    res.status('404');
    res.send("you don't have access to that resource. redirecting to sign in.");
  });

  app.get('/logout', function(req, res) {
    req.session.destroy();
    res.send("destroyed session");
  });

  require(__dirname + '/../auth/authRoutes.js')(authRouter);
  require(__dirname + '/../users/userRoutes.js')(userRouter);
  require(__dirname + '/../events/eventRoutes.js')(eventRouter);
};