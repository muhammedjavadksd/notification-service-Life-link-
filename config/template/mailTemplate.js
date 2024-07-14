

const mailTemplate = {



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
    }
}


module.exports = mailTemplate