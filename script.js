


/* =========================================
   1. GET HTML ELEMENTS
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

const searchInput = document.querySelector(".search-box input");

const notificationButton = document.querySelector(".icon-btn");

const profile = document.querySelector(".profile");


/* =========================================
   2. MOBILE MENU
========================================= */

menuToggle.addEventListener("click", function () {

    // Open / close menu
    navMenu.classList.toggle("show");

    // Get menu icon
    const icon = menuToggle.querySelector("i");

    // Change hamburger icon
    if (navMenu.classList.contains("show")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================
   3. NAVIGATION ACTIVE LINK
========================================= */

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        // Remove active class from all links
        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        // Add active class to clicked link
        link.classList.add("active");

        // Close mobile menu
        navMenu.classList.remove("show");

        // Change mobile icon back to hamburger
        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   4. SEARCH FUNCTION
========================================= */

searchInput.addEventListener("keyup", function () {

    const searchValue = searchInput.value.toLowerCase().trim();

    console.log("Searching for:", searchValue);

});


/* =========================================
   5. SEARCH ENTER KEY
========================================= */

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const searchValue = searchInput.value.trim();

        if (searchValue === "") {

            alert("Please enter something to search.");

        } else {

            alert("Searching for: " + searchValue);

        }

    }

});


/* =========================================
   6. NOTIFICATION BUTTON
========================================= */

notificationButton.addEventListener("click", function () {

    alert("You have 3 new notifications.");

});


/* =========================================
   7. PROFILE CLICK
========================================= */

profile.addEventListener("click", function () {

    alert("Profile menu clicked.");

});


/* =========================================
   8. ESCAPE KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        // Close mobile navigation
        navMenu.classList.remove("show");

        // Reset menu icon
        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================
   9. CLICK OUTSIDE MOBILE MENU
========================================= */

document.addEventListener("click", function (event) {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);

    // If clicked outside
    if (!clickedInsideMenu && !clickedMenuButton) {

        navMenu.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================
   10. PAGE LOADED
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Student Management System loaded successfully."
    );

});

