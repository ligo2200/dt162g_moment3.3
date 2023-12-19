// pull in express library
const express = require('express')
const router = express.Router()

// get courses
router.get('/', (req, res) => {
    res.send('Hello wolrd!')
})

// get course by id
router.get('/:id', (req, res) => {
    res.send(req.params.id)

})

// create course
router.post('/', (req, res) => {

})

// update course
router.patch('/', (req, res) => {

})

// deleting course
router.delete('/:id', (req, res) => {

})

module.exports = router