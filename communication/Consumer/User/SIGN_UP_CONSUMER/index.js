const nodeMailer = require("nodemailer");
const mailTemplate = require("../../../../config/template/mailTemplate");
const const_data = require("../../../../config/const_data");
const { communicationConnection } = require("../../../config");
// const { communicationConnection } = require("../../../../config");


async function SignUpOTPConsumer() {

    const queue = process.env.USER_SIGN_UP_NOTIFICATION
    
    
    const channel = await communicationConnection();
    
    
    await channel.assertQueue(queue, { durable: true });
    console.log("Reached here");
    await channel.consume(queue, (message) => {
 
       console.log("Consume Sign Up OTP", message)
        if (message) {
            const data = JSON.parse(message.content.toString())
            console.log(data)

            const { otp, recipientName, recipientEmail } = data;
            const mailContent = mailTemplate.otpMailTemplate(otp, recipientName)


            const mailTransport = nodeMailer.createTransport({
                service: const_data.MAIL_CONFIG.service,
                auth: const_data.MAIL_CONFIG.auth
            })


            console.log(const_data.MAIL_CONFIG.auth.user)
            const mailOption = {
                from: const_data.MAIL_CONFIG.auth.user,
                to: recipientEmail,
                subject: 'Sign up OTP',
                html: mailContent
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
    },
        { noAck: true }
    );
}

module.exports = SignUpOTPConsumer