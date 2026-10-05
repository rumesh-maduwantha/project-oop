/* =========================
   COURSE DATA
========================= */

let courses = JSON.parse(localStorage.getItem("courses")) || [

    {
        id: 1,
        name: "Web Application Development",
        code: "5COSC001W",
        department: "Computer Science",
        instructor: "Dr. John Smith",
        credits: 20,
        students: 85,
        status: "Active"
    },

    {
        id: 2,
        name: "Object Oriented Programming",
        code: "5COSC002W",
        department: "Computer Science",
        instructor: "Prof. Sarah Johnson",
        credits: 20,
        students: 72,
        status: "Active"
    },

    {
        id: 3,
        name: "Software Engineering",
        code: "5COSC003W",
        department: "Software Engineering",
        instructor: "Dr. Michael Brown",
        credits: 20,
        students: 64,
        status: "Active"
    },

    {
        id: 4,
        name: "Data Science Fundamentals",
        code: "5COSC004W",
        department: "Data Science",
        instructor: "Dr. Emily Wilson",
        credits: 20,
        students: 48,
        status: "Active"
    },

    {
        id: 5,
        name: "Business Intelligence",
        code: "5COSC005W",
        department: "Business",
        instructor: "Mr. David Lee",
        credits: 20,
        students: 35,
        status: "Inactive"
    }

];


/* =========================
   DOM ELEMENTS
========================= */

const tableBody = document.getElementById("courseTableBody");

const searchInput = document.getElementById("searchInput");

const departmentFilter =
    document.getElementById("departmentFilter");

const statusFilter =
    document.getElementById("statusFilter");

const totalCourses =
    document.getElementById("totalCourses");

const totalStudents =
    document.getElementById("totalStudents");

const totalInstructors =
    document.getElementById("totalInstructors");

const activeCourses =
    document.getElementById("activeCourses");

const emptyState =
    document.getElementById("emptyState");

const modal =
    document.getElementById("courseModal");

const addCourseBtn =
    document.getElementById("addCourseBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const courseForm =
    document.getElementById("courseForm");

const modalTitle =
    document.getElementById("modalTitle");

const editCourseId =
    document.getElementById("editCourseId");

const courseName =
    document.getElementById("courseName");

const courseCode =
    document.getElementById("courseCode");

const department =
    document.getElementById("department");

const instructor =
    document.getElementById("instructor");

const credits =
    document.getElementById("credits");

const studentCount =
    document.getElementById("studentCount");

const courseStatus =
    document.getElementById("courseStatus");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebar =
    document.querySelector(".sidebar");

const notificationBtn =
    document.getElementById("notificationBtn");


/* =========================
   SAVE TO LOCAL STORAGE
========================= */

function saveCourses() {

    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );

}


/* =========================
   DISPLAY COURSES
========================= */

function displayCourses(courseList = courses) {

    tableBody.innerHTML = "";

    if (courseList.length === 0) {

        emptyState.style.display = "block";

        return;

    }

    emptyState.style.display = "none";


    courseList.forEach(course => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>

                <div class="course-name">

                    <div class="course-icon">

                        <i class="fa-solid fa-book"></i>

                    </div>

                    <div>

                        <strong>
                            ${course.name}
                        </strong>

                        <span>
                            ${course.department}
                        </span>

                    </div>

                </div>

            </td>


            <td>
                <strong>${course.code}</strong>
            </td>


            <td>
                ${course.department}
            </td>


            <td>
                ${course.instructor}
            </td>


            <td>
                ${course.credits}
            </td>


            <td>
                ${course.students}
            </td>


            <td>

                <span class="status ${
                    course.status.toLowerCase()
                }">

                    ${course.status}

                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn view-btn"
                        onclick="viewCourse(${course.id})"
                        title="View"
                    >

                        <i class="fa-solid fa-eye"></i>

                    </button>


                    <button
                        class="action-btn edit-btn"
                        onclick="editCourse(${course.id})"
                        title="Edit"
                    >

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="action-btn delete-btn"
                        onclick="deleteCourse(${course.id})"
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


/* =========================
   UPDATE STATISTICS
========================= */

function updateStatistics() {

    totalCourses.textContent =
        courses.length;


    const students =
        courses.reduce(
            (total, course) =>
                total + Number(course.students),
            0
        );

    totalStudents.textContent =
        students;


    const instructors =
        new Set(
            courses.map(course =>
                course.instructor
            )
        );

    totalInstructors.textContent =
        instructors.size;


    const active =
        courses.filter(
            course =>
                course.status === "Active"
        ).length;

    activeCourses.textContent =
        active;

}


/* =========================
   FILTER COURSES
========================= */

function filterCourses() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedDepartment =
        departmentFilter.value;

    const selectedStatus =
        statusFilter.value;


    const filtered =
        courses.filter(course => {

            const matchesSearch =
                course.name
                    .toLowerCase()
                    .includes(search)

                ||

                course.code
                    .toLowerCase()
                    .includes(search)

                ||

                course.instructor
                    .toLowerCase()
                    .includes(search);


            const matchesDepartment =
                selectedDepartment === "all"
                ||
                course.department ===
                selectedDepartment;


            const matchesStatus =
                selectedStatus === "all"
                ||
                course.status ===
                selectedStatus;


            return (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            );

        });


    displayCourses(filtered);

}


