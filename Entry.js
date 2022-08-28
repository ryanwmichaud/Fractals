const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Entry',entrySchema)

