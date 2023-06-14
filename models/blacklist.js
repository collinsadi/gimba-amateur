const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlacklistSchema = new Schema({

    blacklistItem: {
        type: String,
        required: true,
        unique: true,
    }




},{timestamps: true})

const Blacklist = mongoose.model('blacklist', BlacklistSchema)

module.exports = Blacklist;