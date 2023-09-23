// JavaScript code for teacher's dashboard

const assignmentTable = document.getElementById("assignment-table");
const assignmentList = document.getElementById("assignment-list");
const assignmentNameInput = document.getElementById("assignment-name");
const dueDateInput = document.getElementById("due-date");

function login(userType) {
    localStorage.setItem("userType", userType);

    // Redirect to the respective dashboard based on user type
    if (userType === "teacher") {
        window.location.href = "teacher.html";
    } else if (userType === "student") {
        window.location.href = "index.html";
    }
}

function displayAssignments() {
    const tbody = document.getElementById("assignment-list");
    tbody.innerHTML = "";

    assignments.forEach((assignment, index) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const dueDateCell = document.createElement("td");
        const deleteCell = document.createElement("td");

        nameCell.textContent = assignment.name;
        dueDateCell.textContent = assignment.dueDate;

        // Create a "Delete" button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteAssignment(index));

        deleteCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(dueDateCell);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
    });
}

function deleteAssignment(index) {
    if (confirm("Are you sure you want to delete this assignment?")) {
        assignments.splice(index, 1);

        // Save the updated assignments back to local storage
        localStorage.setItem("assignments", JSON.stringify(assignments));

        // Refresh the table to reflect the deletion
        displayAssignments();
    }
}

function addAssignment() {
    const assignmentName = assignmentNameInput.value;
    const dueDate = dueDateInput.value;

    if (assignmentName && dueDate) {
        const assignment = {
            name: assignmentName,
            dueDate: dueDate,
        };

        // Store the assignment in local storage
        assignments.push(assignment);
        localStorage.setItem("assignments", JSON.stringify(assignments));

        // Refresh the table to display the new assignment immediately
        displayAssignments();

        // Clear input fields
        assignmentNameInput.value = "";
        dueDateInput.value = "";
    } else {
        alert("Please enter both assignment name and due date.");
    }
}

// Initial display of assignments
const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
displayAssignments();
