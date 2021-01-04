import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // get information from body
    let { email, password, passwordCheck, displayName } = req.body;

    // validation of data

    // check if all fields entered
    if (!email || !password || !passwordCheck) {
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });
    }
    // check password length
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password needs to be at least 5 characters long." });
    }
    // check if passwords are same
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ message: "The passwords you have entered are not the same." });
    }

    // check if user with email already in database
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with that email has already been created.",
      });
    }

    // set username to email if no displayName given
    if (!displayName) {
      displayName = email;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      displayName,
    });
    const savedUser = await newUser.save();

    // send it to font end
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account with this email has been registered." });
    }

    // compare password given with hashedPassword in database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Now logged in, so can now create jwt to use
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    // send to front end
    res.json({
      token,
      user: { id: user._id, displayName: user.displayName, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
