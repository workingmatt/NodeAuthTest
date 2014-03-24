// app/routes.js
module.exports = function(app, passport) {
	
	//Homepage
	app.get('/', function(req, res){
		res.render('index.jade');
	});

	//Login form
	app.get('/login', function(req, res){
		res.render('login.jade', {message: req.flash('loginMessage') });
	});
	//app.post('/login', do some stuff)

	//Signup page
	app.get('/signup', function(req,res){
		res.render('signup.jade', {message: req.flash('signupMessage')});
	});
	//app.post('/signup', do passport stuff here);

	//Profile page
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.jade', {
			user : req.user
		});
	});

	//Logout page
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/);')
	});
}

//route the middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	//if user is authed in the session
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}