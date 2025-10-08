const express = require('express');
const sendEmail = require('./email.js');
const app = express();
const port = process.env.SERVER_PORT || 3000;


app.post('/', (req, res) => {
    var bodyStr = '';
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });
    req.on("end", function () {
        const data = JSON.parse(bodyStr);
        sendEmail(data.person, data.orders);

        res.end("ok");
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})