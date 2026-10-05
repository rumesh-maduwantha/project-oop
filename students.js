
/* =========================================
   STUDENT MANAGEMENT SYSTEM
   STUDENTS PAGE JAVASCRIPT
========================================= */


/* =========================================
   1. DEFAULT STUDENTS
========================================= */

let students = JSON.parse(
    localStorage.getItem("students")
) || [

    {
        id: "STU001",
        name: "Kasun Perera",
        course: "Computer Science",
        email: "kasun@example.com",
        status: "Active"
    },

    {
        id: "STU002",
        name: "Nimal Fernando",
        course: "Software Engineering",
        email: "nimal@example.com",
        status: "Active"
    },

    {
        id: "STU003",
        name: "Sarah Silva",
        course: "Data Science",
        email: "sarah@example.com",
        status: "Inactive"
    },

    {
        id: "STU004",
        name: "Amal Perera",
        course: "Business Information Systems",
        email: "amal@example.com",
        status: "Active"
    },

    {
        id: "STU005",
        name: "Tharushi Fernando",
        course: "Computer Science",
        email: "tharushi@example.com",
        status: "Active"
    }

];


/* =========================================
   2. HTML ELEMENTS
========================================= */

const tableBody =
    document.getElementById("studentTableBody");

const searchInput =
    document.getElementById("searchInput");

const courseFilter =
    document.getElementById("courseFilter");

const statusFilter =
    document.getElementById("statusFilter");

const emptyMessage =
    document.getElementById("emptyMessage");

const modal =
    document.getElementById("studentModal");

