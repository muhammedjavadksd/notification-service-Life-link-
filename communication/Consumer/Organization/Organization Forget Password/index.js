const nodeMailer = require("nodemailer");
const mailTemplate = require("../../../../config/template/mailTemplate");
const const_data = require("../../../../config/const_data");
const { communicationConnection } = require("../../../config");
// const { communicationConnection } = require("../../../../config");


async function organizationForgetPassword() {

    const queue = process.env.ORGANIZATION_FORGETPASSWORD_EMAIL


    const channel = await communicationConnection();


    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        console.log("Organization Forget password", msg)

        if (msg) {
            let jsonFormat = JSON.parse(msg.content.toString())
            console.log(jsonFormat);

            let { token, email, name } = jsonFormat;

            let url = `${process.env.FRONT_END_URL}/organization/auth/reset_password/${token}`

            let mailContent = mailTemplate.organizationForgetPasswordTemplate(url, name)
            let mailTransport = nodeMailer.createTransport({
                service: const_data.MAIL_CONFIG.service,
                auth: const_data.MAIL_CONFIG.auth
            })

            // console.log(const_data.MAIL_CONFIG.auth.user)
            let mailOption = {
                from: const_data.MAIL_CONFIG.auth.user,
                to: email,
                subject: 'Organization Password Reset Request',
                html: mailContent
            };

            return new Promise((resolve, reject) => {
                mailTransport.sendMail(mailOption).then(() => {
                    console.log("Organization forget email has been sent")
                }).catch((err) => {
                    console.log("Organization forget email has been failed")
                    console.log(err)
                })
            })
        }
    }, { noAck: true })
}

module.exports = organizationForgetPassword