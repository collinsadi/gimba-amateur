const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Notificationschema = new schema({

    notification_title: {

        type: String,
        required: true,
    },
    receiver: {

        type: String,
        // ref: "User",
        required: true,
    },
    notification_body: {

        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Delivered"
    }
}, {timestamps: true})

const Notification = mongoose.model('notification', Notificationschema)

module.exports = Notification