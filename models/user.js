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
    password: {
        type: String,
        required: true
    },
    // socials: [
    //     facebook: {
    //         type: String
    //     },
        
    // ]
},{timestamps: true})


const User = mongoose.model('user', userSchema)

module.exports = User;

