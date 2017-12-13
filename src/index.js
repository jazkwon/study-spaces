/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

*/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
const config = require('./config');
const User = require('./')
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
var cors_proxy = require('cors-anywhere');

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));

const PORT = process.env.PORT || 3000;
var port2 = process.env.PORT || 8081;
var host = process.env.HOST || '0.0.0.0';

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);


cors_proxy.createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port2, host, function() {
  console.log('Running CORS anywhere on' + host + ': ' + port2);
})




app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Static routes
app.route('/').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/login').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/signup').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/profile').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/review').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/location').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/listview').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/test').get(function(req, res, next) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});


/* New things ================================================================ */

require('./backend/models').connect(config.dbUri);
require('./backend/auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));

// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Get our routes
app.use('/api', require('./backend/routes/api')(router, passport));

/* =========================================================================== */

// start the server
/*app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
}); */

app.listen(PORT ,function(){
    console.log("up and running on port "+PORT);
});


/*ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/
