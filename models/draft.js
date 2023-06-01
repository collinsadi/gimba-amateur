const mongoose = require('mongoose');
const schema = mongoose.Schema;

const draftschema = new schema({

    blog_title: {

        type: String,
    },
    blog_snippet: {

        type: String,
    },
    blog_category: {
        type: String,
    },
    blog_related_category: {

        type: String,
    },
    blog_body: {
        type: String,
    },
    blog_body_image_url:{

        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

}, {timestamps: true})

const Draft = mongoose.model('draft', draftschema)

module.exports = Draft