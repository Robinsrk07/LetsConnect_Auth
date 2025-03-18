const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

class User {
    constructor({ name, email, password, photoUrl, about, gender, isPremium, memberShipType, town, pincode, dob,_id }) {
        this.name = name;
        this.emailId = email;
        this.password = password;
        this.photoUrl = photoUrl || []; // Ensure photoUrl is an array
        this.about = about;
        this.gender = gender;
        this.town = town;
        this.pincode = pincode;
        this.dob = dob;
        this.isPremium = isPremium;
        this.memberShipType = memberShipType;
        this._id =_id
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(userEnteredPassword) {
        return await bcrypt.compare(userEnteredPassword, this.password);
    }

    generateJWT() {
        return jwt.sign({ _id: this._id }, 'ROBIN@123', { expiresIn: '1d' });
    }
    
    async test(){
        console.log("hello")
        console.log("wen")
    }
    validate() {
        if (!this.name) {
            throw new Error('Name is not valid');
        }
        if (!validator.isEmail(this.emailId)) {
            throw new Error('Enter a valid email');
        }
        if (!validator.isStrongPassword(this.password)) {
            throw new Error('Please enter a strong password');
        }
    }

    static fromDatabase(userData) {
        return new User(userData);
    }
}

module.exports = User;