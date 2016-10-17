var express = require('express');
var routes = require('./routes');
var request = require('request');
var passport = require('passport');
var pg = require('pg');
var CasStrategy = require('passport-cas').Strategy;

var app = express();
app.set('port', (process.env.PORT || 5000));
// app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new CasStrategy({
// 	ssoBaseURL: 'https://login.gatech.edu/cas',
// 	serverBaseURL: 'http://m.gatech.edu/w/schedule/c/api/myschedule'
// 	},
// 	function(login, done) {
// 		console.log('authenticating');
// 		User.findOne({login: login}, function(err, user) {
// 			if (err) {
// 				return done(err);
// 			}
// 			if (!user) {
// 				return done(null, false, {message : 'Unknown user'});
// 			}
// 			return done(null, user);
// 		});
// 		console.log(username);
// 	}
// ));
// cas.configure({
//   casHost: "http://login.gatech.edu/cas/login",   // required
//   casPath: "/cas",                  // your cas login route (defaults to "/cas")
//   ssl: true,                        // is the cas url https? defaults to false
//   port: 443,                        // defaults to 80 if ssl false, 443 if ssl true
//   service: "http://localhost:3000", // your site
//   // sessionName: "cas_user",          // the cas user_name will be at req.session.cas_user (this is the default)
//   // renew: false,                     // true or false, false is the default
//   // gateway: false,                   // true or false, false is the default
//   redirectUrl: '/splash'            // the route that cas.blocker will send to if not authed. Defaults to '/'
// });
app.get('/login',
	passport.authenticate('cas', function (err, user, info) {
		console.log('kek why doesnt it work');
		if (err) {
			return next(err);
		}

		if (!user) {
			req.session.messages = info.message;
			return res.redirect('/');
		}

		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}

			req.session.messages = '';
			return res.redirect('/');
		});
	}));

