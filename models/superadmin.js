const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const SuperAdminSchema = new Schema({
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
    role: {

        type: String,
        unique: true,
        default: "superadmin"

    }
    // socials: [
    //     facebook: {
    //         type: String
    //     },
        
    // ]
},{timestamps: true})


const SuperAdmin = mongoose.model('superadmin', SuperAdminSchema)

module.exports = SuperAdmin;

