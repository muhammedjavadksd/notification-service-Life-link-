
const mailTemplate = require("../../../config/template/mailTemplate");
const { communicationConnection } = require("../../config")
const nodeMailer = require("nodemailer");
const const_data = require("../../../config/const_data");


module.exports = async function FundRaiserPaymentSucessMail() {
    const FUND_RAISER_PAYMENT_SUCCESS = process.env.FUND_RAISER_PAYMENT_SUCCESS
    try {
        console.log("Checking");
        const channel = await communicationConnection();
        await channel.assertQueue(FUND_RAISER_PAYMENT_SUCCESS, { durable: true });
        await channel.consume(FUND_RAISER_PAYMENT_SUCCESS, (message) => {

            if (message) {
                const data = JSON.parse(message.content.toString())
                const { certificate_url, name, amount, campign_title, email } = data;
                const mailContent = mailTemplate.fundRaiserPaymentSuccess(name, amount, campign_title, certificate_url);

                const mailTransport = nodeMailer.createTransport({
                    service: const_data.MAIL_CONFIG.service,
                    auth: const_data.MAIL_CONFIG.auth
                })

                const mailOption = {
                    from: const_data.MAIL_CONFIG.auth.user,
                    to: email,
                    subject: 'Heartfelt Thanks for Your Generous Donation!',
                    html: mailContent
                };

                return new Promise((resolve, reject) => {
                    mailTransport.sendMail(mailOption).then(() => {
                        console.log("Fund raiser success payment has been sent")
                    }).catch((err) => {
                        console.log("Fund raiser success payment senting failed")
                        console.log(err)
                    })
                })
            }

        }, { noAck: true })
    } catch (e) {
        console.log("Something went wrong");
    }
}    