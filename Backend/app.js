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
    origin: "http://localhost:5173", // React frontend URL
    credentials: true, // Allow cookies with requests
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Signup Route
app.post("/api/signup", async (req, res) => {
  let { name, username, email, password, dob } = req.body;

  // Validate input data
  if (!name || !username || !email || !password || !dob) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the email or username already exists
    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email or username already exists" });
    }

    // Proceed with bcrypt hashing and user creation
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        console.error("Error generating salt:", err);
        return res.status(500).json({ error: "Error generating salt" });
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ error: "Error hashing password" });
        }

        try {
          let createdUser = await userModel.create({
            name,
            username,
            email,
            password: hash,
            dob,
          });

          let token = jwt.sign({ email }, "shhhhhhhhhhh");

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          res.status(201).json({ message: "User created", user: createdUser });
        } catch (error) {
          console.error("Error creating user:", error);
          res.status(500).json({ error: "Error creating user", details: error.message });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});



 

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email or username
    const user = await userModel.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      if (result) {
        const token = jwt.sign({ email: user.email }, "shhhhhhhhhhh");

        // Set the token in a cookie
        res.cookie("token", token, { httpOnly: true });

        // Respond with success message and token
        res.json({ message: "Login successful", token });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout Route
app.post("/api/logout", function (req, res) {
  // Clear the token from the cookies
  res.clearCookie("token");

  // Respond with success message
  res.json({ message: "Logged out successfully" });
});

// Start the server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
