const const_data = require("../../../../config/const_data");
const mailTemplate = require("../../../../config/template/mailTemplate");
const { communicationConnection } = require("../../../config");
const nodeMailer = require("nodemailer");


async function profileUpdateNotificationConsumer() {

    let queueName = process.env.EMAIL_PROFILE_UPDATE_OTP;

    try {

        let channel = await communicationConnection();
        await channel.assertQueue(queueName, { durable: true });
        channel.consume(queueName, (msg) => {


            console.log("Consuming auth transfer data");
            if (msg) {
                let parseMessage = JSON.parse(msg.content.toString());
                let { email_id, type, otp, full_name } = parseMessage;

                let emailTemplate = mailTemplate.profileUpdateEmailTemplate(email_id, otp, full_name);

                let mailTransport = nodeMailer.createTransport({
                    service: const_data.MAIL_CONFIG.service,
                    auth: const_data.MAIL_CONFIG.auth
                })


                console.log(const_data.MAIL_CONFIG.auth.user)
                let mailOption = {
                    from: const_data.MAIL_CONFIG.auth.user,
                    to: email_id,
                    subject: 'Profile update OTP',
                    html: emailTemplate
                };

                return new Promise((resolve, reject) => {
                    mailTransport.sendMail(mailOption).then(() => {
                        console.log("User Sign Up OTP has been sent")
                    }).catch((err) => {
                        console.log("User Sign Up OTP has been failed")
                        console.log(err)
                    })
                })
            }
        }, { noAck: true })

    } catch (e) {

    }

}


module.exports = profileUpdateNotificationConsumer;