const openModalBtn =
    document.getElementById("openModalBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const studentForm =
    document.getElementById("studentForm");

const modalTitle =
    document.getElementById("modalTitle");

const studentName =
    document.getElementById("studentName");

const studentId =
    document.getElementById("studentId");

const studentCourse =
    document.getElementById("studentCourse");

const studentEmail =
    document.getElementById("studentEmail");

const studentStatus =
    document.getElementById("studentStatus");


/* =========================================
   3. EDITING STUDENT
========================================= */

let editingStudentId = null;


/* =========================================
   4. SAVE TO LOCAL STORAGE
========================================= */

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* =========================================
   5. GET INITIALS
========================================= */

function getInitials(name) {

    const words = name.split(" ");

    let initials = "";

    words.forEach(function(word) {

        if (word.length > 0) {

            initials +=
                word.charAt(0).toUpperCase();

        }

    });

    return initials.substring(0, 2);

}


/* =========================================
   6. DISPLAY STUDENTS
========================================= */

function displayStudents() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedCourse =
        courseFilter.value;

    const selectedStatus =
        statusFilter.value;


    /* Filter students */

    const filteredStudents =
        students.filter(function(student) {

            const matchesSearch =

                student.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.id
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.email
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCourse =

                selectedCourse === "all"
                ||
                student.course === selectedCourse;


            const matchesStatus =

                selectedStatus === "all"
                ||
                student.status === selectedStatus;


            return (
                matchesSearch
                &&
                matchesCourse
                &&
                matchesStatus
            );

        });


    /* Clear table */

    tableBody.innerHTML = "";


    /* Empty state */

    if (filteredStudents.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    /* Create rows */

    filteredStudents.forEach(function(student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="student-info">

                    <div class="student-avatar">

                        ${getInitials(student.name)}

                    </div>

                    <div>

                        <strong>
                            ${student.name}
                        </strong>

                        <small>
                            Student
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${student.id}
            </td>


            <td>
                ${student.course}
            </td>


            <td>
                ${student.email}
            </td>


            <td>

                <span class="status ${
                    student.status.toLowerCase()
                }">

                    ${student.status}

                </span>

            </td>


            <td>

                <div class="actions">

                    <button
                        class="action-btn view-btn"
                        onclick="viewStudent('${student.id}')"
                        title="View"
                    >

                        <i class="fa-solid fa-eye"></i>

                    </button>


                    <button
                        class="action-btn edit-btn"
                        onclick="editStudent('${student.id}')"
                        title="Edit"
                    >

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="action-btn delete-btn"
                        onclick="deleteStudent('${student.id}')"
                        title="Delete"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================
   7. UPDATE STATISTICS
========================================= */

function updateStatistics() {

    const total =
        students.length;


    const active =
        students.filter(function(student) {

            return student.status === "Active";

        }).length;


    const courses =
        new Set(
            students.map(function(student) {

                return student.course;

            })
        ).size;


    /*
        For this demo, the first
        30 days are represented
        by students added recently.
    */

    const newStudents =
        students.length;


    document.getElementById(
        "totalStudents"
    ).textContent = total;


    document.getElementById(
        "activeStudents"
    ).textContent = active;


    document.getElementById(
        "courseCount"
    ).textContent = courses;


    document.getElementById(
        "newStudents"
    ).textContent = newStudents;

}


/* =========================================
   8. OPEN MODAL
========================================= */

function openModal() {

    modal.classList.add("show");

}


/* =========================================
   9. CLOSE MODAL
========================================= */

function closeModal() {

    modal.classList.remove("show");

    studentForm.reset();

    editingStudentId = null;

    modalTitle.textContent =
        "Add Student";

}


/* =========================================
   10. ADD STUDENT BUTTON
========================================= */

openModalBtn.addEventListener(
    "click",
    function() {

        editingStudentId = null;

        modalTitle.textContent =
            "Add Student";

        studentForm.reset();

        openModal();

    }
);


/* =========================================
   11. CLOSE BUTTONS
========================================= */

closeModalBtn.addEventListener(
    "click",
    closeModal
);


cancelBtn.addEventListener(
    "click",
    closeModal
);


/* =========================================
   12. ADD / UPDATE STUDENT
========================================= */

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            studentName.value.trim();

        const id =
            studentId.value.trim();

        const course =
            studentCourse.value;

        const email =
            studentEmail.value.trim();

        const status =
            studentStatus.value;


        /* Check duplicate ID */

        const duplicate =
            students.find(function(student) {

                return (
                    student.id.toLowerCase()
                    ===
                    id.toLowerCase()
                    &&
                    student.id !== editingStudentId
                );

            });


        if (duplicate) {

            alert(
                "A student with this ID already exists."
            );

            return;

        }


        /* EDIT */

        if (editingStudentId) {

            const student =
                students.find(function(student) {

                    return student.id === editingStudentId;

                });


            student.name = name;

            student.id = id;

            student.course = course;

            student.email = email;

            student.status = status;

        }


        /* ADD */

        else {

            const newStudent = {

                id: id,

                name: name,

                course: course,

                email: email,

                status: status

            };


            students.push(newStudent);

        }


        /* Save */

        saveStudents();


        /* Refresh */

        displayStudents();

        updateStatistics();


        /* Close */

        closeModal();


        alert(
            editingStudentId
                ? "Student updated successfully!"
                : "Student added successfully!"
        );

    }
);


/* =========================================
   13. EDIT STUDENT
========================================= */

function editStudent(id) {

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    if (!student) {
        return;
    }


    editingStudentId = id;


    modalTitle.textContent =
        "Edit Student";


    studentName.value =
        student.name;

    studentId.value =
        student.id;

    studentCourse.value =
        student.course;

    studentEmail.value =
        student.email;

    studentStatus.value =
        student.status;


    openModal();

}


/* =========================================
   14. VIEW STUDENT
========================================= */

function viewStudent(id) {

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    if (!student) {
        return;
    }


    alert(

        "STUDENT INFORMATION\n\n" +

        "Name: " +
        student.name +

        "\nStudent ID: " +
        student.id +

        "\nCourse: " +
        student.course +

        "\nEmail: " +
        student.email +

        "\nStatus: " +
        student.status

    );

}


/* =========================================
   15. DELETE STUDENT
========================================= */

function deleteStudent(id) {

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    if (!student) {
        return;
    }


    const confirmed =
        confirm(

            "Are you sure you want to delete " +
            student.name +
            "?"

        );


    if (!confirmed) {
        return;
    }


    students =
        students.filter(function(student) {

            return student.id !== id;

        });


    saveStudents();

    displayStudents();

    updateStatistics();


    alert(
        "Student deleted successfully!"
    );

}


/* =========================================
   16. SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    displayStudents
);


/* =========================================
   17. COURSE FILTER
========================================= */

courseFilter.addEventListener(
    "change",
    displayStudents
);


/* =========================================
   18. STATUS FILTER
========================================= */

statusFilter.addEventListener(
    "change",
    displayStudents
);


/* =========================================
   19. CLICK OUTSIDE MODAL
========================================= */

modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


/* =========================================
   20. ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =========================================
   21. NOTIFICATION
========================================= */

const notificationButton =
    document.querySelector(
        ".notification-btn"
    );


notificationButton.addEventListener(
    "click",
    function() {

        alert(
            "You have 3 new notifications."
        );

    }
);


/* =========================================
   22. INITIAL LOAD
========================================= */

displayStudents();

updateStatistics();

console.log(
    "Student Management System loaded successfully."
);

