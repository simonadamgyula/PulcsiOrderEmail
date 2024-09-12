var http = require('http');
const sendEmail = require('./email.js');

const person = {
    id: "",
    name: "Kiss Pista",
    email: "jedlikpulcsi@gmail.com",
    class: "10.A",
    phone: "06301234567"
}

const orders = [
    {
        productId: "red_gepesz_back",
        product: "Gépész Pulcsi",
        size: "M",
        color: "Piros",
        price: 6000,
        quantity: 2
    },
    {
        productId: "blue_info_back",
        product: "Infós Pulcsi",
        size: "S",
        color: "Kék",
        price: 6000,
        quantity: 1
    }
]

http.createServer(function (req, res) {
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            console.log("Received body: ", body);

            const data = JSON.parse(body);
            sendEmail(data.email, data.person, data.orders);

            res.end("ok");
        });
    }
}).listen(process.env.PORT);