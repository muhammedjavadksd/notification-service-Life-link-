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
const communicationChannel_1 = __importDefault(require("./communicationChannel"));
const mailTemplate_1 = __importDefault(require("../config/mailTemplate"));
class BloodRequestNotificationService {
    getChannel(queue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = new communicationChannel_1.default();
                return yield channel.assertQueue(queue, { durable: true });
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
            auth: const_data_1.default.MAIL_CONFIG.auth
        });
    }
    sendBloodRequestEmails(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { recipients, blood_group, deadLine, location } = message;
            const mailTransport = this.createMailTransport();
            for (const recipient of recipients) {
                const emailTemplate = mailTemplate_1.default.bloodRequestEmail(blood_group, recipient.name, location, deadLine);
                const mailOptions = {
                    from: const_data_1.default.MAIL_CONFIG.auth.user,
                    to: recipient.email,
                    subject: 'Blood request',
                    html: emailTemplate
                };
                try {
                    yield mailTransport.sendMail(mailOptions);
                    console.log(`Blood request email sent to ${recipient.email}`);
                }
                catch (err) {
                    console.error(`Failed to send email to ${recipient.email}:`, err);
                }
            }
        });
    }
    consumeBloodRequestQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            const BLOOD_REQUEST_NOTIFICATION = process.env.BLOOD_REQUEST_NOTIFICATION || '';
            const channel = yield this.getChannel(BLOOD_REQUEST_NOTIFICATION);
            if (channel) {
                channel.consume(BLOOD_REQUEST_NOTIFICATION, (msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg) {
                        const parsedMessage = JSON.parse(msg.content.toString());
                        console.log("Received message:", parsedMessage);
                        yield this.sendBloodRequestEmails(parsedMessage);
                    }
                }), { noAck: true });
            }
        });
    }
}
exports.default = BloodRequestNotificationService;
