document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".form").addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        // Gather form input values
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("pwd").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.querySelector("input[name='phone']").value.trim();
        let experience = document.getElementById("quantity").value;

        let radioButtons = document.querySelectorAll("input[name='fav_language']");
        let fileInput = document.getElementById("myfile");
        let checkboxes = document.querySelectorAll("input[type='checkbox']");

        // Validate Exam Venue (Slot Time, Month, Week)
        let slotTime = document.getElementById("appt").value;
        let month = document.getElementById("bdaymonth").value;
        let week = document.getElementById("week").value;

        if (!slotTime) {
            const slotError = document.getElementById("slot-error");
            slotError.textContent = "Please select a slot time.";
            slotError.style.display = "block";
            isValid = false;
        } else {
            const slotError = document.getElementById("slot-error");
            slotError.style.display = "none";
        }

        if (!month) {
            const monthError = document.getElementById("month-error");
            monthError.textContent = "Please select a month.";
            monthError.style.display = "block";
            isValid = false;
        } else {
            const monthError = document.getElementById("month-error");
            monthError.style.display = "none";
        }

        if (!week) {
            const weekError = document.getElementById("week-error");
            weekError.textContent = "Please select a week.";
            weekError.style.display = "block";
            isValid = false;
        } else {
            const weekError = document.getElementById("week-error");
            weekError.style.display = "none";
        }

        // Validate Rate Your Skills (0 to 100)
        let skillsRating = document.getElementById("vol").value;
        if (skillsRating > 20 || skillsRating < 100) {
            const skillsError = document.getElementById("skills-error");
            skillsError.textContent = "Skills rating must be between 20 and 100.";
            skillsError.style.display = "block";
            isValid = false;
        } else {
            const skillsError = document.getElementById("skills-error");
            skillsError.style.display = "none";
        }

        // Other validations (username, password, email, etc.)
        if (username === "") {
            const nameError = document.getElementById("name-error");
            nameError.textContent = "Username is required";
            nameError.style.display = "block";
            isValid = false;
        } else {
            const nameError = document.getElementById("name-error");
            nameError.style.display = "none";
        }

        if (password === "") {
            const passwordError = document.getElementById("password-error");
            passwordError.textContent = "Password is required";
            passwordError.style.display = "block";
            isValid = false;
        } else if (password.length < 6) {
            const passwordError = document.getElementById("password-error");
            passwordError.textContent = "Password must be at least 6 characters";
            passwordError.style.display = "block";
            isValid = false;
        } else {
            const passwordError = document.getElementById("password-error");
            passwordError.style.display = "none";
        }

        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "") {
            const emailError = document.getElementById("email-error");
            emailError.textContent = "Email is required";
            emailError.style.display = "block";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            const emailError = document.getElementById("email-error");
            emailError.textContent = "Please enter a valid email";
            emailError.style.display = "block";
            isValid = false;
        } else {
            const emailError = document.getElementById("email-error");
            emailError.style.display = "none";
        }

        let phonePattern = /^\d{7,15}$/;
        if (phone === "") {
            const phoneError = document.getElementById("number-error");
            phoneError.textContent = "Phone number is required";
            phoneError.style.display = "block";
            isValid = false;
        } else if (!phonePattern.test(phone)) {
            const phoneError = document.getElementById("number-error");
            phoneError.textContent = "Phone number must be between 7 and 15 digits";
            phoneError.style.display = "block";
            isValid = false;
        } else {
            const phoneError = document.getElementById("number-error");
            phoneError.style.display = "none";
        }

        let radioChecked = false;
        radioButtons.forEach(radio => {
            if (radio.checked) {
                radioChecked = true;
            }
        });
        if (!radioChecked) {
            const radioError = document.getElementById("radio-error");
            radioError.textContent = "Please select a language preference";
            radioError.style.display = "block";
            isValid = false;
        } else {
            const radioError = document.getElementById("radio-error");
            radioError.style.display = "none";
        }

        if (experience < 1 || experience > 5 || experience === "") {
            const experienceError = document.getElementById("experience-error");
            experienceError.textContent = "Experience must be between 1 and 5 years";
            experienceError.style.display = "block";
            isValid = false;
        } else {
            const experienceError = document.getElementById("experience-error");
            experienceError.style.display = "none";
        }

        if (fileInput.files.length === 0) {
            const fileError = document.getElementById("file-error");
            fileError.textContent = "Please select a file";
            fileError.style.display = "block";
            isValid = false;
        } else {
            const fileError = document.getElementById("file-error");
            fileError.style.display = "none";

            const file = fileInput.files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                const fileError = document.getElementById("file-error");
                fileError.textContent = "Only image files (JPEG, PNG, GIF) are allowed";
                fileError.style.display = "block";
                isValid = false;
            }
        }

        let checkboxChecked = false;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkboxChecked = true;
            }
        });
        if (!checkboxChecked) {
            const checkboxError = document.getElementById("checkbox-error");
            checkboxError.textContent = "Please select at least one language";
            checkboxError.style.display = "block";
            isValid = false;
        } else {
            const checkboxError = document.getElementById("checkbox-error");
            checkboxError.style.display = "none";
        }

        if (isValid) {
            // Create a new row in the table
            let tableBody = document.querySelector("#data-table tbody");

            let newRow = document.createElement("tr");

            // Add table cells for the form data
            let usernameCell = document.createElement("td");
            usernameCell.textContent = username;
            newRow.appendChild(usernameCell);

            let passwordCell = document.createElement("td");
            passwordCell.textContent = password;
            newRow.appendChild(passwordCell);

            let emailCell = document.createElement("td");
            emailCell.textContent = email;
            newRow.appendChild(emailCell);

            let phoneCell = document.createElement("td");
            phoneCell.textContent = phone;
            newRow.appendChild(phoneCell);

            let selectedLanguage = "";
            radioButtons.forEach(radio => {
                if (radio.checked) {
                    selectedLanguage = radio.value;
                }
            });
            let languageCell = document.createElement("td");
            languageCell.textContent = selectedLanguage;
            newRow.appendChild(languageCell);

            let experienceCell = document.createElement("td");
            experienceCell.textContent = experience;
            newRow.appendChild(experienceCell);

            let skillsRatingCell = document.createElement("td");
            skillsRatingCell.textContent = skillsRating;
            newRow.appendChild(skillsRatingCell);

            let fileCell = document.createElement("td");
            if (fileInput.files.length > 0) {
                fileCell.textContent = fileInput.files[0].name;
            } else {
                fileCell.textContent = "No file selected";
            }
            newRow.appendChild(fileCell);

            // Append the new row to the table
            tableBody.appendChild(newRow);

            // Reset the form
            event.target.reset();
            alert("Form submitted successfully!");
        }
    });

    // Range input value display
    document.querySelector("#vol").addEventListener("input", function () {
        document.querySelector("#range-value").textContent = this.value;
    });
});
