const express = require("express");
const app = express();
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Signup Route
app.post("/api/signup", async (req, res) => {
  let { username, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
      });
      let token = jwt.sign({ email }, "shhhhhhhhhhh");
      res.cookie("token", token);
      res.status(201).json({ message: "User created", user: createdUser });
    });
  });
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email OR username
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: email }],
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // Compare hashed passwords
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ email: user.email }, "shhhhhhhhhhh");
      res.cookie("token", token, { httpOnly: true });
      res.json({ message: "Login successful", token });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  });
});

// Logout
app.post("/api/logout", function (req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
