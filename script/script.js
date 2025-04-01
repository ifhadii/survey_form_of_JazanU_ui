// Form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameStatus = document.getElementById('nameStatus');
const emailStatus = document.getElementById('emailStatus');
const submitBtn = document.getElementById('submitBtn');
const studentForm = document.getElementById('studentForm');
const contactForm = document.getElementById('contactForm');

// Contact form elements
const name_Input = document.getElementById('contactName');
const name_Status = document.getElementById('name_Status');
const contactEmailInput = document.getElementById('contact-email');
const emailError = document.getElementById('emailError');
const contactInput = document.getElementById('contact');
const contactStatus = document.getElementById('contactStatus');

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

// Search functionality
const surveySearch = document.getElementById('survey-search');
const searchResults = document.getElementById('search-results');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Search functionality
surveySearch.addEventListener('input', function() {
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

    searchResults.innerHTML = searchTerm.length > 0 ? 
        filteredResults.map(result => `<div class="search-result-item">${result}</div>`).join('') : 
        '';
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Validation functions
function validateName(name) {
    const pattern = /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+([-' ][A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+)* [A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+([-' ][A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+)*$/;
    return pattern.test(name) && name.length >= 4;
}

function validateJazanEmail(email) {
    return /^[a-zA-Z0-9._-]+@jazanu\.edu\.sa$/.test(email);
}

function validateGeneralEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobileNumber(number) {
    return /^05\d{8}$/.test(number);
}

// Survey form validation
function updateSurveyFormValidity() {
    const nameValid = validateName(nameInput.value.trim());
    const emailValid = validateJazanEmail(emailInput.value.trim());
    submitBtn.disabled = !(nameValid && emailValid);
}

nameInput.addEventListener('input', function() {
    const name = this.value.trim();
    const isValid = validateName(name);
    
    this.classList.toggle('input-valid', isValid);
    this.classList.toggle('input-invalid', !isValid && name.length > 0);
    
    nameStatus.textContent = name.length > 0 ? 
        (isValid ? 'Valid name' : 'Must be 2+ words, letters only') : 
        '';
    nameStatus.style.color = isValid ? 'green' : 'red';
    
    updateSurveyFormValidity();
});

emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    const isValid = validateJazanEmail(email);
    
    this.classList.toggle('input-valid', isValid);
    this.classList.toggle('input-invalid', !isValid && email.length > 0);
    
    emailStatus.textContent = email.length > 0 ? 
        (isValid ? 'Valid Jazan University email' : 'Must be @jazanu.edu.sa') : 
        '';
    emailStatus.style.color = isValid ? 'green' : 'red';
    
    updateSurveyFormValidity();
});

// Contact form validation
function validateContactName() {
    const nameValue = name_Input.value.trim();
    const isValid = validateName(nameValue);
    
    name_Input.classList.toggle('input-valid', isValid);
    name_Input.classList.toggle('input-invalid', !isValid && nameValue.length > 0);
    
    name_Status.textContent = nameValue.length > 0 ? 
        (isValid ? 'Name is valid!' : 'Please enter your full name (first and last)') : 
        '';
    name_Status.style.color = isValid ? 'green' : 'red';
    
    return isValid;
}

// Update the contact email validation
contactEmailInput.addEventListener('input', function() {
    const email = this.value.trim();
    const isValid = validateGeneralEmail(email);
    
    // Clear previous classes
    this.classList.remove('input-valid', 'input-invalid');
    
    // Apply current validation state
    if (email.length > 0) {
        if (isValid) {
            this.classList.add('input-valid');
            emailError.textContent = 'Email is valid!';
            emailError.style.color = 'green';
            emailError.style.display = 'block';
        } else {
            this.classList.add('input-invalid');
            emailError.textContent = 'Please enter a valid email';
            emailError.style.color = 'red';
            emailError.style.display = 'block';
        }
    } else {
        // Field is empty
        emailError.textContent = '';
        emailError.style.display = 'none';
    }
});

contactInput.addEventListener('input', function() {
    const contact = this.value.trim();
    const isValid = validateMobileNumber(contact);
    
    this.classList.toggle('input-valid', isValid);
    this.classList.toggle('input-invalid', !isValid && contact.length > 0);
    
    contactStatus.textContent = contact.length > 0 ? 
        (isValid ? 'Valid mobile number' : 'Must start with 05 and be 10 digits') : 
        '';
    contactStatus.style.color = isValid ? 'green' : 'red';
});

// Form submission handlers
function handleSurveySubmit(event) {
    event.preventDefault();
    
    if (!validateName(nameInput.value.trim()) || !validateJazanEmail(emailInput.value.trim())) {
        alert('Please fix the validation errors before submitting.');
        return;
    }
    
    const formData = new FormData(document.getElementById('surveyForm'));
    let emailBody = "Jazan University Survey Submission\n\n";
    emailBody += `Name: ${formData.get('name')}\n`;
    emailBody += `Email: ${formData.get('email')}\n`;
    emailBody += `College: ${formData.get('college')}\n`;
    emailBody += `Academic Level: ${formData.get('level')}\n`;
    
    const satisfiedItems = Array.from(document.querySelectorAll('[name="satisfied"]:checked')).map(cb => cb.value);
    emailBody += `Satisfied With: ${satisfiedItems.join(', ') || 'None'}\n`;
    emailBody += `Suggestions: ${formData.get('suggestions') || 'None'}\n`;
    
    window.location.href = `mailto:kkxstudentx@gmail.com?subject=${encodeURIComponent("Jazan University Survey Submission")}&body=${encodeURIComponent(emailBody)}`;
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    if (!validateContactName() || !validateGeneralEmail(contactEmailInput.value.trim())) {
        alert('Please fix the validation errors before submitting.');
        return;
    }
    
    const formData = new FormData(document.getElementById('contactForm'));
    let emailBody = "Jazan University Contact Form Submission\n\n";
    emailBody += `Name: ${formData.get('name')}\n`;
    emailBody += `Email: ${formData.get('email')}\n`;
    emailBody += `Subject: ${formData.get('subject') || 'General Inquiry'}\n`;
    emailBody += `Phone: ${formData.get('contact') || 'Not provided'}\n`;
    emailBody += `Message: ${formData.get('message')}\n`;
    
    const subject = `Jazan University Contact: ${formData.get('subject') || 'General Inquiry'}`;
    window.location.href = `mailto:kkxstudentx@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Survey form
    const surveyForm = document.getElementById('surveyForm');
    if (surveyForm) {
        surveyForm.addEventListener('submit', handleSurveySubmit);
        document.querySelector('#surveyForm button[type="submit"]').onclick = handleSurveySubmit;
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        document.querySelector('#contactForm button[type="submit"]').onclick = handleContactSubmit;
    }
    
    // Initialize validations
    name_Input.addEventListener('input', validateContactName);
});