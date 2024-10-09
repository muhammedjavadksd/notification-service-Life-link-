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
class MailService {
    constructor() {
        this.mailTransport = nodemailer_1.default.createTransport({
            service: const_data_1.default.MAIL_CONFIG.service,
            auth: const_data_1.default.MAIL_CONFIG.auth
        });
    }
    sendMail(to, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: const_data_1.default.MAIL_CONFIG.auth.user,
                to,
                subject,
                html
            };
            try {
                yield this.mailTransport.sendMail(mailOptions);
                console.log(`Mail sent to ${to}`);
                return true;
            }
            catch (error) {
                console.error(`Failed to send mail to ${to}`, error);
                return false;
            }
        });
    }
}
exports.default = MailService;
