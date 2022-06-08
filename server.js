const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
// MAIL CONFIGURATION
const mg = mailgun({ apiKey: process.env.api_key, domain: process.env.DOMAIN });
app.get("/", (req, res)=> {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/getPdf', function(req, res) {
    res.download('./Resume-Ayodeji-Adebola.pdf');
  });
app.post('/send-mail', (req, res)=> {
    const subject = req.body.subject;
    const body = req.body.message;
    const email = req.body.email;
    const name = req.body.name
    const data = {
        from: email,
        to: "dopeman827@gmail.com",
        subject: `${subject}`,
        html: `<p>Hello Ayodeji,</p><br/><p>My name is ${name}.</p><p>${body}</p>`
      };
      mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
          return res.send({result: "An Error Occured" })
        }
        console.log("Message has been sent");
        return res.send({result: "Success", message: "Message has been sent" })
      });
});
app.disable("x-powered-by");
/* ----------Port Section-----------*/
//var PORT = process.env.PORT || 5000;
app.set("port", process.env.PORT || 5000);
app.listen(app.get('port'), () => {
  console.log("The application is runing a port: ", app.get('port'));
});