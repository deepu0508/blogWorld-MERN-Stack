// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false, // use SSL
  auth: {
    user: '1a2b3c4d5e6f7g',
    pass: '1a2b3c4d5e6f7g',
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: 'yourusername@email.com',
  to: 'yourfriend@email.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});