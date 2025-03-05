class AuthController {
    constructor({ signUpUseCase, loginUseCase, sendOtpCase, verifyOtp }) {
        this.signUpUseCase = signUpUseCase;
        this.loginUseCase = loginUseCase;
        this.sendOtp = sendOtpCase;
        this.verifyOtp = verifyOtp;
    }

    async signUp(req, res, next) {
        try {
            const user= await this.signUpUseCase.execute(req.body);
           // res.cookie('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
            res.json({ message: 'User added successfully', data: user });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { emailId, password } = req.body;
            const { user, token } = await this.loginUseCase.execute(emailId, password);
            res.cookie('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            res.cookie("token", null, { expires: new Date(Date.now()) }).send("user logged out");
        } catch (err) {
            next(err);
        }
    }

    async SendOtp(req, res, next) {
        try {
            console.log("reach");
            
            const { email } = req.body;
            await this.sendOtp.execute(email);
            res.send('OTP sent successfully');
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async VerifyOtp(req, res, next) {
        try {
            const { email, otp } = req.body;
            await this.verifyOtp.execute(email, otp);
            res.send('OTP verified successfully');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;