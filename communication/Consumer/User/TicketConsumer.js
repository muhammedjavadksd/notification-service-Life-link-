const const_data = require("../../../config/const_data");
const mailTemplate = require("../../../config/template/mailTemplate");
const { communicationConnection } = require("../../config");
const nodeMailer = require("nodemailer");


const TicketNotification = {

    closedNotification: async function Ticket() {
        const TICKET_CLOSE_NOTIFICATION = process.env.TICKET_CLOSE_NOTIFICATION
        try {
            console.log("Checking");
            const channel = await communicationConnection();
            await channel.assertQueue(TICKET_CLOSE_NOTIFICATION, { durable: true });
            await channel.consume(TICKET_CLOSE_NOTIFICATION, (message) => {

                if (message) {
                    const bulkEmail = [];
                    const data = JSON.parse(message.content.toString())
                    for (let each = 0; each < data.length; each++) {
                        const { email, name, ticket_id, title } = data[each];
                        console.log(data);

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

                        console.log(mailOption);
                        bulkEmail.push(mailTransport.sendMail(mailOption))
                    }


                    return Promise.all(bulkEmail).then(() => {
                        console.log("Ticket close mail has been sent")
                    }).catch((err) => {
                        console.log("Ticket close mail has been sent")
                        console.log(err)
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

                    const bulkMail = []

                    for (let each = 0; each < data.length; each++) {


                        const { email, name, ticket_id, title, close_date } = data[each];

                        const mailContent = mailTemplate.ticketClosedWarningMail(name, ticket_id, title, close_date);

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

                        bulkMail.push(mailTransport.sendMail(mailOption))
                    }

                    Promise.all(bulkMail).then(() => {
                        console.log("Ticket close mail has been sent")
                    }).catch((err) => {
                        console.log("Ticket close mail has been sent")
                        console.log(err)
                    })
                }
            }, { noAck: true })
        } catch (e) {
            console.log("Something went wrong");
        }
    }
}

module.exports = TicketNotification;