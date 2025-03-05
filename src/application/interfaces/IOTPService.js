class IOTPService {
    generateOTP(length) {
        throw new Error('Method not implemented');
    }
    async sendOTPEmail(receiverEmail) {
        throw new Error('Method not implemented');
    }
    
    verifyOTP(email, otp) {
        throw new Error('Method not implemented');
    }
}

module.exports = IOTPService;
