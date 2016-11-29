var express = require('express');
var request = require('request');
var http = require('http');
var cors = require('cors');
var session = require('express-session')
var https = require('https');
var parseString = require('xml2js').parseString;

var app = express();
app.use(cors());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "cree craw toad's foot geese walk barefoot"
}));
app.set('port', (process.env.PORT || 5000));
app.set('trust proxy', 1);

require('./routes')(app);

app.listen(app.get('port'), function () {
  console.log('Node app listening on port', app.get('port'));
});