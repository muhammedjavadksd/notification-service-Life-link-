import amqplib, { ConsumeMessage } from 'amqplib'

class MessageQueueService {

    private connection: amqplib.Connection | null;
    private channel: amqplib.Channel | null

    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        if (!this.connection) {
            this.connection = await amqplib.connect(process.env.RABBITMQ_URL || "");
            this.channel = await this.connection.createChannel();
        }
        return this.channel;
    }

    async assertQueue(queueName: string, options = { durable: true }): Promise<amqplib.Channel | null> {
        const channel = await this.connect();
        if (channel) {
            await channel.assertQueue(queueName, options);
            return channel;
        } else {
            return null
        }
    }

    async consume(queueName: string, callback: (msg: ConsumeMessage | null) => void, options = { noAck: true }) {
        const channel = await this.assertQueue(queueName);
        if (channel) {
            await channel.consume(queueName, callback, options);
        } else {
            return false;
        }
    }

    async nack(message: ConsumeMessage) {
        if (this.channel) {
            this.channel?.nack(message)
        } else {
            console.log("Channel not found");
        }
    }
}


export default MessageQueueService
