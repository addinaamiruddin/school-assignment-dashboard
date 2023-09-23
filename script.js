// JavaScript code for student's dashboard

const assignmentTable = document.getElementById("assignment-table");
const assignmentList = document.getElementById("assignment-list");

// Retrieve assignments from local storage
const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

// Display assignments in the list
assignments.forEach((assignment) => {
  const li = document.createElement("li");
  li.textContent = `${assignment.name} - Due on: ${assignment.dueDate}`;
  assignmentList.appendChild(li);
});

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
    assignment.status = "Missing";
  }

  return assignment.status;
}

function displayAssignments() {
  const tbody = document.getElementById("assignment-list");
  tbody.innerHTML = "";

  assignments.forEach((assignment, index) => {
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

    // Apply CSS class based on the status
    statusCell.classList.add(
      status === "Submitted" ? "green-text" : "red-text"
    );

    // Create a "Submit" button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () =>
      submitAssignment(assignment, index)
    ); // Ensure correct index is passed

    submitCell.appendChild(submitButton);

    row.appendChild(nameCell);
    row.appendChild(dueDateCell);
    row.appendChild(statusCell);
    row.appendChild(submitCell);

    tbody.appendChild(row);
  });
}

function submitAssignment(assignment, index) {
  // Toggle the submission status (true/false)
  assignment.submitted = !assignment.submitted;

  // Save the updated assignment back to local storage
  assignments[index] = assignment;
  localStorage.setItem("assignments", JSON.stringify(assignments));

  // Refresh the table to reflect the updated status
  displayAssignments();
}

// Initial display of assignments
displayAssignments();
