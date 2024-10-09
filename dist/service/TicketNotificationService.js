"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const const_data_1 = __importDefault(require("../config/const_data"));
const mailTemplate_1 = __importDefault(require("../config/mailTemplate"));
const communicationChannel_1 = __importDefault(require("./communicationChannel"));
class TicketNotificationService {
    getChannel(queue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = new communicationChannel_1.default();
                return channel.assertQueue(queue, { durable: true });
            }
            catch (error) {
                console.error("Error connecting to RabbitMQ:", error);
                return null;
            }
        });
    }
    createMailTransport() {
        return nodemailer_1.default.createTransport({
            service: const_data_1.default.MAIL_CONFIG.service,
            auth: const_data_1.default.MAIL_CONFIG.auth,
        });
    }
    sendBulkMail(data, templateFn, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const bulkMailPromises = [];
            const mailTransport = this.createMailTransport();
            data.forEach((item) => {
                const mailContent = templateFn(item);
                const mailOptions = {
                    from: const_data_1.default.MAIL_CONFIG.auth.user,
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
        });
    }
    closedNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            const TICKET_CLOSE_NOTIFICATION = process.env.TICKET_CLOSE_NOTIFICATION || '';
            const channel = yield this.getChannel(TICKET_CLOSE_NOTIFICATION);
            if (channel) {
                channel.consume(TICKET_CLOSE_NOTIFICATION, (message) => __awaiter(this, void 0, void 0, function* () {
                    if (message) {
                        const data = JSON.parse(message.content.toString());
                        yield this.sendBulkMail(data, (item) => mailTemplate_1.default.ticketClosedMail(item.name, item.ticket_id, item.title), "Ticket Closed Notification!");
                    }
                }), { noAck: true });
            }
        });
    }
    ticketCloseWarning() {
        return __awaiter(this, void 0, void 0, function* () {
            const TICKET_WARNING_NOTIFICATION = process.env.TICKET_WARNING_NOTIFICATION || '';
            const channel = yield this.getChannel(TICKET_WARNING_NOTIFICATION);
            if (channel) {
                channel.consume(TICKET_WARNING_NOTIFICATION, (message) => __awaiter(this, void 0, void 0, function* () {
                    if (message) {
                        const data = JSON.parse(message.content.toString());
                        yield this.sendBulkMail(data, (item) => mailTemplate_1.default.ticketClosedWarningMail(item.name, item.ticket_id, item.title, item.close_date || ""), "Ticket Close Warning");
                    }
                }), { noAck: true });
            }
        });
    }
}
exports.default = TicketNotificationService;
