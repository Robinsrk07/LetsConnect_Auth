class dataError extends Error{
    constructor(message){
        super(message)
        this.name="dataError",
        this.statusCode=401

    }
}

module.exports = dataError