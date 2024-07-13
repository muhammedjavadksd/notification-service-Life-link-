const const_data = require("../../../../config/const_data");
const { MAIL_CONFIG } = require("../../../../config/const_data");
const mailTemplate = require("../../../../config/template/mailTemplate");
const { communicationConnection } = require("../../../config");

const nodeMailer = require("nodemailer");

module.exports = async function AdminForgetPasswordConsume() {

    let queue = process.env.ADMIN_FORGETPASSWORD_EMAIL;
    console.log(queue);
    let channel = await communicationConnection();

    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        console.log("Reached her1");

        if (msg) {
            let jsonFormat = JSON.parse(msg.content.toString())
            console.log(jsonFormat);

            let { token, email, name } = jsonFormat;

            let url = `${process.env.FRONT_END_URL}/admin/auth/reset_password/${token}`

            let mailContent = mailTemplate.adminForgetPasswordMailTemplate(url, name)
            let mailTransport = nodeMailer.createTransport({
                service: const_data.MAIL_CONFIG.service,
                auth: const_data.MAIL_CONFIG.auth
            })

            // console.log(const_data.MAIL_CONFIG.auth.user)
            let mailOption = {
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