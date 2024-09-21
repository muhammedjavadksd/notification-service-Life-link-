const { log } = require("forever");
const mailTemplate = require("../../../../config/template/mailTemplate");
const { communicationConnection } = require("../../../config");
const nodeMailer = require("nodemailer");
const const_data = require("../../../../config/const_data");


async function bloodRequest() {

    const BLOOD_REQUEST_NOTIFICATION = process.env.BLOOD_REQUEST_NOTIFICATION
    try {

        const channel = await communicationConnection();
        await channel.assertQueue(BLOOD_REQUEST_NOTIFICATION, { durable: true });
        console.log(BLOOD_REQUEST_NOTIFICATION);
        channel.consume(BLOOD_REQUEST_NOTIFICATION, async (msg) => {


            if (msg) {
                const parseMessage = JSON.parse(msg.content.toString());
                const { recipients, blood_group, deadLine, location } = parseMessage;
                console.log(parseMessage);

                const mailTransport = nodeMailer.createTransport({
                    service: const_data.MAIL_CONFIG.service,
                    auth: const_data.MAIL_CONFIG.auth
                })

                for (let profile of recipients) {

                    const emailTemplate = mailTemplate.bloodRequestEmail(blood_group, profile.name, location, deadLine);

                    const mailOption = {
                        from: const_data.MAIL_CONFIG.auth.user,
                        to: profile.email,
                        subject: 'Blood request',
                        html: emailTemplate
                    };

                    await mailTransport.sendMail(mailOption)
                }
            }
        }, { noAck: true })

    } catch (e) {
        console.log(e);
    }

}

// export default bloodRequest
module.exports = bloodRequest