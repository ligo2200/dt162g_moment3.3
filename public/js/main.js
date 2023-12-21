/**
 * Code written by Linda Götenmark, ht 2023,
 * ligo2200@student.miun.se
 * Moment 3.3, DT162G - Javascript-baserad webbutveckling, Mittuniversitet in Sundsvall
 */

"use strict";

//url for jsondata
let url = "http://localhost:3000/courses";

//eventlistener for window load
window.onload = init;

//function when window loads

function init() {

    const form = document.getElementById('courses-form');
    form.addEventListener('submit', handleFormSubmit);

    //get jsondata
    fetch(url)
        .then(resp => resp.json())
        .then((data) => {
            getData(data); //data sent to function getData
        })
        .catch((error) => {
            console.error(error);
        })
}

// get courses to output-table
function getData(courses) {

    const outputcoursesEl = document.getElementById("output-courses");

    // empty data
    outputcoursesEl.innerHTML = "";

    console.log(courses);

    courses.forEach(course => {
        if (outputcoursesEl) {
            outputcoursesEl.innerHTML += `<tr><td>${course._id}</td><td>${course.courseId}</td><td>${course.courseName}</td><td>${course.coursePeriod}<td><button type="button" data-id="${course._id}" class="deletebtn">Radera</button></td></tr>`;
        }
    });

    let deletebtnEl = document.getElementsByClassName('deletebtn');

    for (let i = 0; i < deletebtnEl.length; i++) {
        deletebtnEl[i].addEventListener('click', deleteCourse);
    }
}

// function for adding new data
function handleFormSubmit(e) {
    e.preventDefault();

    const courseIdEl = document.getElementById("course-id").value;
    const courseNameEl = document.getElementById('course-name').value;
    const coursePeriodEl = document.getElementById('period').value;
    const messageEl = document.getElementById('message');

    // method for adding new data
    fetch('http://localhost:3000/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseId: courseIdEl,
            courseName: courseNameEl,
            coursePeriod: coursePeriodEl,
        }),
    })
        .then(response => response.json())
        .then(data => {
            messageEl.textContent = 'Kursen har lagts till.';
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// function for deleting course
function deleteCourse(event) {
    let id = event.target.dataset.id;

    // check if user want to delete
    const confirmDelete = confirm('Vill du verkligen radera denna kurs?');

    if (confirmDelete) {

        const messageEl = document.getElementById('message');

    fetch(url + "/" + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            messageEl.innerHTML = 'Kursen har raderats!';
            location.reload();
        })
        .catch(error => {
            console.log(error);
        });

    }    
}


