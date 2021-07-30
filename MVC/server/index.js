const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const UserModel = require("./models/user");
const User = require("./models/user");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://test01:1234@mvc.0245s.mongodb.net/user?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/register", async (req, res) => {
  var result = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var nums = "0123456789";
  for (var i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * 3));
  }
  for (var i = 0; i < 3; i++) {
    result += nums.charAt(Math.floor(Math.random() * 3));
  }

  const name = req.body.userName;
  const age = req.body.userAge;

  String.prototype.isNumber = function () {
    return /^[a-zA-Z\ ]+$/.test(this);
  };

  const user = new UserModel({
    ID: result,
    userName: name,
    userAge: age,
    runDistance: 0,
  });
  if (name != "" && age > 0 && name.isNumber() == true) {
    try {
      await user.save();
      res.send("Your ID is " + user.ID);
    } catch (err) {
      console.log(err);
    }
  } else res.send("Pls Enter Info Correct");
});

app.put("/update", async (req, res) => {
  const run = req.body.runDistance;
  try {
    await UserModel.findOneAndUpdate(
      { ID: req.body.ID },
      { $inc: { runDistance: run } }
    );

    UserModel.find({ ID: req.body.ID }, "runDistance", function (err, data) {
      if (err) return next(err);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  UserModel.find({}).sort({"runDistance":-1}).exec((err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

app.listen(3001, () => {
  console.log("Server is running port 3001");
});
