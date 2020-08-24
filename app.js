//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

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
	note: String,
	isCompleted: Boolean,
};

const Order = mongoose.model("Order", orderSchema);

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
					isCompleted: false,
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

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}
app.listen(port, function () {
	console.log("Server started successfully");
});
