const const_data = require("../../../../config/const_data");
const { MAIL_CONFIG } = require("../../../../config/const_data");
const mailTemplate = require("../../../../config/template/mailTemplate");
const { communicationConnection } = require("../../../config");

const nodeMailer = require("nodemailer");

module.exports = async function AdminForgetPasswordConsume() {

    const queue = process.env.ADMIN_FORGETPASSWORD_EMAIL;
    console.log("Admin forget password email");
    // console.log(process.env.FRONT_END_URL);
    const channel = await communicationConnection();

    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        console.log("Reached her1");

        if (msg) {
            const jsonFormat = JSON.parse(msg.content.toString())
            console.log(jsonFormat);

            const { token, email, name } = jsonFormat;

            const url = `${process.env.FRONT_END_URL}/admin/auth/reset_password/${token}`

            const mailContent = mailTemplate.adminForgetPasswordMailTemplate(url, name)
            const mailTransport = nodeMailer.createTransport({
                service: const_data.MAIL_CONFIG.service,
                auth: const_data.MAIL_CONFIG.auth
            })

            // console.log(const_data.MAIL_CONFIG.auth.user)
            const mailOption = {
                from: const_data.MAIL_CONFIG.auth.user,
                to: email,
                subject: 'Admin Password Reset Request',
                html: mailContent
            };

            return new Promise((resolve, reject) => {
                mailTransport.sendMail(mailOption).then(() => {
                    console.log("Admin forget email has been sent")
                }).catch((err) => {
                    console.log("Admin forget email has been failed")
                    console.log(err)
                })
            })
        }
    }, { noAck: true })

}