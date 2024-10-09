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
const mailService_1 = __importDefault(require("./mailService"));
const communicationChannel_1 = __importDefault(require("./communicationChannel"));
class GenericMailConsumerService {
    constructor() {
        this.communication = new communicationChannel_1.default();
        this.mailService = new mailService_1.default();
    }
    consumeMessages(queue, templateFunction, subject, recipientEmailKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const assert = yield this.communication.assertQueue(queue);
            if (!assert) {
                console.log("No channel found");
                return;
            }
            this.communication.consume(queue, (message) => __awaiter(this, void 0, void 0, function* () {
                if (message) {
                    try {
                        const data = JSON.parse(message.content.toString());
                        console.log(`Consuming message from ${queue}:`, data);
                        const mailContent = templateFunction(data);
                        const isMailSent = yield this.mailService.sendMail(data[recipientEmailKey], subject, mailContent);
                        if (isMailSent) {
                            console.log('Mail sent successfully.');
                        }
                        else {
                            console.error('Mail sending failed.');
                            this.communication.nack(message);
                        }
                    }
                    catch (err) {
                        console.error(`Error processing message from ${queue}:`, err);
                        this.communication.nack(message);
                    }
                }
            }), { noAck: true });
        });
    }
}
exports.default = GenericMailConsumerService;
