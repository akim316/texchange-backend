var pg = require('pg');
var api_key = 'key-9577f2bebf17f3f9d5b19b44b2821b31';
var domain = 'texchange-cs4261.me';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.postTextbook = function(req, res) {
	var cost = req.query.cost;
	var seller = req.params.sellerId;
	var isbn = req.query.isbn;
	var condition = req.query.condition;
	var writing = req.query.writing;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("INSERT INTO exchange_info " + 
			"(listing_id, isbn, cost, buyer, seller, condition, writing) " +
			"VALUES (nextval('listing_seq'), $1::text, $2::money, $3::text, $4::text, $5::text, $6::text)",
			[isbn, cost, null, seller, condition, writing],
			function(err, result) {
				done();
				client.query("SELECT * FROM textbook WHERE isbn=$1", [isbn], function(err, result) {
					title = result.rows[0].title;
					author = result.rows[0].author;
					if (err) {
						console.error(err); res.send("Error " + err);
					} else {
						res.send({'post_cost': cost, 'isbn': isbn, 'title': title, 'author': author});
						//res.render('pages/db', {results: result.rows});
					}
				});
			});
	});

};
exports.listTransactions = function(req, res) {
	var sellerId = req.params.sellerId;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("SELECT * FROM exchange_info WHERE seller=$1", [sellerId],
			function(err, result) {
				done();
				var pending = [];
				var sold = [];
				for (var i = 0; i < result.rows.length; i++) {
					if (result.rows[i].buyer == null ||
						(result.rows[i].buyer != null && !result.rows[i].confirmed)) {
						pending.push(result.rows[i]);
					} 
					if (result.rows[i].buyer != null && result.rows[i].confirmed) {
						sold.push(result.rows[i]);
					}
				}
				if (err) {
					console.error(err); res.send("Error " + err);
				} else {
					res.send({'pending': pending, 'sold': sold});
					//res.render('pages/db', {results: result.rows});
				}
			});
	});
};

function sendSoldEmail(fromEmail, toEmail, title) {
	var data = {
		from: fromEmail + ' <' + fromEmail + '@gatech.edu>',
		to: toEmail + '@gatech.edu',
		subject: 'Texchange: Someone else has purchased the textbook you requested: ' + title + '!',
		text: 'Sorry, ' + fromEmail + ' has chosen a different buyer for ' + title +
			  '. Try looking again for this book using our app!' 
	}
	mailgun.messages().send(data, function (error, body) {
			console.log(body);
	});
}

function sendRemovedEmail(fromEmail, toEmail, title) {
	var data = {
		from: fromEmail + ' <' + fromEmail + '@gatech.edu>',
		to: toEmail + '@gatech.edu',
		subject: 'Texchange: The seller of the textbook ' + title + ' you requested has been removed!',
		text: 'Sorry, ' + fromEmail + ' has removed the book ' + title +
			  ' from being sold. Try looking again for this book using our app!' 
	}
	mailgun.messages().send(data, function (error, body) {
			console.log(body);
	});
}


exports.removePost = function(req, res) {
	var listingId = req.params.listingId;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("SELECT buyer, seller, exchange_info.isbn, textbook.title FROM exchange_info, textbook WHERE" + 
			" exchange_info.listing_id=$1 AND exchange_info.isbn = textbook.isbn", [listingId],
			function(err, result) {
				done();
				if (err) {
					console.error(err); res.send("Error " + err);
				} else {
					var buyers = result.rows[0].buyer;
					var seller = result.rows[0].seller;

					var title = result.rows[0].title;
					for (var i = 0; i < buyers.length; i++) {
						sendRemovedEmail(seller, buyers[i], title);
					}

					client.query("DELETE FROM exchange_info WHERE listing_id=$1", [listingId],
						function(err, result) {
							done();
							if (err) {
								console.error(err); res.send("Error " + err);
							} else {
								res.send("Successfully deleted post");
							}
						});
				}
			});
	});
};
exports.confirmPurchase = function(req, res) {
	var buyer = req.params.buyerId;
	var listingId = req.params.listingId;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("SELECT buyer, seller, exchange_info.isbn, textbook.title FROM exchange_info, textbook WHERE" + 
			" exchange_info.listing_id=$1 AND exchange_info.isbn = textbook.isbn", [listingId],
			function(err, result) {
				done();
				if (err) {
					console.error(err); res.send("Error " + err);
				} else {
					var buyers = result.rows[0].buyer;
					var seller = result.rows[0].seller;

					var title = result.rows[0].title;
					for (var i = 0; i < buyers.length; i++) {
						if (buyers[i] != buyer) sendSoldEmail(seller, buyers[i], title);
					}

					client.query("UPDATE exchange_info SET buyer='{\"" + buyer + "\"}', confirmed=true WHERE listing_id=" + listingId, 
						function(err, result) {
							done();
							if (err) {
								console.error(err); res.send("Error " + err);
							} else {
								res.send("Successfully updated transaction");
							}
						});
				}
			});
	});
};
exports.getRequestedList = function(req, res) {
	var listingId = req.params.listingId;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("SELECT buyer from exchange_info WHERE listing_id=" + listingId, 
			function(err, result) {
				done();
				if (err) {
					console.error(err); res.send("Error " + err);
				} else {
					res.send(result.rows[0]);
				}
			});
	});

};