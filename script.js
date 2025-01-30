document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".form").addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

      
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("pwd").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.querySelector("input[name='phone']").value.trim();
        let experience = document.getElementById("quantity").value;

        let radioButtons = document.querySelectorAll("input[name='fav_language']");
        let fileInput = document.getElementById("myfile");
        let checkboxes = document.querySelectorAll("input[type='checkbox']");

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
            alert("Form submitted successfully!");
            event.target.submit();
        }
    });

    document.querySelector("input[type='reset']").addEventListener("click", function () {
      
        const errorMessages = document.querySelectorAll(".error");
        errorMessages.forEach(error => {
            error.style.display = "none";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const rangeInput = document.getElementById("vol");
    const rangeValue = document.getElementById("range-value");

    rangeInput.addEventListener("input", function () {
        rangeValue.textContent = rangeInput.value;  
    });
});
