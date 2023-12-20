// pull in express library
const express = require('express')
const router = express.Router()
// including model for course
const Course = require('../models/course')

// get courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// get course by id
router.get('/:id', (req, res) => {
    res.send(req.params.id)

})

// create course
router.post('/', async (req, res) => {
    const course = new Course ({
        courseCode: req.body.courseCode, 
        courseName: req.body.courseName,
        courseProgression: req.body.courseProgression, 
        coursePlan: req.body.coursePlan
    })

    try {
        const newCourse = await course.save()
        res.status(201).json(newCourse)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// update course
router.patch('/', (req, res) => {

})

// deleting course
router.delete('/:id', (req, res) => {

})

module.exports = router