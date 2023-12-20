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
router.get('/:id', getCourse, (req, res) => {
    res.send(res.course)

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
router.patch('/:id', getCourse, async (req, res) => {
    //check if body is not empty
    if (req.body.courseCode != null) {
        res.course.courseCode = req.body.courseCode
    }
    if (req.body.courseName != null) {
        res.course.courseName = req.body.courseName
    }
    if (req.body.courseProgression != null) {
        res.course.courseProgression = req.body.courseProgression
    }
    if (req.body.coursePlan != null) {
        res.course.coursePlan = req.body.coursePlan
    }

    try {
        const updatedCourse = await res.course.save()
        res.json(updatedCourse)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// deleting course
router.delete('/:id', getCourse, async (req, res) => {
    try {
        await res.course.deleteOne()
        res.json({ message: "Kurs raderad" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware function (getting id)
async function getCourse(req, res, next) {
    try {
        course = await Course.findById(req.params.id)

        // if course doesn't exist
        if (course == null) {
            return res.status(404).json({ message: "Kan inte hitta kurs" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.course = course
    next()
}

module.exports = router