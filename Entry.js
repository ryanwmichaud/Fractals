const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    title: String,
    author: String, 
    instructions: String
})

module.exports = mongoose.model('entry',entrySchema)

