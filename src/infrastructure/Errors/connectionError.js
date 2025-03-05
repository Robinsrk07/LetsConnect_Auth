class ConnectionError extends Error{
    constructor(message){
        super(message)
        this.name="NotFoundError",
        this.statusCode=401

    }
}
class DataBaseError extends Error{
    constructor(message){
       super()
       this.name= message,
       this.statusCode=401
    }
}

module.exports = {ConnectionError,DataBaseError}