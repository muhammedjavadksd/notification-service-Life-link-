const const_data = require("../const_data");


const mailTemplate = {


    newChatMessageEmailTemplate: (user_name, msg, from_name) => {
        return `Dear ${user_name},
            You have received a new message on your account from ${from_name}.Please log in to view and respond at your convenience.
            ${msg}
            If you have any questions, feel free to reach out.
            Best regards,
            Life Link`
    },

    accountVerificationEmailContent: (user_name, token) => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    a {
                        color: #3498db;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Dear ${user_name},</p>
                    <p>We need more details to complete your account setup. Please click the link below to provide the necessary information:</p>
                    <p>
                        <a href="https://localhost:3000/auth/complete/${token}">Complete account</a>
                    </p>
                    <p>If you have any questions or need assistance, feel free to reach out.</p>
                    <p>Best regards,<br>Life Link</p>
                </div>
            </body>
            </html>
        `;
    },


    fundraiserCloseVerificationTemplate: (token, recipientName, collectedAmount) => {
        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Fundraising Closure Verification</title>
        </head>
        <body>
            <p>Dear ${recipientName},</p>
            
            <p>We are reaching out to confirm the closure of your fundraising campaign. As part of our process, we require verification to ensure the security and integrity of the campaign. Please open the verification link provided below to confirm the closure of your fundraiser:</p>
            
            
            <p>The total amount collected during this campaign is <strong>Rs${collectedAmount}-/ only</strong>. Please verify this information and complete the closure process within the next 15 minutes to ensure that the funds are securely handled.</p>
            
            <p>If you did not request to close the fundraiser or if you need further assistance, please contact our support team immediately.</p>
            
            <p>Thank you for your efforts in supporting the cause.</p>
            <p><strong>Verification Token: ${process.env.FRONT_END_URL}/fund-raising/close/${token}</strong></p>
            
            <p>Best regards,</p>
            <p>Life Link</p>
        </body>
        </html>
        `;

        return template;
    },

    fundRaiserPaymentSuccess: (name, amount, title, download_url) => {
        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Your Donation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
                <tr>
                    <td>
                        <h2 style="color: #333;">Heartfelt Thanks for Your Generous Donation!</h2>
                        <p>Dear <strong>${name}</strong>,</p>
                        <p>I hope this message finds you well.</p>
                        <p>On behalf of <strong>Life Link</strong>, I want to extend our deepest gratitude for your generous contribution towards our recent fundraising campaign. Your donation of <strong>${amount}</strong> will make a significant impact on <strong>${title}</strong>.</p>
                        <p>Additionally, as a token of our appreciation, we’ve prepared a certificate for you. You can download it using the link below:</p>
                         <p><a href="${download_url}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Download Your Certificate</a></p>
                        <p>If you have any questions or need further information, feel free to reach out.</p>
                        <p>Warm regards,</p>
                        <p><strong>Life Link</strong><br>
                        +91 9744727684
                        contact@life-link.online
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        return template;
    },

    ticketClosedMail: (name, ticket_id, title) => {
        const template = `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Ticket Closed Notification</title>
                        <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            background-color: #f9f9f9;
                        }
                        h2 {
                            color: #333;
                        }
                        p {
                            color: #555;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <h2>Ticket ${ticket_id} Closed</h2>
                        <p>Dear ${name}</p>
                        <p>We are writing to inform you that your support ticket (ID: ${ticket_id}) titled "<strong>${title}</strong>" has been successfully closed.</p>
                        <p>If you have any further questions or need additional assistance, please don't hesitate to reach out to us.</p>
                        <p>Thank you for reaching out to us.</p>
                        <p>Best regards,<br />Life Link Support Team</p>
                        </div>
                    </body>
                    </html>
                    `;

        return template;
    },

    ticketClosedWarningMail: (name, ticket_id, title, close_date) => {
        const template = `<!DOCTYPE html>
        <html>
        <head>
            <title>Ticket Closure Warning</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #f8d7da;
                border-radius: 8px;
                background-color: #f8d7da;
                color: #721c24;
            }
            h2 {
                color: #721c24;
            }
            p {
                color: #555;
            }
            .highlight {
                font-weight: bold;
                color: #721c24;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <h2>Warning: Ticket ${ticket_id} Will Be Closed Soon</h2>
            <p>Dear ${name},</p>
            <p>
                We are sending you this message to inform you that your support ticket (ID: 
                <span class="highlight">${ticket_id}</span>) titled "<strong>${title}</strong>" is scheduled to be closed on 
                <strong>${close_date}</strong>.
            </p>
            <p>
                If your issue has not been resolved or if you require further assistance, please reach out to us before the 
                mentioned date to keep the ticket open.
            </p>
            <p>
                If no action is taken by the specified closure date, the ticket will be automatically closed.
            </p>
            <p>Thank you for your understanding.</p>
            <p>Best regards,<br />Life Link Support Team</p>
            </div>
        </body>
        </html>
        `;

        return template;
    },



    otpMailTemplate: (otp, recipientName) => {

        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
        </head>
        <body>
            <p>Dear ${recipientName},</p>
            
            <p>We are pleased to assist you with your account verification process. As part of our commitment to security, we have generated a One Time Password (OTP) for you. Please use the OTP provided below to complete the verification process:</p>
            
            <p><strong>OTP: ${otp}</strong></p>
            
            <p>This OTP will expire in 30 minutes for security reasons. Please ensure to complete the verification process within this time frame.</p>
            
            <p>If you did not request this OTP or need further assistance, please contact our support team immediately.</p>
            
            <p>Thank you for choosing our services.</p>
            
            <p>Best regards,</p>
            <p>LifeLink</p>
        </body>
        </html>
        `

        return template
    },

    adminForgetPasswordMailTemplate: (url, name) => {

        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
        </head>
        <body>
            <p>Dear ${name},</p>
        
            <p>We have received a request to reset the password for your Life Link admin account. If you did not make this request, please ignore this email. Otherwise, please follow the instructions below to reset your password.</p>
        
            <ol>
                <li>Click on the following link to reset your password:
                    <a href="${url}">${url}</a>
                </li>
                <li>You will be directed to a secure page where you can enter a new password. Please ensure your new password meets the following criteria:
                    <ul>
                        <li>At least 8 characters long</li>
                        <li>Contains both uppercase and lowercase letters</li>
                        <li>Includes at least one number</li>
                        <li>Contains at least one special character (e.g., !, @, #, $)</li>
                    </ul>
                </li>
                <li>After entering your new password, click "Submit" to complete the process.</li>
            </ol>
        
            <p>If you encounter any issues or need further assistance, please do not hesitate to contact our support team.</p>
        
            <p>Thank you for your prompt attention to this matter.</p>
        
            <p>Best regards,</p>
            <p>Life Link</p>
            <p>Developer Community</p>
        
            <hr>
        
            <p><strong>Important:</strong> For security reasons, this password reset link will expire in 30 minutes. If you do not reset your password within this time frame, you will need to submit a new request.</p>
        
            <hr>
        
            <p><strong>Security Tip:</strong> If you are using a shared or public computer, ensure you log out after resetting your password and clear the browser history to protect your account information.</p>
        
            <hr>
        
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </body>
        </html>
        `;
        return template
    },

    organizationForgetPasswordTemplate: (url, name) => {

        const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
        </head>
        <body>
            <p>Dear ${name},</p>
        
            <p>We have received a request to reset the password for your organization's account. If you did not make this request, please ignore this email. Otherwise, please follow the instructions below to reset your password.</p>
        
            <ol>
                <li>Click on the following link to reset your password:
                    <a href="${url}">${url}</a>
                </li>
                <li>You will be directed to a secure page where you can enter a new password. Please ensure your new password meets the following criteria:
                    <ul>
                        <li>At least 8 characters long</li>
                        <li>Contains both uppercase and lowercase letters</li>
                        <li>Includes at least one number</li>
                        <li>Contains at least one special character (e.g., !, @, #, $)</li>
                    </ul>
                </li>
                <li>After entering your new password, click "Submit" to complete the process.</li>
            </ol>
        
            <p>If you encounter any issues or need further assistance, please do not hesitate to contact our support team.</p>
        
            <p>Thank you for your prompt attention to this matter.</p>
        
            <p>Best regards,</p>
            <p>Your Organization Name</p>
            <p>Support Team</p>
        
            <hr>
        
            <p><strong>Important:</strong> For security reasons, this password reset link will expire in 30 minutes. If you do not reset your password within this time frame, you will need to submit a new request.</p>
        
            <hr>
        
            <p><strong>Security Tip:</strong> If you are using a shared or public computer, ensure you log out after resetting your password and clear the browser history to protect your account information.</p>
        
            <hr>
        
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </body>
        </html>
        `;

        return template
    },


    profileUpdateEmailTemplate: (email_id, otp, user_name) => {

        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Profile Update Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="border: 1px solid #dddddd; padding: 20px;">
                            <tr>
                                <td style="padding: 10px 0; text-align: center; font-size: 24px; font-weight: bold;">
                                    Important: Action Required to Update Your Profile
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    Dear ${user_name}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    We hope this message finds you well. To enhance your experience and ensure the security of your account, we request you to update your profile information.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    To complete the update, please follow these steps:
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 10px 0;">
                                    <strong>1. Enter the One-Time Password (OTP):</strong><br>
                                    An OTP has been sent to your registered email address. Please enter this OTP on the profile update page to verify your identity.<br>
                                    <span style="font-size: 18px; font-weight: bold;">Your OTP is: ${otp}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    <strong>2. Update Your Profile:</strong><br>
                                    Once verified, you will be able to update your profile information. Please ensure all details are accurate and up-to-date.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    <strong>3. Save Changes:</strong><br>
                                    After making the necessary updates, click on the "Save" button to finalize your changes.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    For security reasons, this OTP will expire in 30 minutes. If you did not request a profile update or need assistance, please contact our support team immediately at  Life Link Team
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px 0; text-align: center;">
                                    Thank you for your prompt attention to this matter.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    Best regards,<br>
                                   Life Link
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;


        return template;
    },


    bloodRequestEmail: (blood_group, full_name, location, date) => {

        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Urgent Blood Donation Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #e74c3c;
        }
        p {
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }
        .footer a {
            color: #e74c3c;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Urgent Blood Donation Request</h1>
        <p>Dear ${full_name},</p>
        <p>We have received an urgent blood donation request for a <strong>${blood_group}</strong> donor. Your profile indicates that you are a match, and we would like to ask if you can assist with this crucial need.</p>
        <p><strong>Details of the Request:</strong></p>
        <ul>
            <li><strong>Blood Type Needed:</strong> ${blood_group}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Date :</strong> ${date}</li>
        </ul>
        <p>If you are available and willing to donate, please sign in account</p>
        <p>Thank you for your willingness to help in this critical situation.</p>
        <p><a href="${process.env.FRONT_END_URL}/account">Open account</a></p>
        <div class="footer">
            <p>Best regards,</p>
            <p>Life Link<br>
        </div>
    </div>
</body>
</html>
        `;


        return template;
    }
}


module.exports = mailTemplate