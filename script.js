document.addEventListener("DOMContentLoaded", function () {
    let editingRow = null; // Track the row being edited

    // Function to clear error messages
    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
            error.style.display = "none";
        });
    }

    // Function to open the form popup
    function openForm() {
        document.getElementById("form-popup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }

    // Function to close the form popup and reset fields
    function closeForm() {
        document.getElementById("form-popup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        clearErrors();
        document.querySelector(".form").reset();
        editingRow = null; // Reset editing mode
    }

    // Event Listeners
    document.getElementById("add-button").addEventListener("click", openForm);
    document.querySelector(".close-btn").addEventListener("click", closeForm);

    // Clear errors on form reset
    document.querySelector(".form").addEventListener("reset", function() {
        clearErrors();
    });

    // Form Submit Handler
    document.querySelector(".form").addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        // Get form values
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("pwd").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.querySelector("input[name='phone']").value.trim();
        let experience = document.getElementById("quantity").value;
        let skillsRating = document.getElementById("vol").value;
        let file = document.getElementById("myfile").files[0]?.name || "No file selected";
        
        // Get slot values
        const slotTime = document.getElementById("appt").value.trim();
        const slotMonth = document.getElementById("bdaymonth").value.trim();
        const slotWeek = document.getElementById("week").value.trim();

        // Validate inputs
        if (username === "") {
            document.getElementById("name-error").textContent = "Username is required";
            isValid = false;
        }

        if (password.length < 6) {
            document.getElementById("password-error").textContent = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            document.getElementById("email-error").textContent = "Invalid email format";
            isValid = false;
        }

        if (!/^\d{7,15}$/.test(phone)) {
            document.getElementById("number-error").textContent = "Phone number must be between 7 and 15 digits";
            isValid = false;
        }

        if (experience < 1 || experience > 5) {
            document.getElementById("experience-error").textContent = "Experience must be between 1 and 5 years";
            isValid = false;
        }

        // Validate radio buttons
        if (!document.querySelector("input[name='fav_language']:checked")) {
            document.getElementById("radio-error").textContent = "Please select a language preference";
            isValid = false;
        }

        // Validate checkboxes
        if (document.querySelectorAll("input[name='language']:checked").length === 0) {
            document.getElementById("checkbox-error").textContent = "Please select at least one language";
            isValid = false;
        }

        // Validate slot fields
        if (slotTime === "") {
            document.getElementById("slot-error").textContent = "Slot time is required";
            isValid = false;
        }

        if (slotMonth === "") {
            document.getElementById("month-error").textContent = "Month is required";
            isValid = false;
        }

        if (slotWeek === "") {
            document.getElementById("week-error").textContent = "Week is required";
            isValid = false;
        }

        if (!file) {
            document.getElementById("file-error").textContent = "Please upload a file";
            isValid = false;
        }

        // Show all error messages if invalid
        document.querySelectorAll(".error-message").forEach(error => {
            if (error.textContent) error.style.display = "block";
        });

        if (isValid) {
            const tableBody = document.querySelector("#data-table tbody");
            const newRow = editingRow || document.createElement("tr");
            const checkboxes = document.querySelectorAll("input[name='language']:checked");

            newRow.innerHTML = `
                <td>${username}</td>
                <td>${password}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${document.querySelector("input[name='fav_language']:checked").value}</td>
                <td>${Array.from(checkboxes).map(cb => cb.value).join(", ")}</td>
                <td>${slotTime}</td>
                <td>${slotMonth}</td>
                <td>${slotWeek}</td>
                <td>${experience}</td>
                <td>${skillsRating}</td>
                <td>${file}</td>
                <td>
                    <button onclick="editRecord(this)">Edit</button>
                    <button onclick="deleteRecord(this)">Delete</button>
                </td>
            `;

            if (editingRow) {
                editingRow.replaceWith(newRow);
            } else {
                tableBody.appendChild(newRow);
            }

            closeForm();
            alert("Form submitted successfully!");
        }
    });

    // Edit Record Function
    // Edit Record Function
window.editRecord = function (button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    // Set form input values from the selected row's cells
    document.getElementById("username").value = cells[0].textContent;
    document.getElementById("pwd").value = cells[1].textContent;
    document.getElementById("email").value = cells[2].textContent;
    document.querySelector("input[name='phone']").value = cells[3].textContent;
    document.getElementById("appt").value = cells[6].textContent;  // Slot time
    document.getElementById("bdaymonth").value = cells[7].textContent;  // Month
    document.getElementById("week").value = cells[8].textContent;  // Week
    document.getElementById("quantity").value = cells[9].textContent;
    document.getElementById("vol").value = cells[10].textContent;
    // Set radio button for favorite language
    const selectedLanguage = cells[4].textContent;
    document.querySelectorAll("input[name='fav_language']").forEach(radio => {
        radio.checked = (radio.value === selectedLanguage);
    });

    // Set checkboxes for selected languages
    const selectedLanguages = cells[5].textContent.split(", ");
    document.querySelectorAll("input[name='language']").forEach(checkbox => {
        checkbox.checked = selectedLanguages.includes(checkbox.value);
    });

    editingRow = row;  // Mark the row being edited
    openForm();  // Open the form for editing
};

    // Delete Record Function
    window.deleteRecord = function (button) {
        if (confirm("Are you sure you want to delete this record?")) {
            button.closest("tr").remove();
        }
    };

    // Range Value Display
    document.getElementById("vol").addEventListener("input", function () {
        document.getElementById("range-value").textContent = this.value;
    });


    document.getElementById("search-input").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll("#data-table tbody tr");

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            let matchFound = false;

            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    matchFound = true;
                }
            });

            if (matchFound) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
    document.querySelector(".form").reset();
    // Global Functions
    window.openForm = openForm;
    window.closeForm = closeForm;
});