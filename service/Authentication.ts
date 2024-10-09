import mailTemplates from "../config/mailTemplate";
import MessageQueueService from "./communicationChannel";
import MailService from "./mailService";
import amqplib from 'amqplib'


class ConsumerService {
    private messageQueueService: MessageQueueService;
    private mailService: MailService;

    constructor() {
        this.messageQueueService = new MessageQueueService();
        this.mailService = new MailService();
    }

    async consume(queue: string, subject: string): Promise<void> {
        console.log(`Starting to consume  messages from ${queue}...`);
        await this.messageQueueService.consume(queue, this.processMessage.bind(this, subject), { noAck: true });
    }

    private async processMessage(subject: string, message: amqplib.ConsumeMessage | null): Promise<void> {
        if (!message) return;

        const data = JSON.parse(message.content.toString());
        console.log(`Processing ${subject} OTP:`, data);

        const { otp, recipientName, recipientEmail } = data;
        const mailContent = mailTemplates.otpMailTemplate(otp, recipientName);

        const sendMail = await this.mailService.sendMail(recipientEmail, subject, mailContent);
        if (sendMail) {
            console.log("Consum OTP mail has been sent");
        } else {
            console.log("Mail sending failed");
        }
    }
}

export default ConsumerService;
