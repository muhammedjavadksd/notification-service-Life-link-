import express from 'express'
import dotenv from 'dotenv'
import { consumersList } from './service/MailConsumer';
import GenericMailConsumerService from './service/GenericMailConsumer';
import TicketConsumerService from './service/TicketConsumer';
import BloodRequestNotificationService from './service/BloodServiceNotification';
const app = express();

dotenv.config({ path: "./.env" });

const PORT: number = +(process.env.PORT || 7003)

const consumerReciever = new GenericMailConsumerService();
const ticketConsumerService = new TicketConsumerService();
const bloodRequestNotificationService = new BloodRequestNotificationService();


consumersList.forEach((consumer) => {
    consumerReciever.consumeMessages(consumer.queue, consumer.mailTemplate, consumer.subject, consumer.recipientEmailKey);
})

ticketConsumerService.initializeConsumers()
bloodRequestNotificationService.consumeBloodRequestQueue()

app.listen(PORT, () => {
    console.log("Notification Service started at Port : " + PORT);
});



