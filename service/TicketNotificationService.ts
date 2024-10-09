import nodemailer from "nodemailer";
import { Channel } from "amqplib";
import const_data from "../config/const_data";
import mailTemplates from "../config/mailTemplate";
import MessageQueueService from "./communicationChannel";

interface TicketData {
    email: string;
    name: string;
    ticket_id: string;
    title: string;
    close_date?: string;
}

export default class TicketNotificationService {


    private async getChannel(queue: string): Promise<Channel | null> {
        try {
            const channel = new MessageQueueService();
            return channel.assertQueue(queue, { durable: true });
        } catch (error) {
            console.error("Error connecting to RabbitMQ:", error);
            return null;
        }
    }

    private createMailTransport() {
        return nodemailer.createTransport({
            service: const_data.MAIL_CONFIG.service,
            auth: const_data.MAIL_CONFIG.auth,
        });
    }

    private async sendBulkMail(data: TicketData[], templateFn: (data: TicketData) => string, subject: string) {
        const bulkMailPromises: Promise<any>[] = [];
        const mailTransport = this.createMailTransport();

        data.forEach((item) => {
            const mailContent = templateFn(item);
            const mailOptions = {
                from: const_data.MAIL_CONFIG.auth.user,
                to: item.email,
                subject: subject,
                html: mailContent,
            };
            bulkMailPromises.push(mailTransport.sendMail(mailOptions));
        });

        return Promise.all(bulkMailPromises)
            .then(() => {
                console.log(`${subject} mail has been sent.`);
            })
            .catch((err) => {
                console.error(`Error sending ${subject} mail:`, err);
            });
    }

    async closedNotification() {
        const TICKET_CLOSE_NOTIFICATION = process.env.TICKET_CLOSE_NOTIFICATION || '';
        const channel = await this.getChannel(TICKET_CLOSE_NOTIFICATION);

        if (channel) {
            channel.consume(TICKET_CLOSE_NOTIFICATION, async (message) => {
                if (message) {
                    const data: TicketData[] = JSON.parse(message.content.toString());
                    await this.sendBulkMail(data, (item) => mailTemplates.ticketClosedMail(item.name, item.ticket_id, item.title), "Ticket Closed Notification!");
                }
            }, { noAck: true });
        }
    }

    async ticketCloseWarning() {
        const TICKET_WARNING_NOTIFICATION = process.env.TICKET_WARNING_NOTIFICATION || '';
        const channel = await this.getChannel(TICKET_WARNING_NOTIFICATION);

        if (channel) {
            channel.consume(TICKET_WARNING_NOTIFICATION, async (message) => {
                if (message) {
                    const data: TicketData[] = JSON.parse(message.content.toString());
                    await this.sendBulkMail(
                        data,
                        (item) => mailTemplates.ticketClosedWarningMail(item.name, item.ticket_id, item.title, item.close_date || ""),
                        "Ticket Close Warning"
                    );
                }
            }, { noAck: true });
        }
    }
}
