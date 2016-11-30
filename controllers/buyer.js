var pg = require('pg');
var api_key = 'key-9577f2bebf17f3f9d5b19b44b2821b31';
var domain = 'texchange-cs4261.me';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.requestTextbook = function(req, res) {
	var cost = req.query.cost;
	var buyer = req.params.buyerId;
	var isbn = req.query.isbn;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("INSERT INTO exchange_info " + 
			"(listing_id, isbn, cost, buyer, seller) " +
			"VALUES (nextval('listing_seq'), $1::text, $2::money, $3, $4::text)",
			[isbn, cost, '{"' + buyer + '"}', null],
			function(err, result) {
				done();
				client.query("SELECT * FROM textbook WHERE isbn=$1", [isbn], function(err, result) {
					title = result.rows[0].title;
					author = result.rows[0].author;
					if (err) {
						console.error(err); res.send("Error " + err);
					} else {
						res.send({'request_cost': cost, 'isbn': isbn, 'title': title, 'author': author});
						//res.render('pages/db', {results: result.rows});
					}
				});
			});
	});

};
exports.purchaseTextbook = function(req, res) {
	var buyerId = req.params.buyerId;
	var listingId = req.params.listingId;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("UPDATE exchange_info SET buyer = array_append(buyer, \'" + buyerId + "\') WHERE listing_id = " + listingId, function(err, result) {
			done();
			var cost = 0;
			var isbn = "";
			var title = "";
			var author = [];
			var seller = "";
			client.query("SELECT * FROM exchange_info WHERE listing_id=$1", [listingId], function(err, result) {
				cost = result.rows[0].cost;
				isbn = result.rows[0].isbn;
				seller = result.rows[0].seller;
				client.query("SELECT * FROM textbook WHERE isbn=$1", [isbn], function(err, result) {
					title = result.rows[0].title;
					author = result.rows[0].author;
					if (err) {
						console.error(err); res.send("Error " + err);
					} else {
						var data = {
							from: buyerId + ' <' + buyerId + '@gatech.edu>',
							to: seller + '@gatech.edu',
							subject: 'Texchange: Someone has requested to buy your textbook: ' + title + '!',
							text: buyerId + ' has requested to purchase your book ' + title +
								  ' for ' + cost + '. Please use this email to communicate with the buyer about payment method, as well as exchange location and time. ' +
								  'Make sure to confirm the purchase in our app!' 
						}
						mailgun.messages().send(data, function (error, body) {
  							console.log(body);
						});
						res.send({'cost': cost, 'isbn': isbn, 'title': title, 'author': author, 'seller': seller});
						//res.render('pages/db', {results: result.rows});
					}
				});
			});
		});
	});

};

//dont show postings that which the buyer has already requested
exports.getAvailable = function(req, res) {
	var isbn = req.params.isbn;
	var userId = req.params.userId;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT e.*, t.title FROM exchange_info e, textbook t WHERE e.isbn = t.isbn AND e.isbn=\'' + isbn + '\' AND ' +
			'((e.buyer IS NULL AND e.seller IS NOT NULL) OR (e.buyer is NOT NULL and NOT EXISTS(SELECT 1 FROM unnest(e.buyer) as b WHERE b = \'' + userId + '\'' +
			') and e.seller is NOT NULL and e.confirmed is FALSE))', function(err, result) {
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
exports.getHistory = function(req, res) {
	var buyer = req.params.buyerId;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT e.*, t.title, t.author FROM exchange_info e, textbook t WHERE buyer @> \'{"' + buyer + '"}\' AND e.isbn=t.isbn', function(err, result) {
			done();

			var pending = [];
			var bought = [];

			for (var i = 0; i < result.rows.length; i++) {
				if (result.rows[i].seller == null) {
					pending.push(result.rows[i]);
				} else if (result.rows[i].seller != null && result.rows[i].buyer.length > 1) {
					pending.push(result.rows[i]);
				} else if (result.rows[i].seller != null && result.rows[i].buyer.length == 1) {
					bought.push(result.rows[i]);
				}
			}
			if (err) {
				console.error(err); res.send("Error " + err);
			} else {
				res.send({'pending': pending, 'bought': bought});
				//res.render('pages/db', {results: result.rows});
			}
		});
	});
};
exports.cancelRequest = function(req, res) {
	var buyerId = req.params.buyerId;
	var listingId = req.params.listingId;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('UPDATE exchange_info SET buyer = array_remove(buyer, \'' + buyerId + '\') WHERE listing_id=' + listingId, function(err, result) {
			done();

			if (err) {
				console.error(err); res.send("Error " + err);
			} else {
				res.send('Successfully updated transaction');
				//res.render('pages/db', {results: result.rows});
			}
		});
	});

};
