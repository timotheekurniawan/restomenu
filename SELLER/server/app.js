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

const orderSchema = {
  isCompleted: Boolean,
  tableNumber: Number,
  items: [itemSchema],
  timestamp: Date,
};

const Order = mongoose.model("Order", orderSchema);

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

const order1 = {
  isCompleted: false,
  tableNumber: 1,
  items: [item1, item2],
  timestamp: 01,
};

const order2 = {
  isCompleted: false,
  tableNumber: 2,
  items: [item2],
  timestamp: 02,
};

const order3 = {
  isCompleted: false,
  tableNumber: 3,
  items: [item3, item2, item1],
  timestamp: 03,
};

const order4 = {
  isCompleted: false,
  tableNumber: 4,
  items: [item2, item3, item1],
  timestamp: 04,
};

const dummyOrders = [order1, order2, order3, order4];

// dummy orders
Order.insertMany(dummyOrders, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Insert Items successful!");
  }
});

// Fetch orders from newOrders collection
app.get("/server/orders/fetch", function (req, res) {
  //get all orders in the new orders collection in db
  Order.find({ isCompleted: false }, function (err, foundOrders) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundOrders);
    }
  });
});

// Delete an order based on the id from newOrders collection
app.post("/server/orders/delete", function (req, res) {
  const orderId = req.body.id;
  Order.findByIdAndRemove(orderId, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted order with Id: ", orderId);
      res.send(); // must res.send(); otherwise won't redirect back to the client.
    }
  });
});

// Set completed property of the order to true
app.post("/server/orders/complete", function (req, res) {
  const orderId = req.body.id;
  Order.findByIdAndUpdate(orderId, { isCompleted: true }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully completed order with Id: ", orderId);
      res.send();
    }
  });
});

app.get("/server/test", function (req, res) {
  res.send("michael wang here");
});

app.listen("5000", function () {
  console.log("Started server with port 5000");
});
