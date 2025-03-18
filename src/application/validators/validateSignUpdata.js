const validator = require("validator")
const {NotFoundError,ValidationError,AuthenticationError} = require("../errors/customError")


class SignUpValidator {
    constructor(data) {
        this.data = data;
    }

    validateName() {
        const { name} = this.data;
        if (!name) {
            throw new ValidationError("Name is not valid");
        }
    }

    validateEmail() {
        const { email} = this.data;
        if (!validator.isEmail(email)) {
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