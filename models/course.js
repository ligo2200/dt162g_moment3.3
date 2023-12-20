// pull in mongoose
const mongoose = require('mongoose')

// schema for courses
const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        require: true
    },
    courseName: {
        type: String,
        require: true
    },
    courseProgression: {
        type: String,
    },
    coursePlan: {
        type: String
    }

})

// export schema
module.exports = mongoose.model('Course', courseSchema)