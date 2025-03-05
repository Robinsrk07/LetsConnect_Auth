const nodemailer = require('nodemailer');

class Emailservice {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "robinsyriak07@gmail.com",
                pass: "lmqf gnjw gvlp daew",
            },
        });
    }

    async sendOTPEmail(receiverEmail, otp) {
        console.log("Sending OTP to:", receiverEmail); // Debugging
        const mailOptions = {
            from: 'robinsyriak07@gmail.com',
            to: receiverEmail,
            subject: 'OTP Verification',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                    <h2>OTP Verification</h2>
                    <p>Your one-time password is:</p>
                    <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP will expire in 1 minute.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`OTP sent to ${receiverEmail}`);
        } catch (err) {
            console.error(`Error sending OTP email: ${err.message}`);
            throw new Error('Failed to send OTP email');
        }
    }
}

module.exports = Emailservice;

