class VerifyOtpCase {
    constructor(otpService) {
        this.otpService = otpService;
    }

    async execute(email, otp) {
        return this.otpService.verifyOTP(email, otp); // Return result to handle errors properly
    }
}

module.exports = VerifyOtpCase;
