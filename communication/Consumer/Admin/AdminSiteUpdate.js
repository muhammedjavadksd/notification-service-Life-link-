// const mailTemplate = require("../../../../config/template/mailTemplate");
const { communicationConnection } = require("../../../config");

const nodeMailer = require("nodemailer");
const mailTemplate = require("../../../config/template/mailTemplate");
const const_data = require("../../../config/const_data");

module.exports = async function adminSiteUpdate() {

    const queue = process.env.ADMIN_UPDATE_VERIFY;
    console.log("Admin forget password email");
    const channel = await communicationConnection();

    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {

        if (msg) {
            const jsonFormat = JSON.parse(msg.content.toString())
            console.log(jsonFormat);

            const { token, email_id } = jsonFormat;

            const url = `${process.env.FRONT_END_URL}/admin/auth/verify-update/${token}`

            const mailContent = mailTemplate.adminUpdateEmailTemplate(url)
            const mailTransport = nodeMailer.createTransport({
                service: const_data.MAIL_CONFIG.service,
                auth: const_data.MAIL_CONFIG.auth
            })

            // console.log(const_data.MAIL_CONFIG.auth.user)
            const mailOption = {
                from: const_data.MAIL_CONFIG.auth.user,
                to: email_id,
                subject: 'Admin Email ID Reset Request',
                html: mailContent
            };

            return new Promise((resolve, reject) => {
                mailTransport.sendMail(mailOption).then(() => {
                    console.log("Admin   email has been sent")
                }).catch((err) => {
                    console.log("Admin   email has been failed")
                    console.log(err)
                })
            })
        }
    }, { noAck: true })


}