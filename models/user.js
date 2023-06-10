const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    useridname: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
    },
    twitter: {
        type: String,
    },
    website: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: String,
        default: "not verified"
    }
    // socials: [
    //     facebook: {
    //         type: String
    //     },
        
    // ]
},{timestamps: true})


const User = mongoose.model('user', userSchema)

module.exports = User;

