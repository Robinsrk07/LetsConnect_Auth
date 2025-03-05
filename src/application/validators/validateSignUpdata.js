const validator = require("validator")
const {NotFoundError,ValidationError,AuthenticationError} = require("../errors/customError")


class SignUpValidator {
    constructor(data) {
        this.data = data;
    }

    validateName() {
        const { firstName, lastName } = this.data;
        if (!firstName || !lastName) {
            throw new ValidationError("Name is not valid");
        }
    }

    validateEmail() {
        const { emailId } = this.data;
        if (!validator.isEmail(emailId)) {
            throw new ValidationError("Enter a valid email");
        }
    }

    validatePassword() {
        const { password } = this.data;
        if (!validator.isStrongPassword(password)) {
            throw new ValidationError("Please enter a strong password");
        }
    }

    validate() {
        this.validateName();
        this.validateEmail();
        this.validatePassword();
    }
}

module.exports = SignUpValidator;