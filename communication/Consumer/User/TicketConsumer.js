const const_data = require("../../../config/const_data");
const mailTemplate = require("../../../config/template/mailTemplate");
const { communicationConnection } = require("../../config");


const TicketNotification = {

    closedNotification: async function Ticket() {
        const TICKET_CLOSE_NOTIFICATION = process.env.TICKET_CLOSE_NOTIFICATION
        try {
            console.log("Checking");
            const channel = await communicationConnection();
            await channel.assertQueue(TICKET_CLOSE_NOTIFICATION, { durable: true });
            await channel.consume(TICKET_CLOSE_NOTIFICATION, (message) => {

                if (message) {
                    const data = JSON.parse(message.content.toString())
                    const { email, name, ticket_id, title } = data;

                    const mailContent = mailTemplate.ticketClosedMail(name, ticket_id, title);

                    const mailTransport = nodeMailer.createTransport({
                        service: const_data.MAIL_CONFIG.service,
                        auth: const_data.MAIL_CONFIG.auth
                    })

                    const mailOption = {
                        from: const_data.MAIL_CONFIG.auth.user,
                        to: email,
                        subject: 'Ticket Closed Notification!',
                        html: mailContent
                    };

                    return new Promise((resolve, reject) => {
                        mailTransport.sendMail(mailOption).then(() => {
                            console.log("Ticket close mail has been sent")
                        }).catch((err) => {
                            console.log("Ticket close mail has been sent")
                            console.log(err)
                        })
                    })
                }

            }, { noAck: true })
        } catch (e) {
            console.log("Something went wrong");
        }
    },

    ticketCloseWarning: async function Ticket() {
        const TICKET_WARNING_NOTIFICATION = process.env.TICKET_WARNING_NOTIFICATION
        try {
            console.log("Checking");
            const channel = await communicationConnection();
            await channel.assertQueue(TICKET_WARNING_NOTIFICATION, { durable: true });
            await channel.consume(TICKET_WARNING_NOTIFICATION, (message) => {

                if (message) {
                    const data = JSON.parse(message.content.toString())
                    const { email, name, ticket_id, title, close_date } = data;

                    const mailContent = mailTemplate.ticketClosedMail(name, ticket_id, title);

                    const mailTransport = nodeMailer.createTransport({
                        service: const_data.MAIL_CONFIG.service,
                        auth: const_data.MAIL_CONFIG.auth
                    })

                    const mailOption = {
                        from: const_data.MAIL_CONFIG.auth.user,
                        to: email,
                        subject: 'Ticket Closed Notification!',
                        html: mailContent
                    };

                    return new Promise((resolve, reject) => {
                        mailTransport.sendMail(mailOption).then(() => {
                            console.log("Ticket close mail has been sent")
                        }).catch((err) => {
                            console.log("Ticket close mail has been sent")
                            console.log(err)
                        })
                    })
                }

            }, { noAck: true })
        } catch (e) {
            console.log("Something went wrong");
        }
    }
}

module.exports = TicketNotification;