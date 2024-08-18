const mailTemplate = require("../../../../config/template/mailTemplate");
const { communicationConnection } = require("../../../config");



async function bloodRequest() {

    const BLOOD_REQUEST_NOTIFICATION = process.env.BLOOD_REQUEST_NOTIFICATION
    try {

        const channel = await communicationConnection();
        await channel.assertQueue(BLOOD_REQUEST_NOTIFICATION, { durable: true });
        channel.consume(BLOOD_REQUEST_NOTIFICATION, (msg) => {

            console.log("Consuming BLOOD_REQUEST_NOTIFICATION");
            if (msg) {
                const parseMessage = JSON.parse(msg.content.toString());
                const { recipients, blood_group, deadLine, full_name, location } = parseMessage;

                const emailTemplate = mailTemplate.bloodRequestEmail(blood_group, full_name, location, deadLine);

                const mailTransport = nodeMailer.createTransport({
                    service: const_data.MAIL_CONFIG.service,
                    auth: const_data.MAIL_CONFIG.auth
                })


                console.log(const_data.MAIL_CONFIG.auth.user)
                const mailOption = {
                    from: const_data.MAIL_CONFIG.auth.user,
                    to: recipients,
                    subject: 'Blood request',
                    html: emailTemplate
                };

                return new Promise((resolve, reject) => {
                    mailTransport.sendMail(mailOption).then(() => {
                        console.log("Blood request has been sent")
                    }).catch((err) => {
                        console.log("Blood request has been failed")
                        console.log(err)
                    })
                })
            }
        }, { noAck: true })

    } catch (e) {

    }

}

// export default bloodRequest
module.exports = bloodRequest