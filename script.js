// Function to mark attendance
function markAttendance() {
    let name = document.getElementById("student-name").value;
    let date = document.getElementById("attendance-date").value;
    let time = document.getElementById("attendance-time").value;

    if (name === "" || date === "" || time === "") {
        alert("Enter student name and date!");
        return;
    }

    let attendanceList = JSON.parse(localStorage.getItem("attendance")) || [];
    attendanceList.push({ name, date, time });

    localStorage.setItem("attendance", JSON.stringify(attendanceList));
    displayAttendance();
}

// Function to display attendance
function displayAttendance() {
    let attendanceList = JSON.parse(localStorage.getItem("attendance")) || [];
    let tableBody = document.getElementById("attendance-list");

    tableBody.innerHTML = "";

    attendanceList.forEach((record, index) => {
        let row = `
            <tr>
                <td>${record.name}</td>
                <td>${record.date}</td>
                <td>${record.time}</td>
                <td><button class="delete-btn" onclick="removeAttendance(${index})">Remove</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to remove a single attendance entry
function removeAttendance(index) {
    let attendanceList = JSON.parse(localStorage.getItem("attendance")) || [];
    attendanceList.splice(index, 1);

    localStorage.setItem("attendance", JSON.stringify(attendanceList));
    displayAttendance();
}

// Function to clear all attendance
function clearAttendance() {
    localStorage.removeItem("attendance");
    displayAttendance();
}

// Function to export attendance as a file
function exportAttendance() {
    let attendanceList = JSON.parse(localStorage.getItem("attendance")) || [];

    if (attendanceList.length === 0) {
        alert("No attendance records to export!");
        return;
    }

    let attendanceContent = "data:text/csv;charset=utf-8,Name,Date\n";
    attendanceList.forEach(record => {
        attendanceContent += `${record.name},${record.date}\n`;
    });

    let encodedUri = encodeURI(attendanceContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Load attendance data on page load
window.onload = displayAttendance;
