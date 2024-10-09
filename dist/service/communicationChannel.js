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
const amqplib_1 = __importDefault(require("amqplib"));
class MessageQueueService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                this.connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL || "");
                this.channel = yield this.connection.createChannel();
            }
            return this.channel;
        });
    }
    assertQueue(queueName_1) {
        return __awaiter(this, arguments, void 0, function* (queueName, options = { durable: true }) {
            const channel = yield this.connect();
            if (channel) {
                yield channel.assertQueue(queueName, options);
                return channel;
            }
            else {
                return null;
            }
        });
    }
    consume(queueName_1, callback_1) {
        return __awaiter(this, arguments, void 0, function* (queueName, callback, options = { noAck: true }) {
            const channel = yield this.assertQueue(queueName);
            if (channel) {
                yield channel.consume(queueName, callback, options);
            }
            else {
                return false;
            }
        });
    }
    nack(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.channel) {
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.nack(message);
            }
            else {
                console.log("Channel not found");
            }
        });
    }
}
exports.default = MessageQueueService;
