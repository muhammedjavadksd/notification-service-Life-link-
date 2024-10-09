const mailTemplate = require("../../../config/mailTemplate");


module.exports = async function chatEmail() {
    const PROFILE_CHAT_UPDATE = process.env.PROFILE_CHAT_UPDATE
    try {
        console.log("Checking");
        const channel = await communicationConnection();
        await channel.assertQueue(PROFILE_CHAT_UPDATE, { durable: true });
        await channel.consume(PROFILE_CHAT_UPDATE, (message) => {
            console.log("Found msg");

            if (message) {
                const data = JSON.parse(message.content.toString())
                const { msg, subject, email_id, reciver_name, from_name } = data;
                const mailContent = mailTemplate.newChatMessageEmailTemplate(reciver_name, msg, from_name)

                const mailTransport = nodeMailer.createTransport({
                    service: const_data.MAIL_CONFIG.service,
                    auth: const_data.MAIL_CONFIG.auth
                })

                const mailOption = {
                    from: const_data.MAIL_CONFIG.auth.user,
                    to: email_id,
                    subject: subject,
                    html: mailContent
                };

                return new Promise((resolve, reject) => {
                    mailTransport.sendMail(mailOption).then(() => {
                        console.log("Message receiving email sent")
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