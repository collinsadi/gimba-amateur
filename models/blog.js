const mongoose = require('mongoose')
const schema = mongoose.Schema;

const blogschema = new schema({

    blog_title: {

        type: String,
        required: true
    },
    blog_snippet: {

        type: String,
        required: true
    },
    blog_category: {

        type: String,
        required: true

    },
    min_read: {

        type: String,
        required: true,
    }
})