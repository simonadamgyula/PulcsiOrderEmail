const nodemailer = require("nodemailer");
const fs = require('node:fs');

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

/**
 * 
 * @param {string} html 
 * @param {string} person 
 * @param {string} order 
 * @returns {string}
 */
function formatHtml(html, person, orders) {
    var orderRows = "";
    var total = 0;
    for (const order of orders) {
        orderRows += fs.readFileSync('email/orderRow.html', 'utf8').format(order.productId, order.product, order.size, order.color, order.price, order.quantity, order.price * order.quantity)
        total += order.price * order.quantity;
    }

    return html.format(person.name, person.email, person.class, person.phone, orderRows, total);
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "jedlikpulcsi@gmail.com",
        pass: "pzmn guab butj nenu",
    },
});

const sendEmail = (to, person, orders) => {
    const mailOptions = {
        from: "jedlikpulcsi@gmail.com",
        to: to,
        subject: "Rendelés megerősítés",
        html: formatHtml(fs.readFileSync('email/index.html', 'utf8'), person, orders)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

module.exports = sendEmail;