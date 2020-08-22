const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/restaurantDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const itemSchema = {
  name: String,
  quantity: Number,
  note: String,
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Gado-Gado",
  quantity: 1,
  note: "Jangan pedes",
});

const item2 = new Item({
  name: "Pecel",
  quantity: 2,
  note: "Kulit aja",
});

const item3 = new Item({
  name: "Sate",
  quantity: 3,
  note: "Daging aja",
});

const orderSchema = {
  tableNumber: Number,
  items: [itemSchema],
  timestamp: Date,
};

const Order = mongoose.model("Order", orderSchema);

const order1 = {
  tableNumber: 1,
  items: [item1, item2],
  timestamp: 01,
};

const order2 = {
  tableNumber: 2,
  items: [item2],
  timestamp: 02,
};

const order3 = {
  tableNumber: 3,
  items: [item3, item2, item1],
  timestamp: 03,
};

const order4 = {
  tableNumber: 4,
  items: [item2, item3, item1],
  timestamp: 04,
};

const dummyOrders = [order1, order2, order3, order4];

Order.insertMany(dummyOrders, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Insert Items successful!");
  }
});

// newOrders collection, fetch
app.get("/server/newOrders/fetch", function (req, res) {
  //get all orders in the new orders collection in db
  Order.find({}, function (err, foundOrders) {
    if (!err) {
      // console.log(foundOrders);
      res.send(foundOrders);
    } else {
      console.log(err);
    }
  });
  // res.send("michael wang here");
});

// newOrders collection, delete
app.post("/server/newOrders/delete", function (req, res) {
  // delete an order based on id

  // const orderId = req.body.orderId;
  const orderId = req.body.id;
  Order.findByIdAndRemove(orderId, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted order with Id: ", orderId);
    }
  });

  res.send("Successfully deleted order");
  // res.redirect("/") should we redirect? lets find out.
});

app.get("/server/test", function (req, res) {
  res.send("michael wang here");
});

app.listen("5000", function () {
  console.log("Started server with port 5000");
});
