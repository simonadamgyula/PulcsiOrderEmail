var http = require('http');
const sendEmail = require('./email.js');

console.log(process.env.PORT);

http.createServer(function (req, res) {
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            console.log("Received body: ", body);

            const data = JSON.parse(body);
            sendEmail(data.person, data.orders);

            res.end("ok");
        });
    }
}).listen(process.env.PORT);