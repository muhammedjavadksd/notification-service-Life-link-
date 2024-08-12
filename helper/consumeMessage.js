const amqplib = require("amqplib");
const nodeMailer = require("nodemailer");
const mailTemplate = require("../config/template/mailTemplate");
const const_data = require("../config/const_data");
const SignUpOTPConsumer = require("../communication/Consumer/User/SIGN_UP_CONSUMER/index");
const SingInConsumerOTP = require("../communication/Consumer/User/SING_IN_CONSUMER/Index");
const AdminForgetPasswordConsume = require("../communication/Consumer/Admin/ADMIN_FORGET_PASSWORD/index");
const profileUpdateNotificationConsumer = require("../communication/Consumer/User/PROFILE_UPDATE_CONSUMER");
const organizationForgetPassword = require("../communication/Consumer/Organization/Organization Forget Password");
const { default: bloodRequest } = require("../communication/Consumer/User/BLOOD_REQUEST");




async function consumeRabbitMQ() {



    SignUpOTPConsumer()
    SingInConsumerOTP()
    AdminForgetPasswordConsume()
    profileUpdateNotificationConsumer()
    organizationForgetPassword()
    bloodRequest()

    // const queue = process.env.USER_SIGN_UP_NOTIFICATION

    // const connection = await amqplib.connect("amqp://localhost");
    // const channel = await connection.createChannel();


    // await channel.assertQueue(queue, { durable: true });
    // await channel.consume(queue, (message) => {


    //     console.log("Consume", message)
    //     if (message) {
    //         let data = JSON.parse(message.content.toString())
    //         console.log(data)

    //         let { otp, recipientName, recipientEmail } = data;
    //         let mailContent = mailTemplate.otpForUserSignUp(otp, recipientName)


    //         let mailTransport = nodeMailer.createTransport({
    //             service: const_data.MAIL_CONFIG.service,
    //             auth: const_data.MAIL_CONFIG.auth
    //         })


    //         console.log(const_data.MAIL_CONFIG.auth.user)
    //         let mailOption = {
    //             from: const_data.MAIL_CONFIG.auth.user,
    //             to: recipientEmail,
    //             subject: 'Sign up OTP',
    //             html: mailContent
    //         };

    //         return new Promise((resolve, reject) => {
    //             mailTransport.sendMail(mailOption).then(() => {
    //                 console.log("User Sign Up OTP has been sent")
    //             }).catch((err) => {
    //                 console.log("User Sign Up OTP has been failed")
    //                 console.log(err)
    //             })
    //         })

    //     }
    // },
    //     { noAck: true }
    // );
}

module.exports = consumeRabbitMQ