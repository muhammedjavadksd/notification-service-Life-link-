import mailTemplates from "../config/mailTemplate";
import GenericMailConsumerService from "./GenericMailConsumer";

interface IConsumerList {
    queue: string,
    mailTemplate: (data: any) => string,
    subject: string,
    recipientEmailKey: string
}


export const consumersList: IConsumerList[] = [
    {
        queue: process.env.USER_SIGN_UP_NOTIFICATION || "",
        mailTemplate: ({ otp, recipientEmail }: { otp: number, recipientEmail: string }) => mailTemplates.otpMailTemplate(otp, recipientEmail),
        subject: "Sign up OTP",
        recipientEmailKey: 'recipientEmail'
    },
    {
        queue: process.env.USER_SIGN_IN_NOTIFICATION || "",
        mailTemplate: ({ otp, full_name }: { otp: number, full_name: string }) => mailTemplates.otpMailTemplate(otp, full_name),
        subject: "Sign In OTP",
        recipientEmailKey: 'email',
    },
    {
        queue: process.env.EMAIL_PROFILE_UPDATE_OTP || "",
        mailTemplate: ({ otp, full_name }: { otp: number, full_name: string }) => mailTemplates.profileUpdateEmailTemplate(otp, full_name),
        subject: "Proifle email update",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.ACCOUNT_SETUP_NOTIFICATION || "",
        mailTemplate: ({ token, recipientName, recipientEmail }: { token: string, recipientName: string, recipientEmail: string }) => mailTemplates.accountVerificationEmailContent(recipientName, token),
        subject: "Account need to be setup",
        recipientEmailKey: 'recipientEmail',
    },
    {
        queue: process.env.PROFILE_CHAT_UPDATE || "",
        mailTemplate: ({ msg, subject, email_id, reciver_name, from_name }: { msg: string, subject: string, email_id: string, reciver_name: string, from_name: string }) => mailTemplates.newChatMessageEmailTemplate(reciver_name, msg, from_name),
        subject: "New message",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.FUND_RAISER_CLOSE_NOTIFICATION || "",
        mailTemplate: ({ token, email_id, full_name, collected_amount }: { token: string, email_id: string, full_name: string, collected_amount: string }) => mailTemplates.fundraiserCloseVerificationTemplate(token, full_name, collected_amount),
        subject: "Close fund raiser verification",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.FUND_RAISER_PAYMENT_SUCCESS || "",
        mailTemplate: ({ certificate_url, name, amount, campign_title, email }: { certificate_url: string, name: string, amount: string, campign_title: string, email: string }) => mailTemplates.fundRaiserPaymentSuccess(name, amount, campign_title, certificate_url),
        subject: "Donation success",
        recipientEmailKey: 'email',
    },
    {
        queue: process.env.ADMIN_UPDATE_VERIFY || "",
        mailTemplate: ({ token, email_id }: { token: string, email_id: string }) => {
            const url = `${process.env.FRONT_END_URL}/admin/auth/verify-update/${token}`
            return mailTemplates.adminUpdateEmailTemplate(url)
        },
        subject: "Admin update verification",
        recipientEmailKey: 'email_id',
    },
    {
        queue: process.env.ADMIN_FORGETPASSWORD_EMAIL || "",
        mailTemplate: ({ token, email, name }: { token: string, email: string, name: string }) => {
            const url = `${process.env.FRONT_END_URL}/admin/auth/reset_password/${token}`
            return mailTemplates.adminForgetPasswordMailTemplate(url, name)
        },
        subject: "Admin reset password verification",
        recipientEmailKey: 'email',
    }

]



