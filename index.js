const nodeMailer = require('nodemailer')
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const { PORT = 4000} = process.env;

const server = express();
const { MY_EMAIL = '', MY_PASSWORD = ''} = process.env;
const user = MY_EMAIL;
const pass = MY_PASSWORD;

const transporter = nodeMailer.createTransport({
     host: 'smtp.gmail.com',
     port: 465,
     secure: true,
     auth: {
          user: user,
          pass: pass,
     },
})

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(express.static(path.join(__dirname,'./public')));



const subject = 'Birth day wishes'

server.post("/sendmail", (req, res) => {
     const {name, email, wish} = req.body;
     const mailOptions = {
          from:`${name}<${email}>`,
          to: user,
          subject: `Message from ${email}: ${subject}`,
          text: wish,
     }

    transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
               console.log(err);
               res.status(400).json("Error sending email");
          } else {
               console.log("Email sent successfully");
               res.status(200).json("Email sent successfully");
          }
     });
})


server.get(/^(\/|\/index(?:\.html)?)$/, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));