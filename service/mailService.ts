import nodemailer from 'nodemailer'
import const_data from '../config/const_data';


interface IMailService {
    sendMail(to: string, subject: string, html: string): Promise<boolean>
}

class MailService implements IMailService {

    private readonly mailTransport;

    constructor() {
        this.mailTransport = nodemailer.createTransport({
            service: const_data.MAIL_CONFIG.service,
            auth: const_data.MAIL_CONFIG.auth
        });
    }

    async sendMail(to: string, subject: string, html: string): Promise<boolean> {
        const mailOptions = {
            from: const_data.MAIL_CONFIG.auth.user,
            to,
            subject,
            html
        };

        try {
            await this.mailTransport.sendMail(mailOptions);
            console.log(`Mail sent to ${to}`);
            return true
        } catch (error) {
            console.error(`Failed to send mail to ${to}`, error);
            return false
        }
    }
}

export default MailService