/* =========================
   OPEN ADD COURSE MODAL
========================= */

function openAddModal() {

    modalTitle.textContent =
        "Add New Course";

    courseForm.reset();

    editCourseId.value = "";

    modal.classList.add("show");

    courseName.focus();

}


/* =========================
   CLOSE MODAL
========================= */

function closeCourseModal() {

    modal.classList.remove("show");

    courseForm.reset();

    editCourseId.value = "";

}


/* =========================
   ADD COURSE
========================= */

function addCourse(course) {

    const newCourse = {

        id: Date.now(),

        name: course.name,

        code: course.code,

        department: course.department,

        instructor: course.instructor,

        credits: Number(course.credits),

        students: Number(course.students),

        status: course.status

    };


    courses.push(newCourse);

    saveCourses();

    displayCourses();

    updateStatistics();

}


/* =========================
   EDIT COURSE
========================= */

function editCourse(id) {

    const course =
        courses.find(
            course =>
                course.id === id
        );


    if (!course) return;


    modalTitle.textContent =
        "Edit Course";


    editCourseId.value =
        course.id;

    courseName.value =
        course.name;

    courseCode.value =
        course.code;

    department.value =
        course.department;

    instructor.value =
        course.instructor;

    credits.value =
        course.credits;

    studentCount.value =
        course.students;

    courseStatus.value =
        course.status;


    modal.classList.add("show");

    courseName.focus();

}


/* =========================
   UPDATE COURSE
========================= */

function updateCourse(id, data) {

    const index =
        courses.findIndex(
            course =>
                course.id === id
        );


    if (index === -1) return;


    courses[index] = {

        ...courses[index],

        name: data.name,

        code: data.code,

        department: data.department,

        instructor: data.instructor,

        credits: Number(data.credits),

        students: Number(data.students),

        status: data.status

    };


    saveCourses();

    displayCourses();

    updateStatistics();

}


/* =========================
   DELETE COURSE
========================= */

function deleteCourse(id) {

    const course =
        courses.find(
            course =>
                course.id === id
        );


    if (!course) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete "${course.name}"?`
        );


    if (!confirmed) return;


    courses =
        courses.filter(
            course =>
                course.id !== id
        );


    saveCourses();

    displayCourses();

    updateStatistics();

}


/* =========================
   VIEW COURSE
========================= */

function viewCourse(id) {

    const course =
        courses.find(
            course =>
                course.id === id
        );


    if (!course) return;


    alert(

        `COURSE DETAILS\n\n` +

        `Course: ${course.name}\n` +

        `Code: ${course.code}\n` +

        `Department: ${course.department}\n` +

        `Instructor: ${course.instructor}\n` +

        `Credits: ${course.credits}\n` +

        `Students: ${course.students}\n` +

        `Status: ${course.status}`

    );

}


/* =========================
   FORM SUBMIT
========================= */

courseForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            courseName.value.trim();

        const code =
            courseCode.value.trim();

        const selectedDepartment =
            department.value;

        const selectedInstructor =
            instructor.value.trim();

        const selectedCredits =
            credits.value;

        const selectedStudents =
            studentCount.value;

        const selectedStatus =
            courseStatus.value;


        if (
            !name ||
            !code ||
            !selectedDepartment ||
            !selectedInstructor ||
            !selectedCredits ||
            selectedStudents === ""
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        const courseData = {

            name: name,

            code: code,

            department:
                selectedDepartment,

            instructor:
                selectedInstructor,

            credits:
                selectedCredits,

            students:
                selectedStudents,

            status:
                selectedStatus

        };


        const id =
            editCourseId.value;


        if (id) {

            updateCourse(
                Number(id),
                courseData
            );

        } else {

            const duplicate =
                courses.some(
                    course =>
                        course.code
                            .toLowerCase() ===
                        code.toLowerCase()
                );


            if (duplicate) {

                alert(
                    "A course with this code already exists."
                );

                return;

            }


            addCourse(courseData);

        }


        closeCourseModal();

    }
);


/* =========================
   EVENT LISTENERS
========================= */

searchInput.addEventListener(
    "input",
    filterCourses
);

departmentFilter.addEventListener(
    "change",
    filterCourses
);

statusFilter.addEventListener(
    "change",
    filterCourses
);

addCourseBtn.addEventListener(
    "click",
    openAddModal
);

closeModal.addEventListener(
    "click",
    closeCourseModal
);

cancelBtn.addEventListener(
    "click",
    closeCourseModal
);


/* =========================
   CLICK OUTSIDE MODAL
========================= */

modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeCourseModal();

        }

    }
);


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeCourseModal();

        }

    }
);


/* =========================
   MOBILE MENU
========================= */

mobileMenuBtn.addEventListener(
    "click",
    function() {

        sidebar.classList.toggle("show");

    }
);


/* =========================
   NOTIFICATION
========================= */

notificationBtn.addEventListener(
    "click",
    function() {

        alert(
            "You have 3 new notifications."
        );

    }
);


/* =========================
   INITIAL LOAD
========================= */

displayCourses();

updateStatistics();

console.log(
    "Courses page loaded successfully."
);