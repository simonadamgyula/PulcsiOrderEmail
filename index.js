require("dotenv/config");
const express = require('express');
const sendEmail = require('./email.js');
const app = express();
const port = process.env.PORT || 3000;


app.post('/', (req, res) => {
    var bodyStr = '';
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });
    req.on("end", function () {
        const data = JSON.parse(bodyStr);

        console.log(data);

        const authToken = req.headers.authentication;
        console.log(req.headers, authToken, process.env.AUTH_TOKEN);

        if (authToken !== process.env.AUTH_TOKEN) {
            res.statusCode = 401;
            res.end();
            return;
        }

        sendEmail(data.person, data.orders)
            .then(data => res.end(data))
            .catch(error => {
                console.log(error);
                res.end(error);
            });
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
