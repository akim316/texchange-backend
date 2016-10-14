var express = require('express');
var request = require('request');

var app = express();

app.get('/', function(req, res) {
	request('http://m.gatech.edu/w/schedule/c/api/myschedule', function(error, response, body) {
		res.send(body);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});