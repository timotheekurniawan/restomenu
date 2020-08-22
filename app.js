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

app.get("/", function (req, res) {
	res.render("menu");
});

app.post("/", function (req, res) {
	var order = req.body.newOrder;

	Order.find({ name: order }, function (err, foundInCart) {
		if (err) {
			console.log(err);
		} else {
			if (foundInCart.name === order) {
				Order.update({ name: order }, { $inc: { quantity: +1 } });
			} else {
				Order.insertOne({ name: order, quantity: 1 });
			}
		}
	});

	// totalOrders.push(order);
	// console.log(totalOrders);
});

// app.listen(3000, function () {
// 	console.log("Server started on port 3000");
// });
let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}
app.listen(port, function () {
	console.log("Server started successfully");
});
