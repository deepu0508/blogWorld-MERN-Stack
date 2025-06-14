const express = require("express");
const { body, validationResult } = require("express-validator");
// Import the Nodemailer library
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const verifyUser = require("../middleware/verifyUser");
dotenv.config();

const router = express.Router();

router.post(
  "/sendmail",
  [body("email", "Enter validate Email").isEmail()],verifyUser,
  async (req, res) => {
    let success = false;
    try {
      const EMAIL = "bratadipta1405@gmail.com";
      const CFOTP = Math.floor(Math.random() * 8999998 + 1000000);

      // Check all input's are correct or not
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      // Create a transporter object
      const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: "kuiy dnvz wlov djwq",
        },
      });
      const mailOptions = {
        from: `OTP from blogWorld <${EMAIL}>`,
        to: req.body.email,
        subject: "One Time Password(OTP) for Verification",
        html: `<h1>One Time Password(OTP)</h1>
            One Time Password(OTP) from blogWorld for verfication : ${CFOTP}`,
      };

      transpoter.sendMail(mailOptions, (err, info) => {
        if (err)
          res.status(400).json({ success, errors: "OTP Send Failed!", info });
        else {
          success = true;
          res.json({ success, info,otp:CFOTP });
        }
      });
    } catch (error) {
      res.status(400).json({ success, errors: "OTP Send Failed!" });
    }
  }
);

module.exports = router;
