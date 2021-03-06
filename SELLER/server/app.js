const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
const getApiAndEmit = "TODO";
const port = 4000;

let interval;

// define as false to update at initial render
var isUptodate = false;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => updateOrders(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const updateOrders = (socket) => {
  // Emitting a new message. Will be consumed by the client
  if (isUptodate === false) {
    console.log("do Update now!");
    socket.emit("isUptodate", isUptodate);
    isUptodate = true; // set back to true
    console.log("is Up to date!");
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));

// connect to mongo shell : mongo "mongodb+srv://mesen.yzchf.mongodb.net/mesenDB" --username admin
// password: admin
mongoose.connect("mongodb+srv://admin:admin@mesen.yzchf.mongodb.net/mesenDB", {
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

// Listen to change in "orders" collection in mongodb
// const collection = db.collection("orders");
// const changeStream = collection.watch();
const changeStream = Order.watch();
changeStream.on("change", (next) => {
  console.log("uehasda");
  isUptodate = false;
});

// Fetch orders from newOrders collection
app.get("/server/orders/fetch", function (req, res) {
  //get all orders in the new orders collection in db
  Order.find({ isCompleted: false }, function (err, foundOrders) {
    console.log(foundOrders);

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
