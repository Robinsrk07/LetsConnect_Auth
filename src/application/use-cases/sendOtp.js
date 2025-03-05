  class SendOtpCase{
    constructor(otpService){
        this.otpService = otpService
    }
  async execute(email){
    await this.otpService.sendOTPEmail(email)
    return 'OTP sent successfully';
  }
  }

  module.exports = SendOtpCase