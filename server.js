// server.js


//setup - get the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

//require('./config/passport')(passport); //pass passport for configuration

app.configure(function() {
	app.use(express.logger('dev')); //log every request to the console
	app.use(express.cookieParser()); //read cookies needed for auth
	app.use(express.bodyParser()); //get info from html forms

	app.set('view engine', 'jade'); //set up jade for templating

	//required for passport
	app.use(express.session({ secret: 'onelove'})); //session secret 
	app.use(passport.initialize());
	app.use(passport.session()); //persistent login sessions
	app.use(flash()); //use connect-flash for flash messages stored in session
});

//routes
require('./app/routes.js')(app, passport); //load routes that use the passed in app and fully configured passport

//launch
app.listen(port);
console.log('The magic happens on kport '+port);
