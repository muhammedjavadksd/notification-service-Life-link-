import nodemailer from 'nodemailer';
import { Channel } from 'amqplib';
import const_data from '../config/const_data';
import MessageQueueService from './communicationChannel';
import mailTemplates from '../config/mailTemplate';

interface Recipient {
    email: string;
    name: string;
}

interface BloodRequestMessage {
    recipients: Recipient[];
    blood_group: string;
    deadLine: string;
    location: string;
}

export default class BloodRequestNotificationService {

    private async getChannel(queue: string): Promise<Channel | null> {
        try {
            const channel = new MessageQueueService();
            return await channel.assertQueue(queue, { durable: true });
        } catch (error) {
            console.error("Error connecting to RabbitMQ:", error);
            return null;
        }
    }

    private createMailTransport() {
        return nodemailer.createTransport({
            service: const_data.MAIL_CONFIG.service,
            auth: const_data.MAIL_CONFIG.auth
        });
    }

    private async sendBloodRequestEmails(message: BloodRequestMessage) {
        const { recipients, blood_group, deadLine, location } = message;
        const mailTransport = this.createMailTransport();

        for (const recipient of recipients) {
            const emailTemplate = mailTemplates.bloodRequestEmail(blood_group, recipient.name, location, deadLine);
            const mailOptions = {
                from: const_data.MAIL_CONFIG.auth.user,
                to: recipient.email,
                subject: 'Blood request',
                html: emailTemplate
            };
            try {
                await mailTransport.sendMail(mailOptions);
                console.log(`Blood request email sent to ${recipient.email}`);
            } catch (err) {
                console.error(`Failed to send email to ${recipient.email}:`, err);
            }
        }
    }

    async consumeBloodRequestQueue() {
        const BLOOD_REQUEST_NOTIFICATION = process.env.BLOOD_REQUEST_NOTIFICATION || '';
        const channel = await this.getChannel(BLOOD_REQUEST_NOTIFICATION);

        if (channel) {
            channel.consume(BLOOD_REQUEST_NOTIFICATION, async (msg) => {
                if (msg) {
                    const parsedMessage: BloodRequestMessage = JSON.parse(msg.content.toString());
                    console.log("Received message:", parsedMessage);
                    await this.sendBloodRequestEmails(parsedMessage);
                }
            }, { noAck: true });
        }
    }
}
