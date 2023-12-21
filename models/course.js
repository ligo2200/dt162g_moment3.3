// pull in mongoose
const mongoose = require('mongoose')

// schema for courses
const courseSchema = new mongoose.Schema({
    kurskod: {
        type: String,
        required: true
    },
    kursnamn: {
        type: String,
        required: true
    },
    Kursplan: {
        type: String
    },
    progression: {
        type: String
    },
    termin: {
        type: String
    }

})

// export schema
module.exports = mongoose.model('Course', courseSchema)