const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AdSchema = new Schema({

    Ad_image:{
        type: String,
        required: true,
    },
    Ad_title:{
        type: String,
        required: true,
    },
    Ad_description:{
        type: String,
        required: true,
    },
    Ad_link:{
        type: String,
    },
    ad_status: {
        type: String,
        default: "not active"
        
    }




},{timestamps: true})

const Ad = mongoose.model('ad', AdSchema)

module.exports = Ad;