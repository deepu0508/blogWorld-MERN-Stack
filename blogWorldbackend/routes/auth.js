const express = require("express");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const sha256 = require("js-sha256");
const verifyUser = require("../middleware/verifyUser");

const JWT_TOKEN = process.env.JWT_TOKEN;
const USER_KEY = process.env.USER_KEY;
const F_JWT_TOKEN = process.env.F_JWT_TOKEN;

// Router 1: Create User with valid Details using post Method
router.post(
  "/createuser",verifyUser,
  [
    body("name", "Enter valid name")
      .isLength({ min: 3 })
      .matches(/[a-zA-Z ]/gi),
    body("username", "Enter valid username(Alphanumeric)")
      .isAlphanumeric()
      .isLength({ min: 5 }),
    body("email", "Enter valid email id").isEmail(),
    body("password", "Enter valid password")
      .isStrongPassword()
      .isLength({ min: 8 }),
    body("mailid", "Mail id not found").matches(/[@gmail.com>]/gi),
  ],
  async (req, res) => {
    let success = false;
    try {
      // Check all input's are correct or not
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }
      // Username convert as Hash format
      const usernameHash = sha256.hmac(USER_KEY, req.body.username);
      // Search in Database User are already exists or not
      let user = await User.findOne({ success, usernameHash: usernameHash });
      if (user) {
        return res
          .status(400)
          .json({ errors: "Sorry, This Username User already exists." });
      }
      user = await User.findOne({ success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "Sorry, This Email id User already exists." });
      }

      // Password Encryption in Hash
      const salt = await bcrypt.genSalt(15);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // User data Create and save in Database
      user = await User.create({
        name: req.body.name,
        username: req.body.username,
        usernameHash: usernameHash,
        email: req.body.email,
        password: secPass,
        mailid: req.body.mailid,
      });

      // Create Authentication Token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_TOKEN);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success, errors: "Some Error Occured" });
    }
  }
);

// Router 2:Login User with Authentication using post method
router.post(
  "/login",verifyUser,
  [
    body("username", "Enter valid username")
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("password", "Enter valid password").isLength({ min: 8 }).exists(),
  ],
  async (req, res) => {
    let success = false;
    try {
      // Check input data are correct or not
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success, error: "Please enter valid details" });
      }
      // Check Username are valid, check through database
      const { username, password } = req.body;
      const usernameHash = await sha256.hmac(USER_KEY, username);
      const user = await User.findOne({usernameHash });

      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please enter valid username" });
      }

      // Check password is valid with present encrypted password in database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please enter valid password" });
      }

      // Create auth-token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      success = true;
      res.send({ success, authToken});
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Some error occurs "+error });
    }
  }
);

// Router 3:Fetch User data from database after Authentication
router.post("/getuser", fetchUser,verifyUser, async (req, res) => {
  let success = false;
  try {
    const UserId = req.user.id;
    const user = await User.findById(UserId).select("-password");
    success = true;
    res.send({ success, user, UserId });
  } catch (error) {
    console.error(error);
    success = false;
    res
      .status(400)
      .json({ success, error: "Please use valid authentication token "+error });
  }
});

// Router 4: Update Profile by user
router.post(
  "/updateprofile",
  fetchUser,verifyUser,
  [
    body("name", "Enter valid name")
      .isLength({ min: 3 })
      .matches(/[a-zA-Z ]/gi),
    // body("email", "Enter valid email id").isEmail(),
    body("password", "Enter valid password")
      .isStrongPassword()
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const userId = req.user.id;
      const { name, password, oldPassword } = req.body;
      // Check Inputs are correct or not
      const errros = validationResult(req);
      if (!errros.isEmpty()) {
        return res.status(400).json({ success, error: "Enter valid input" });
      }

      // Check oldPassword and current password are same or not
      // if (password === oldPassword) { return res.status(400).json({ success, error: "Please enter correct password" }) }

      // Check User data are present or not in db and access by same user
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Access by invalid user" });
      }

      // Same Email id user are exsits or not check it
      // const userdata = await User.findOne({ email: email });
      // if (!userdata) { return res.status(400).json({ success, error: "This emial id user already exists" }) }

      // Convert password into hash
      const salt = await bcrypt.genSalt(12);
      const hashPasswd = await bcrypt.hash(password, salt);

      // New update user
      const newUser = {
        name: name,
        password: hashPasswd,
      };

      const saveUser = await User.findByIdAndUpdate(
        userId,
        { $set: newUser },
        { new: true }
      ).select("-password");
      success = true;
      res.json({ success, saveUser });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success, error: "Some error occurs" });
    }
  }
);

// Router 5: Get bw_auth_token
router.post(
  "/bw_token",
  [body("metadata", "Enter valid metadata").isString()],
  async (req, res) => {
    let success = false;
    try {
      const time = new Date();
      const data = {
        metadata: req.body.metadata,
        time: time.getTime(),
      };
      const bw_auth_token = jwt.sign(data, F_JWT_TOKEN, {
        expiresIn: '12h',
      });
      // console.log(bw_auth_token);
      success = true;
      res.json({ success, bw_auth_token });
    } catch (error) {
      res.status(400).json({ success, errors: "Operation Failed " + error });
    }
  }
);

module.exports = router;
