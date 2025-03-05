const  IOTPService = require("../interfaces/IOTPService")

class OTPService extends IOTPService{
    constructor(emailservice){
        super()
        this.emailservice = emailservice
        this.otpStore = new Map()
    }
    generateOTP(length = 6) {
        let otp = '';
        const characters = '0123456789';
        for (let i = 0; i < length; i++) {
            otp += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log(otp);
        return otp;
    }


    verifyOTP(email, otp) {
        const storedData = this.otpStore.get(email);
        if (!storedData || storedData.otp !== otp || Date.now() > storedData.expiry) {
            throw new Error('Invalid or expired OTP');
        }
        this.otpStore.delete(email);
        return 'OTP verified successfully';
    }

    async sendOTPEmail(receiverEmail) {
        const otp = this.generateOTP();
        console.log("Generated OTP:", otp); // Log the OTP for debugging
    
        this.otpStore.set(receiverEmail, {
            otp: otp,
            expiry: Date.now() + 60000,
        });
    
        try {
            await this.emailservice.sendOTPEmail(receiverEmail, otp);
            console.log("OTP sent successfully to:", receiverEmail);
        } catch (err) {
            console.error("Error sending OTP email:", err);
            throw new Error('Failed to send OTP email');
        }
    }

}
module.exports =  OTPService