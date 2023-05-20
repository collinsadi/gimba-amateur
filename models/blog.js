const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogschema = new schema({

    blog_title: {

        type: String,
        required: true,
    },
    blog_snippet: {

        type: String,
        required: true,
    },
    blog_category: {
        type: String,
        required: true,
    },
    blog_related_category: {

        type: String,
        required: true,
    },
    blog_body: {
        type: String,
        required: true,
    },
    blog_body_image_url:{

        type: String,
        required: true,
    }

}, {timestamps: true})

const BlogPost = mongoose.model('blogpost', blogschema)

module.exports = BlogPost