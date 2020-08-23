//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

var totalOrders = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/restaurantDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const orderSchema = {
	name: String,
	quantity: Number,
};

const Order = mongoose.model("Order", orderSchema);

const dummy = new Order({
	name: "dummy",
	quantity: 0,
});

dummy.save();

Order.deleteOne({ name: "dummy" }, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("successfully deleted dummy order.");
	}
});

app.get("/", function (req, res) {
	res.render("menu");
});

app.post("/", function (req, res) {
	Order.find({ name: req.body.newOrder }, "name", function (
		err,
		foundInCart
	) {
		if (err) {
			console.log(err);
		} else {
			if (foundInCart.length > 0) {
				Order.updateOne(
					{ name: req.body.newOrder },
					{ $inc: { quantity: +1 } },
					function (err) {
						if (err) {
							console.log(err);
						} else {
							console.log("successfully updated the cart");
						}
					}
				);
			} else {
				const newOrder = new Order({
					name: req.body.newOrder,
					quantity: 1,
				});
				newOrder.save();
			}
		}
	});
});

app.get("/orders", function (req, res) {
	Order.find({}, function (err, foundOrders) {
		res.render("orders", { newOrders: foundOrders });
	});
});

app.post("/orders");
// Order.deleteOne({ quantity: 0 }, function (err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("succesfully deleted dummy order");
// 	}
// });

// app.post("/", function (req, res) {
// 	Order.updateOne(
// 		{ name: req.body.newOrder },
// 		{ $inc: { quantity: +1 } },
// 		function (err) {
// 			if (err) {
// 				console.log(err);
// 			} else {
// found = true;
// console.log("Successfully updated the cart");
// console.log(found);
// 		}
// 	}
// );
// if (found == false) {
// 	const newOrder = new Order({
// 		name: req.body.newOrder,
// 		quantity: 1,
// 	});
// 	newOrder.save();
// 	found = false;
// }
// });

Order.deleteMany({ quantity: 0 }, function (err) {
	if (!err) {
		console.log("Successfully deleted dummy order");
	}
});

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}
app.listen(port, function () {
	console.log("Server started successfully");
});
