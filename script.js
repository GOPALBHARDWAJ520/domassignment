// Get the register form and student records table
const registerForm = document.getElementById('register-form');
const studentRecordsTable = document.getElementById('student-records-body');

// Get the local storage data
let studentRecords = JSON.parse(localStorage.getItem('studentRecords')) || [];

// Function to validate input fields
function validateInputFields() {
    const studentName = document.getElementById('student-name').value;
    const studentID = document.getElementById('student-id').value;
    const emailID = document.getElementById('email-id').value;
    const contactNo = document.getElementById('contact-no').value;

    if (!studentName.match(/^[a-zA-Z ]+$/)) {
        alert('Invalid student name');
        return false;
    }

    if (!studentID.match(/^[0-9]+$/)) {
        alert('Invalid student ID');
        return false;
    }

    if (!emailID.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        alert('Invalid email ID');
        return false;
    }

    if (!contactNo.match(/^[0-9]+$/)) {
        alert('Invalid contact number');
        return false;
    }

    return true;
}

// Function to add new student record
function addStudentRecord() {
    if (validateInputFields()) {
        const studentRecord = {
            studentName: document.getElementById('student-name').value,
            studentID: document.getElementById('student-id').value,
            emailID: document.getElementById('email-id').value,
            contactNo: document.getElementById('contact-no').value
        };

        studentRecords.push(studentRecord);
        localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
        displayStudentRecords();
        registerForm.reset();
    }
}

// Function to display student records
function displayStudentRecords() {
    studentRecordsTable.innerHTML = '';

    studentRecords.forEach((studentRecord, index) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${studentRecord.studentName}</td>
            <td>${studentRecord.studentID}</td>
            <td>${studentRecord.emailID}</td>
            <td>${studentRecord.contactNo}</td>
            <td><button class="edit-btn" onclick="editStudentRecord(${index})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteStudentRecord(${index})">Delete</button></td>
        `;

        studentRecordsTable.appendChild(tableRow);
    });
}

// Function to edit student record
function editStudentRecord(index) {
    const studentRecord = studentRecords[index];
    document.getElementById('student-name').value = studentRecord.studentName;
    document.getElementById('student-id').value = studentRecord.studentID;
    document.getElementById('email-id').value = studentRecord.emailID;
    document.getElementById('contact-no').value = studentRecord.contactNo;

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        studentRecords[index] = {
            studentName: document.getElementById('student-name').value,
            studentID: document.getElementById('student-id').value,
            emailID: document.getElementById('email-id').value,
            contactNo: document.getElementById('contact-no').value
        };
        localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
        displayStudentRecords();
    });
}

// Function to delete student record
function deleteStudentRecord(index) {
    studentRecords.splice(index, 1);
    localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
    displayStudentRecords();
}

// Add event listener to register button
document.getElementById('register-btn').addEventListener('click', addStudentRecord);

// Display student records on page load
displayStudentRecords();


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Use the data here
        studentRecords = data;
        displayStudentRecords();
    })
    .catch(error => console.error('Error loading data:', error));

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            // Use the data here
            studentRecords = data;
            displayStudentRecords();
        } else {
            console.error('Error loading data:', xhr.statusText);
        }
    };
    xhr.send();

    $.ajax({
        type: 'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(data) {
            // Use the data here
            studentRecords = data;
            displayStudentRecords();
        },
        error: function(xhr, status, error) {
            console.error('Error loading data:', error);
        }
    });    