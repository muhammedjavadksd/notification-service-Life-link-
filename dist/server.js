"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const MailConsumer_1 = require("./service/MailConsumer");
const GenericMailConsumer_1 = __importDefault(require("./service/GenericMailConsumer"));
const TicketConsumer_1 = __importDefault(require("./service/TicketConsumer"));
const BloodServiceNotification_1 = __importDefault(require("./service/BloodServiceNotification"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./.env" });
const PORT = +(process.env.PORT || 7003);
const consumerReciever = new GenericMailConsumer_1.default();
const ticketConsumerService = new TicketConsumer_1.default();
const bloodRequestNotificationService = new BloodServiceNotification_1.default();
MailConsumer_1.consumersList.forEach((consumer) => {
    consumerReciever.consumeMessages(consumer.queue, consumer.mailTemplate, consumer.subject, consumer.recipientEmailKey);
});
ticketConsumerService.initializeConsumers();
bloodRequestNotificationService.consumeBloodRequestQueue();
app.listen(PORT, () => {
    console.log("Notification Service started at Port : " + PORT);
});
