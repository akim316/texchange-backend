module.exports = function (app) {
	var seller = require('./controllers/seller');
	var buyer = require('./controllers/buyer');
	var both = require('./controllers/both');

	app.get('/schedule/gtid/:gtId', both.getSchedule);
	app.get('/addcourse/course/:courseId', both.addCourse);
	app.get('/addtextbook/course/:courseId/professor/:professor', both.addTextbook);
	app.get('/textbook/course/:courseId/professor/:professor', both.getTextbook);


	app.get('/buyerrequest/buyer/:buyerId', buyer.requestTextbook);
	app.get('/buyerpurchase/buyer/:buyerId/listingid/:listingId', buyer.purchaseTextbook);
	app.get('/listingforbuyer/isbn/:isbn/buyer/:userId', buyer.getAvailable);
	app.get('/buyerhistory/buyer/:buyerId', buyer.getHistory);
	app.get('/cancelrequest/buyer/:buyerId/listing/:listingId', buyer.cancelRequest);

	app.get('/sellerpost/seller/:sellerId', seller.postTextbook);
	app.get('/sellertransactions/seller/:sellerId', seller.listTransactions);
	app.get('/removepost/listing/:listingId', seller.removePost);
	app.get('/requestedlist/listing/:listingId', seller.getRequestedList);
	app.get('/confirmpurchase/listing/:listingId/buyer/:buyerId', seller.confirmPurchase);
}