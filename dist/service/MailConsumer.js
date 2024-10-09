"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumersList = void 0;
const mailTemplate_1 = __importDefault(require("../config/mailTemplate"));
exports.consumersList = [
    {
        queue: process.env.USER_SIGN_UP_NOTIFICATION || "",
        mailTemplate: ({ otp, recipientEmail }) => mailTemplate_1.default.otpMailTemplate(otp, recipientEmail),
        subject: "Sign up OTP",
        recipientEmailKey: 'recipientEmail'
    },
    {
        queue: process.env.USER_SIGN_IN_NOTIFICATION || "",
        mailTemplate: ({ otp, full_name }) => mailTemplate_1.default.otpMailTemplate(otp, full_name),
        subject: "Sign In OTP",
        recipientEmailKey: 'email',
    },
    {
        queue: process.env.EMAIL_PROFILE_UPDATE_OTP || "",
        mailTemplate: ({ otp, full_name }) => mailTemplate_1.default.profileUpdateEmailTemplate(otp, full_name),
        subject: "Proifle email update",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.ACCOUNT_SETUP_NOTIFICATION || "",
        mailTemplate: ({ token, recipientName, recipientEmail }) => mailTemplate_1.default.accountVerificationEmailContent(recipientName, token),
        subject: "Account need to be setup",
        recipientEmailKey: 'recipientEmail',
    },
    {
        queue: process.env.PROFILE_CHAT_UPDATE || "",
        mailTemplate: ({ msg, subject, email_id, reciver_name, from_name }) => mailTemplate_1.default.newChatMessageEmailTemplate(reciver_name, msg, from_name),
        subject: "New message",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.FUND_RAISER_CLOSE_NOTIFICATION || "",
        mailTemplate: ({ token, email_id, full_name, collected_amount }) => mailTemplate_1.default.fundraiserCloseVerificationTemplate(token, full_name, collected_amount),
        subject: "Close fund raiser verification",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.FUND_RAISER_PAYMENT_SUCCESS || "",
        mailTemplate: ({ certificate_url, name, amount, campign_title, email }) => mailTemplate_1.default.fundRaiserPaymentSuccess(name, amount, campign_title, certificate_url),
        subject: "Donation success",
        recipientEmailKey: 'email',
    },
    {
        queue: process.env.ADMIN_UPDATE_VERIFY || "",
        mailTemplate: ({ token, email_id }) => {
            const url = `${process.env.FRONT_END_URL}/admin/auth/verify-update/${token}`;
            return mailTemplate_1.default.adminUpdateEmailTemplate(url);
        },
        subject: "Admin update verification",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.ADMIN_FORGETPASSWORD_EMAIL || "",
        mailTemplate: ({ token, email, name }) => {
            const url = `${process.env.FRONT_END_URL}/admin/auth/reset_password/${token}`;
            return mailTemplate_1.default.adminForgetPasswordMailTemplate(url, name);
        },
        subject: "Admin reset password verification",
        recipientEmailKey: 'email',
    }
];
