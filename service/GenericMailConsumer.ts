import { Channel, ConsumeMessage } from 'amqplib';
import MailService from './mailService';
import MessageQueueService from './communicationChannel';

class GenericMailConsumerService {
    private mailService: MailService;
    private communication: MessageQueueService;

    constructor() {
        this.communication = new MessageQueueService();
        this.mailService = new MailService();
    }


    async consumeMessages(queue: string, templateFunction: (data: any) => string, subject: string, recipientEmailKey: string): Promise<void> {

        const assert = await this.communication.assertQueue(queue);
        if (!assert) {
            console.log("No channel found");
            return;
        }

        this.communication.consume(queue, async (message: ConsumeMessage | null) => {
            if (message) {
                try {
                    const data = JSON.parse(message.content.toString());
                    console.log(`Consuming message from ${queue}:`, data);

                    const mailContent = templateFunction(data);
                    const isMailSent = await this.mailService.sendMail(data[recipientEmailKey], subject, mailContent);

                    if (isMailSent) {
                        console.log('Mail sent successfully.');
                    } else {
                        console.error('Mail sending failed.');
                        this.communication.nack(message);
                    }
                } catch (err) {
                    console.error(`Error processing message from ${queue}:`, err);
                    this.communication.nack(message)
                }
            }
        },
            { noAck: true }
        );
    }
}

export default GenericMailConsumerService;
