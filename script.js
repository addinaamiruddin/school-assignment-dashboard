// JavaScript code for student's dashboard

const assignmentTable = document.getElementById("assignment-table");

// Retrieve assignments from local storage
const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function login(userType) {
    localStorage.setItem("userType", userType);

    // Redirect to the respective dashboard based on user type
    if (userType === "teacher") {
        window.location.href = "teacher.html";
    } else if (userType === "student") {
        window.location.href = "index.html";
    }
}


// Function to update assignment status based on due date and submission
function updateAssignmentStatus(assignment) {
    const currentDate = new Date();
    const dueDate = new Date(assignment.dueDate);

    if (currentDate > dueDate) {
        assignment.status = "Late Submission";
    } else if (assignment.submitted) {
        assignment.status = "Submitted";
    } else {
        assignment.status = "Not Submitted";
    }

    return assignment.status;
}

// Function to handle assignment submission
function submitAssignment(assignment) {
    // Update the assignment's submission status
    assignment.submitted = true;

    // Update the assignment status based on due date and submission
    const status = updateAssignmentStatus(assignment);

    // Save the updated assignment back to local storage
    localStorage.setItem("assignments", JSON.stringify(assignments));

    // Refresh the table to reflect the updated status
    displayAssignments();
}

// Function to display assignments in the table
function displayAssignments() {
    const tbody = document.getElementById("assignment-list");
    tbody.innerHTML = "";

    assignments.forEach((assignment) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const dueDateCell = document.createElement("td");
        const statusCell = document.createElement("td");
        const submitCell = document.createElement("td");

        nameCell.textContent = assignment.name;
        dueDateCell.textContent = assignment.dueDate;

        // Update the assignment status based on due date and submission
        const status = updateAssignmentStatus(assignment);
        statusCell.textContent = status;

        // Create a "Submit" button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.addEventListener("click", () => submitAssignment(assignment));

        submitCell.appendChild(submitButton);

        row.appendChild(nameCell);
        row.appendChild(dueDateCell);
        row.appendChild(statusCell);
        row.appendChild(submitCell);

        tbody.appendChild(row);
    });
}

// Initial display of assignments
displayAssignments();


// Initial display of assignments
displayAssignments();
