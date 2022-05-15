require("dotenv").config();
require("./config/database").connect();
const auth = require("./middleware/auth");

const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("./model/user");
const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!(email && password && fullname && role)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      role
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );
      user.token = token;
      res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
  res.json({status: 500, mess: "Error"})
});

app.get("/welcome", auth, (req, res) => {
  res.send("Welcome");
});
module.exports = app;