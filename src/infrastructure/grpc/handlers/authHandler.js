class AuthHandler {
    constructor(authUseCase) {
        this.authUseCase = authUseCase;
    }

    authenticate(call, callback) {
        const { token } = call.request;
        const result = this.authUseCase.execute(token);
        callback(null, result);
    }
}

module.exports = AuthHandler;
