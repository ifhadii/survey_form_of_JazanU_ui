// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Search functionality
const surveySearch = document.getElementById('survey-search');
const searchResults = document.getElementById('search-results');

surveySearch.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const dummyResults = [
        "Academic Feedback Survey 2023",
        "Campus Facilities Evaluation",
        "Student Services Satisfaction",
        "Faculty Teaching Evaluation"
    ];

    const filteredResults = dummyResults.filter(result =>
        result.toLowerCase().includes(searchTerm)
    );

    if (searchTerm.length > 0) {
        searchResults.innerHTML = filteredResults.map(result =>
            `<div class="search-result-item">${result}</div>`
        ).join('');
    } else {
        searchResults.innerHTML = '';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameStatus = document.getElementById('nameStatus');
const emailStatus = document.getElementById('emailStatus');
const submitBtn = document.getElementById('submitBtn');
const studentForm = document.getElementById('studentForm');
const contactForm = document.getElementById('contactForm');

// Name validation for contact form field
const name_Input = document.getElementById('contactName');
const name_Status = document.getElementById('name_Status');

// Real-time contact name validation
function validateContactName() {
    const nameValue = name_Input.value.trim();
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    
    name_Input.classList.remove('input-invalid', 'input-valid');
    name_Status.style.display = 'none';
    
    if (nameValue === '') {
        name_Input.classList.add('input-invalid');
        name_Status.textContent = 'Name is required';
        name_Status.style.display = 'block';
        name_Status.style.color = 'red';
        return false;
    } else if (!nameRegex.test(nameValue)) {
        name_Input.classList.add('input-invalid');
        name_Status.textContent = 'Please enter your full name (first and last)';
        name_Status.style.display = 'block';
        name_Status.style.color = 'red';
        return false;
    } else {
        name_Input.classList.add('input-valid');
        name_Status.textContent = "Name is valid!";
        name_Status.style.display = "block";
        name_Status.style.color = "green";
        return true;
    }
}

// Real-time contact name validation on input
name_Input.addEventListener('input', function() {
    validateContactName();
});

// Combined validation function
function updateFormValidity() {
    const nameValid = validateName(nameInput.value.trim());
    const emailValid = validateJazanEmail(emailInput.value.trim());
    submitBtn.disabled = !(nameValid && emailValid);
}

// Real-time name validation
nameInput.addEventListener('input', function() {
    const name = this.value.trim();
    const isValid = validateName(name);
    
    this.classList.remove('input-invalid', 'input-valid');
    nameStatus.textContent = '';
    
    if (name.length > 0) {
        if (isValid) {
            this.classList.add('input-valid');
            nameStatus.textContent = 'Valid name';
            nameStatus.style.color = 'green';
        } else {
            this.classList.add('input-invalid');
            nameStatus.textContent = 'Must be 2+ words, letters only';
            nameStatus.style.color = 'red';
        }
    }
    updateFormValidity();
});

// Real-time contact email validation
const contactEmailInput = document.getElementById('contact-email');
const emailError = document.getElementById('emailError');

contactEmailInput.addEventListener('input', function() {
    const email = this.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    this.classList.remove('input-invalid', 'input-valid');
    emailError.style.display = 'none';
    
    if (email.length > 0) {
        if (isValid) {
            this.classList.add('input-valid');
            emailError.textContent = "Email is Valid!";
            emailError.style.display = "block";
            emailError.style.color = "green";
        } else {
            this.classList.add('input-invalid');
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
            emailError.style.color = 'red';
        }
    }
});


// Real-time mobile number validation
const contactInput = document.getElementById('contact');
const contactStatus = document.getElementById('contactStatus');

contactInput.addEventListener('input', function() {
    const contact = this.value.trim();
    const isValid = /^05\d{8}$/.test(contact);
    
    this.classList.remove('input-invalid', 'input-valid');
    contactStatus.textContent = '';
    
    if (contact.length > 0) {
        if (isValid) {
            this.classList.add('input-valid');
            contactStatus.textContent = 'Valid mobile number';
            contactStatus.style.color = 'green';
        } else {
            this.classList.add('input-invalid');
            contactStatus.textContent = 'Must start with 05 and be 10 digits';
            contactStatus.style.color = 'red';
        }
    }
});

// Real-time Jazan email validation
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    const isValid = validateJazanEmail(email);
    
    this.classList.remove('input-invalid', 'input-valid');
    emailStatus.textContent = '';
    
    if (email.length > 0) {
        if (isValid) {
            this.classList.add('input-valid');
            emailStatus.textContent = 'Valid Jazan University email';
            emailStatus.style.color = 'green';
        } else {
            this.classList.add('input-invalid');
            emailStatus.textContent = 'Must be @jazanu.edu.sa';
            emailStatus.style.color = 'red';
        }
    }
    updateFormValidity();
});

// Form submissions
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nameValid = validateName(nameInput.value.trim());
    const emailValid = validateJazanEmail(emailInput.value.trim());
    
    if (nameValid && emailValid) {
        alert('Form submitted successfully!');
        // Add form submission logic
    }
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const isNameValid = validateContactName();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmailInput.value.trim());
    
    if (isNameValid && isEmailValid) {
        alert('Form submitted successfully!');
        // Add form submission logic
    }
});

// Validation functions
function validateName(name) {
    const pattern = /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+([-' ][A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+)* [A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+([-' ][A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+)*$/;
    return pattern.test(name) && name.length >= 4;
}

function validateJazanEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@jazanu\.edu\.sa$/;
    return pattern.test(email);
}

