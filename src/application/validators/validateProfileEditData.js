const {ValidationError} = require("../errors/customError")


class validateProfileEditData {
    constructor(data){
        this.data = data,
        this. allowedUpdates=["firstName","lastName","about","photoUrl","skills","age","userId","gender"]
    }

    validateReq (){
        const IsValid = Object.keys(data).every((key)=>this.allowedUpdates.includes(key))
        if(!IsValid){
            throw new ValidationError("invalid data")
        }
    }

    validateSkillLimit() {
        if (this.data.skills && this.data.skills.length > 10) {
            throw new ValidationError("Skill limit exceeded. Maximum allowed is 10.");
        }
    }

    validate() {
        this.validateReq();
        this.validateSkillLimit();
    }
}


module.exports = validateProfileEditData;