app.get('/getsched', function(req, res) {
	var data = [[{"long_course_title":null,"course_attributes":[],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"TR","begin_time":"1205","end_time":"1325","building_description":"Clough Undergraduate Commons","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"152","building_code":"166"}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":4,"class_registration_start_date":null,"course_title":"Habitable Planet","description":"Introduction to the origin and evolution of Planet Earth, creation of the universe and the elements, early history of Earth, radioisotope geochemistry and the timing of events in the universe, the galaxy, and on Earth. Formation of the atmosphere and oceans. Climate.","crn":"80553","instructors":[{"name":"Reinhard, Christopher","is_primary":true,"pidm":2906379}],"section_number":"A","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"1601","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"EAS","waitlist_avail":0,"seats_avail":25,"class_status_code":"A","seats_capacity":304,"campus_code":"A","catalog_credit_hour_high":4,"meeting_type_code":"A","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"R","begin_time":"1505","end_time":"1755","building_description":"Van Leer","begin_date":"2016-08-22","meeting_type_code":"E","meeting_type":"CLAS","room":"E283","building_code":"085"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":0,"class_registration_start_date":null,"course_title":"Digital Design Lab","description":"Design and implementation of digital systems, including a team design project. CAD tools, project design methodologies, logic synthesis, and assembly language programming.","crn":"81553","instructors":[{"name":"Collins, Thomas Riley","is_primary":true,"pidm":90984}],"section_number":"L10","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"2031","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"ECE","waitlist_avail":0,"seats_avail":0,"class_status_code":"A","seats_capacity":20,"campus_code":"A","catalog_credit_hour_high":2,"meeting_type_code":"E","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"W","begin_time":"1205","end_time":"1455","building_description":"Clough Undergraduate Commons","begin_date":"2016-08-22","meeting_type_code":"E","meeting_type":"CLAS","room":"341","building_code":"166"}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":0,"class_registration_start_date":null,"course_title":"Habitable Planet","description":"Introduction to the origin and evolution of Planet Earth, creation of the universe and the elements, early history of Earth, radioisotope geochemistry and the timing of events in the universe, the galaxy, and on Earth. Formation of the atmosphere and oceans. Climate.","crn":"84760","instructors":[{"name":"Grantham, Meg Camille","is_primary":true,"pidm":200660}],"section_number":"W2","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"1601","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"EAS","waitlist_avail":0,"seats_avail":3,"class_status_code":"A","seats_capacity":24,"campus_code":"A","catalog_credit_hour_high":4,"meeting_type_code":"E","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[{"description":"Networking & Telecom (CS)","course_attribute_code":"NWTC"},{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"TR","begin_time":"0935","end_time":"1055","building_description":"College of Business","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"100","building_code":"172"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Computer Networking I","description":"See cc.gatech.edu\/regdates ","crn":"80266","instructors":[{"name":"Sanders, Matthew James","is_primary":true,"pidm":566071}],"section_number":"A","catalog_credit_hour_ind":null,"instructional_method_code":null,"course_number":"3251","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":3,"subject_code":"CS","waitlist_avail":90,"seats_avail":32,"class_status_code":"A","seats_capacity":200,"campus_code":"A","catalog_credit_hour_high":null,"meeting_type_code":"A","waitlist_capacity":90},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"F","begin_time":"1505","end_time":"1555","building_description":"Coll of Computing","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"16","building_code":"050"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":2,"class_registration_start_date":null,"course_title":"Digital Design Lab","description":"ECE 2031 CSA is for College of Computing majors only. ","crn":"84781","instructors":[{"name":"Bourgeois, Christina","is_primary":false,"pidm":1642255},{"name":"Collins, Thomas Riley","is_primary":true,"pidm":90984},{"name":"Johnson, Kevin Toby","is_primary":false,"pidm":1773013}],"section_number":"CSA","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"2031","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"ECE","waitlist_avail":0,"seats_avail":3,"class_status_code":"A","seats_capacity":45,"campus_code":"A","catalog_credit_hour_high":2,"meeting_type_code":"A","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"MWF","begin_time":"1105","end_time":"1155","building_description":"MRDC","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"2404","building_code":"135"}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Statistics& Applications","description":"Major restricted until the last Wednesday of Phase II registration at noon. If course is full, please join the waitlist. ISYE does not grant overloads. Not allowed for IE majors. ","crn":"88336","instructors":[{"name":"Johnson, Ronald Lee","is_primary":true,"pidm":279197}],"section_number":"MW4","catalog_credit_hour_ind":null,"instructional_method_code":null,"course_number":"3770","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":3,"subject_code":"ISYE","waitlist_avail":75,"seats_avail":0,"class_status_code":"A","seats_capacity":60,"campus_code":"A","catalog_credit_hour_high":null,"meeting_type_code":"A","waitlist_capacity":75},{"long_course_title":null,"course_attributes":[],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"MW","begin_time":"1635","end_time":"1755","building_description":"Howey (Physics)","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"L2","building_code":"081"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Mobile Apps & Svcs","description":"Grad students:CS 8803MAS instead. See cc.gatech.edu\/regdates ","crn":"84762","instructors":[{"name":"Eason, William Thomas","is_primary":true,"pidm":94727}],"section_number":"A","catalog_credit_hour_ind":null,"instructional_method_code":null,"course_number":"4261","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":3,"subject_code":"CS","waitlist_avail":70,"seats_avail":4,"class_status_code":"A","seats_capacity":77,"campus_code":"A","catalog_credit_hour_high":null,"meeting_type_code":"A","waitlist_capacity":70},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":null,"begin_time":null,"end_time":null,"building_description":null,"begin_date":"2016-08-22","meeting_type_code":"H","meeting_type":"CLAS","room":null,"building_code":null}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Undergraduate Research","description":"Independent research conducted under the guidance of a faculty member.","crn":"92436","instructors":[{"name":"Ramachandran, Umakishore","is_primary":true,"pidm":1063182}],"section_number":"C13","catalog_credit_hour_ind":"TO","instructional_method_code":null,"course_number":"4699","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":1,"subject_code":"CS","waitlist_avail":0,"seats_avail":9,"class_status_code":"A","seats_capacity":10,"campus_code":"A","catalog_credit_hour_high":12,"meeting_type_code":"H","waitlist_capacity":0}],null];
	var coursesArray = data[0];
	//console.log(coursesArray);
	var arr = [];

	for (var i = 0; i < coursesArray.length; i++) {
		var elem = coursesArray[i];
		var subj = elem.subject_code + " " + elem.course_number;
		console.log(subj);
		if (arr.indexOf(subj) === -1) {
			arr.push(subj);
		}
	}
	res.send(arr);
});

app.get('/textbook/:class', function(req, res) {
	var course_id = req.params.class;
	console.log(process.env.DATABASE_URL);
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		console.log(course_id);
		client.query('SELECT * FROM textbook WHERE course_id=\'' + course_id + '\'', function(err, result) {
			done();
			if (err) {
				console.error(err); res.send("Error " + err);
			} else {
				res.send(result.rows);
				//res.render('pages/db', {results: result.rows});
			}
		});
	});
});

app.get('/buyerlisting/:isbn', function(req, res) {
	var isbn = req.params.isbn;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM exchange_info WHERE isbn=\'' + isbn + '\' AND buyer IS NULL AND seller IS NOT NULL', function(err, result) {
			done();
			if (err) {
				console.error(err); res.send("Error " + err);
			} else {
				res.send(result.rows);
				//res.render('pages/db', {results: result.rows});
			}
		});
	});
});

app.get('/db', function(req, res) {
	console.log(process.env.DATABASE_URL);
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * from test_table', function(err, result) {
			done();
			if (err) {
				console.error(err); res.send("Error " + err);
			} else {
				res.send(result.rows);
				//res.render('pages/db', {results: result.rows});
			}
		});
	});
});

// app.get('/splash', function(req, res) {
// 	res.send('Hello world');
// });

// app.get('/login', cas.bouncer, routes.login);
//app.get('/', cas.bounce, routes.login);

app.listen(app.get('port'), function () {
  console.log('Node app listening on port', app.get('port'));
});