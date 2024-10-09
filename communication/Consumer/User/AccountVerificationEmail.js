const const_data = require("../../../config/const_data");
const mailTemplate = require("../../../config/mailTemplate");
const { communicationConnection } = require("../../config");
const nodeMailer = require("nodemailer");


module.exports = async function AccountVerificationEmail() {
    const ACCOUNT_SETUP_NOTIFICATION = process.env.ACCOUNT_SETUP_NOTIFICATION
    try {
        console.log("Checking");
        const channel = await communicationConnection();
        await channel.assertQueue(ACCOUNT_SETUP_NOTIFICATION, { durable: true });
        await channel.consume(ACCOUNT_SETUP_NOTIFICATION, (message) => {

            if (message) {
                const data = JSON.parse(message.content.toString())
                const { token, recipientName, recipientEmail } = data;
                const mailContent = mailTemplate.accountVerificationEmailContent(recipientEmail, token);

                const mailTransport = nodeMailer.createTransport({
                    service: const_data.MAIL_CONFIG.service,
                    auth: const_data.MAIL_CONFIG.auth
                })

                const mailOption = {
                    from: const_data.MAIL_CONFIG.auth.user,
                    to: recipientEmail,
                    subject: "Action Required: Account Details Needed",
                    html: mailContent
                };

                return new Promise((resolve, reject) => {
                    mailTransport.sendMail(mailOption).then(() => {
                        console.log("Account verification email sent")
                    }).catch((err) => {
                        console.log("Failed to send message")
                        console.log(err)
                    })
                })
            }

        }, { noAck: true })
    } catch (e) {
        console.log("Something went wrong");
    }
}