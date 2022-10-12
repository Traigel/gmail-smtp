const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const smtpLogin = process.env.SMTP_LOGIN || 'email'
const smtpPassword = process.env.SMTP_PASSWORD || 'password'

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtpLogin,
        pass: smtpPassword,
    },
});

app.get('/', function (req, res) {
    res.send('Hello, my <a href="https://traihel.github.io/Portfolio">portfolio</a> ');
});

app.post('/sendMessage', async function (req, res) {
    const {name, email, formMessage} = req.body
    let info = await transporter.sendMail({
        from: 'My profile page', // от кого
        to: "vovatraigel@gmail.com", // куда
        subject: "Сообщение с вашего портфолио", // тема сообщения
        html: `<div><h1>Message from your portfolio</h1><div>Name: ${name}</div><div>Email: ${email}</div><div>Message: ${formMessage}</div></div>`,
    });
    res.send(res.body);
});

app.listen(port, function () {
    console.log(`Example app ${port}`)
});