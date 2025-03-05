const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoUrl: { type: [String] },
    skills: { type: [String] },
    age: { type: Number },
    about: { type: String },
    gender: { type: String },
    isPremium:{
        type:Boolean,
        default :false
    },
    memberShipType:{
        type: String
    }
    
},{
    timeStamps:true

});

module.exports = mongoose.model('User', userSchema);