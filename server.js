// pull in dotenv library
require('dotenv').config();

// pull in express library
const express = require('express');

// expressfuncion put i variable app
const app = express();

// pull in mongoose library
const mongoose = require('mongoose');

// pull in cors
const cors = require('cors');


//connecting mongoose to mongodb
mongoose.connect(process.env.DATABASE_URL);
//variable with mongoose connection
const db = mongoose.connection;


// log errors
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


// allow use of json
app.use(express.json());

// enable cors
app.use(cors());


// route setup
const coursesRouter = require('./routes/courses')
// app use router
app.use('/courses', coursesRouter)


//expressfunction (in variable app) listens to port 3000
app.listen(3000, () => console.log('Server Started'))