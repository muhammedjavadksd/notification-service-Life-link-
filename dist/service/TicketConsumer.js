"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicketNotificationService_1 = __importDefault(require("./TicketNotificationService"));
class TicketConsumerService {
    constructor() {
        this.consumerReceiver = new TicketNotificationService_1.default();
    }
    initializeConsumers() {
        this.consumerReceiver.closedNotification();
        this.consumerReceiver.ticketCloseWarning();
    }
}
exports.default = TicketConsumerService;
