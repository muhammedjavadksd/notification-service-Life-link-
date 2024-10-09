// import mailTemplate from "../../../config/template/mailTemplate";
// import { communicationConnection } from "../../config";
// import { communicationConnection } from "../../config";
const mailTemplate = require("../../../config/mailTemplate");
const { communicationConnection } = require("../../config")
const nodeMailer = require("nodemailer");
const const_data = require("../../../config/const_data");


module.exports = async function CloseFundRaiserVerification() {
    const FUND_RAISER_CLOSE_NOTIFICATION = process.env.FUND_RAISER_CLOSE_NOTIFICATION
    try {
        console.log("Checking");
        const channel = await communicationConnection();
        await channel.assertQueue(FUND_RAISER_CLOSE_NOTIFICATION, { durable: true });
        await channel.consume(FUND_RAISER_CLOSE_NOTIFICATION, (message) => {
            console.log("Found msg");

            if (message) {
                const data = JSON.parse(message.content.toString())
                const { token, email_id, full_name, collected_amount } = data;
                const mailContent = mailTemplate.fundraiserCloseVerificationTemplate(token, full_name, collected_amount)


                const mailTransport = nodeMailer.createTransport({
                    service: const_data.MAIL_CONFIG.service,
                    auth: const_data.MAIL_CONFIG.auth
                })

                const mailOption = {
                    from: const_data.MAIL_CONFIG.auth.user,
                    to: email_id,
                    subject: 'Close fund raiser',
                    html: mailContent
                };

                return new Promise((resolve, reject) => {
                    mailTransport.sendMail(mailOption).then(() => {
                        console.log("Fund raiser close token has been sent")
                    }).catch((err) => {
                        console.log("Fund raiser close token senting failed")
                        console.log(err)
                    })
                })
            }

        }, { noAck: true })
    } catch (e) {
        console.log("Something went wrong");
    }
}    