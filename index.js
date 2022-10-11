const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');

const app = express();
app.use(cors)

const port = process.env.PORT || 5000
// const smtpLogin = process.env.SMTP_LOGIN || '...'
// const smtpPassword = process.env.SMTP_PASSWORD || '...'

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
        user: '',
        pass: '',
        // pass: '',
    },
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/sendMessage', async function (req, res) {
    let info = await transporter.sendMail({
        from: 'test name', // от кого
        to: "vovatraigel@gmail.com", // куда
        subject: "тестирую gmail", // тема сообщения
        // text: "Привет это моё соббщение", // текст сообщения
        html: "<b>Привет это моё соббщение</b>",
    });
});

app.listen(port, function () {
    console.log('Example app 5000')
});