var pg = require('pg');

exports.getSchedule = function(req, res) {
	var gtid = req.params.gtId;
	var data = [[{"long_course_title":null,"course_attributes":[],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"TR","begin_time":"1205","end_time":"1325","building_description":"Clough Undergraduate Commons","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"152","building_code":"166"}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":4,"class_registration_start_date":null,"course_title":"Habitable Planet","description":"Introduction to the origin and evolution of Planet Earth, creation of the universe and the elements, early history of Earth, radioisotope geochemistry and the timing of events in the universe, the galaxy, and on Earth. Formation of the atmosphere and oceans. Climate.","crn":"80553","instructors":[{"name":"Reinhard, Christopher","is_primary":true,"pidm":2906379}],"section_number":"A","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"1601","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"EAS","waitlist_avail":0,"seats_avail":25,"class_status_code":"A","seats_capacity":304,"campus_code":"A","catalog_credit_hour_high":4,"meeting_type_code":"A","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"R","begin_time":"1505","end_time":"1755","building_description":"Van Leer","begin_date":"2016-08-22","meeting_type_code":"E","meeting_type":"CLAS","room":"E283","building_code":"085"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":0,"class_registration_start_date":null,"course_title":"Digital Design Lab","description":"Design and implementation of digital systems, including a team design project. CAD tools, project design methodologies, logic synthesis, and assembly language programming.","crn":"81553","instructors":[{"name":"Collins, Thomas Riley","is_primary":true,"pidm":90984}],"section_number":"L10","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"2031","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"ECE","waitlist_avail":0,"seats_avail":0,"class_status_code":"A","seats_capacity":20,"campus_code":"A","catalog_credit_hour_high":2,"meeting_type_code":"E","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"W","begin_time":"1205","end_time":"1455","building_description":"Clough Undergraduate Commons","begin_date":"2016-08-22","meeting_type_code":"E","meeting_type":"CLAS","room":"341","building_code":"166"}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":0,"class_registration_start_date":null,"course_title":"Habitable Planet","description":"Introduction to the origin and evolution of Planet Earth, creation of the universe and the elements, early history of Earth, radioisotope geochemistry and the timing of events in the universe, the galaxy, and on Earth. Formation of the atmosphere and oceans. Climate.","crn":"84760","instructors":[{"name":"Grantham, Meg Camille","is_primary":true,"pidm":200660}],"section_number":"W2","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"1601","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"EAS","waitlist_avail":0,"seats_avail":3,"class_status_code":"A","seats_capacity":24,"campus_code":"A","catalog_credit_hour_high":4,"meeting_type_code":"E","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[{"description":"Networking & Telecom (CS)","course_attribute_code":"NWTC"},{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"TR","begin_time":"0935","end_time":"1055","building_description":"College of Business","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"100","building_code":"172"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Computer Networking I","description":"See cc.gatech.edu\/regdates ","crn":"80266","instructors":[{"name":"Sanders, Matthew James","is_primary":true,"pidm":566071}],"section_number":"A","catalog_credit_hour_ind":null,"instructional_method_code":null,"course_number":"3251","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":3,"subject_code":"CS","waitlist_avail":90,"seats_avail":32,"class_status_code":"A","seats_capacity":200,"campus_code":"A","catalog_credit_hour_high":null,"meeting_type_code":"A","waitlist_capacity":90},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"F","begin_time":"1505","end_time":"1555","building_description":"Coll of Computing","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"16","building_code":"050"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":2,"class_registration_start_date":null,"course_title":"Digital Design Lab","description":"ECE 2031 CSA is for College of Computing majors only. ","crn":"84781","instructors":[{"name":"Bourgeois, Christina","is_primary":false,"pidm":1642255},{"name":"Collins, Thomas Riley","is_primary":true,"pidm":90984},{"name":"Johnson, Kevin Toby","is_primary":false,"pidm":1773013}],"section_number":"CSA","catalog_credit_hour_ind":"OR","instructional_method_code":null,"course_number":"2031","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":0,"subject_code":"ECE","waitlist_avail":0,"seats_avail":3,"class_status_code":"A","seats_capacity":45,"campus_code":"A","catalog_credit_hour_high":2,"meeting_type_code":"A","waitlist_capacity":0},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"MWF","begin_time":"1105","end_time":"1155","building_description":"MRDC","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"2404","building_code":"135"}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Statistics& Applications","description":"Major restricted until the last Wednesday of Phase II registration at noon. If course is full, please join the waitlist. ISYE does not grant overloads. Not allowed for IE majors. ","crn":"88336","instructors":[{"name":"Johnson, Ronald Lee","is_primary":true,"pidm":279197}],"section_number":"MW4","catalog_credit_hour_ind":null,"instructional_method_code":null,"course_number":"3770","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":3,"subject_code":"ISYE","waitlist_avail":75,"seats_avail":0,"class_status_code":"A","seats_capacity":60,"campus_code":"A","catalog_credit_hour_high":null,"meeting_type_code":"A","waitlist_capacity":75},{"long_course_title":null,"course_attributes":[],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":"MW","begin_time":"1635","end_time":"1755","building_description":"Howey (Physics)","begin_date":"2016-08-22","meeting_type_code":"A","meeting_type":"CLAS","room":"L2","building_code":"081"}],"class_grading_type_desc":"Letter Grade","class_grading_type_code":"L","term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Mobile Apps & Svcs","description":"Grad students:CS 8803MAS instead. See cc.gatech.edu\/regdates ","crn":"84762","instructors":[{"name":"Eason, William Thomas","is_primary":true,"pidm":94727}],"section_number":"A","catalog_credit_hour_ind":null,"instructional_method_code":null,"course_number":"4261","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":3,"subject_code":"CS","waitlist_avail":70,"seats_avail":4,"class_status_code":"A","seats_capacity":77,"campus_code":"A","catalog_credit_hour_high":null,"meeting_type_code":"A","waitlist_capacity":70},{"long_course_title":null,"course_attributes":[{"description":"Tech Elect CS, Engr, &Sciences","course_attribute_code":"TCES"}],"catalog_is_continuing_edu_unit":"N","meeting_times":[{"end_date":"2016-12-15","days":null,"begin_time":null,"end_time":null,"building_description":null,"begin_date":"2016-08-22","meeting_type_code":"H","meeting_type":"CLAS","room":null,"building_code":null}],"class_grading_type_desc":null,"class_grading_type_code":null,"term_code":"201608","class_credit_hours":null,"class_registration_start_date":null,"course_title":"Undergraduate Research","description":"Independent research conducted under the guidance of a faculty member.","crn":"92436","instructors":[{"name":"Ramachandran, Umakishore","is_primary":true,"pidm":1063182}],"section_number":"C13","catalog_credit_hour_ind":"TO","instructional_method_code":null,"course_number":"4699","class_registration_end_date":null,"part_of_term_code":"1","catalog_credit_hour_low":1,"subject_code":"CS","waitlist_avail":0,"seats_avail":9,"class_status_code":"A","seats_capacity":10,"campus_code":"A","catalog_credit_hour_high":12,"meeting_type_code":"H","waitlist_capacity":0}],null];
	var coursesArray = data[0];
	//console.log(coursesArray);
	var arr = [];

	for (var i = 0; i < coursesArray.length; i++) {
		var elem = coursesArray[i];
		if (elem.meeting_type_code == 'A') {
			var subj = elem.subject_code + " " + elem.course_number;
			var obj = {};
			for (var j = 0; j < elem.instructors.length; j++) {
				if (elem.instructors[j].is_primary) {
					obj = { 'course_id': subj, 'professor': elem.instructors[j].name };
					break;
				}
			}
			arr.push(obj);
			console.log(subj);
		}

	}
	res.send(arr);
};
exports.addCourse = function(req, res) {
	var professor = req.query.professor;
	var semester = req.query.semester;
	var courseId = req.params.courseId;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("INSERT INTO course " + 
			"(professor, semester, course_id) " +
			"VALUES ($1::text,$2::text,$3::text)",
			[professor, semester, courseId],
			function(err, result) {
				done();
				if (err) {
					console.error(err); res.send("Error " + err);
				} else {
					res.send(result.rows);
					//res.render('pages/db', {results: result.rows});
				}
			});
	});
};
exports.addTextbook = function(req, res) {
	var isbn = req.query.isbn;
	var name = req.query.name;
	var author = req.query.author;
	var edition = req.query.edition;
	var publisher = req.query.publisher;
	var courseId = req.params.courseId;
	var professor = req.params.professor;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("INSERT INTO textbook " + 
			"(isbn, title, author, publisher, edition, course_id, professor) " +
			"VALUES ($1::text,$2::text,$3::text[],$4::text,$5::text,$6::text,$7::text)",
			[isbn, name, author, publisher, edition, courseId, professor],
			function(err, result) {
				done();
				if (err) {
					console.error(err); res.send("Error " + err);
				} else {
					res.send(result.rows);
					//res.render('pages/db', {results: result.rows});
				}
			});
	});

};
exports.getTextbook = function(req, res) {
	var courseId = req.params.courseId;
	var professor = req.params.professor;
	console.log(process.env.DATABASE_URL);
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		console.log(courseId);
		client.query('SELECT * FROM textbook WHERE course_id=\'' + courseId + '\' AND professor=\'' + professor + '\'', function(err, result) {
			done();
			if (err) {
				console.error(err); res.send("Error " + err);
			} else {
				if (result.rows.length == 0) {
					client.query('SELECT * FROM textbook WHERE course_id=\'' + courseId + '\'', function(err, result) {
						if (err) {
							console.error(err); res.send("Error " + err);
						} else {
							res.send(result.rows);
						}
					});
				} else {
					res.send(result.rows);
				}
				//res.render('pages/db', {results: result.rows});
			}
		});
	});
};