class IUserRepository {
    findByEmail(email) {
        throw new Error("Method not implemented");
    }

    save(user) {
        throw new Error("Method not implemented");
    }
    updatePassword(){
        throw new Error("Method not implemented");

    }
    async updateUser(){
        throw new Error("Method not implemented");

        
    }
    async find(){
        throw new Error("Method not implemented");

    }
}

module.exports = IUserRepository;
