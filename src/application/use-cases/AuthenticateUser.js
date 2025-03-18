const jwt = require('jsonwebtoken');
const  IAuthUseCase = require("../interfaces/IAuthUseCase")


class AuthenticateUser extends IAuthUseCase {
   
    execute(token) {
        console.log("hello here")
        if (!token) {
            return {
                authenticated: false,
                message: 'Authentication failed: No token provided',
                userId: null
            };
        }

        try {
            const decoded = jwt.verify(token, "ROBIN@123");
            console.log('DECODE',decoded);
            

            return {
                authenticated: true,
                message: 'Authentication successful',
                userId: decoded._id
            };
        } catch (error) {
            return {
                authenticated: false,
                message: 'Authentication failed: Invalid or expired token',
                userId: null
            };
        }
    }
}

module.exports = AuthenticateUser;
