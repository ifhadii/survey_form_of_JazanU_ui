function submitSurveyForm() {
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let college = document.getElementById("college").value;
    let level = document.querySelector('input[name="level"]:checked')?.value || "Not specified";
    let suggestions = document.getElementById("suggestions").value;
    
    let satisfaction = [];
    document.querySelectorAll('input[name="satisfied"]:checked').forEach(checkbox => {
        satisfaction.push(checkbox.value);
    });

    let mailtoLink = `mailto:kkxstudentx@gmail.com?subject=Survey Submission&body=
        Name: ${name}%0D%0A
        Email: ${email}%0D%0A
        College: ${college}%0D%0A
        Academic Level: ${level}%0D%0A
        Satisfaction Areas: ${satisfaction.join(", ")}%0D%0A
        Suggestions: ${suggestions}`;

    window.location.href = mailtoLink;
    alert('Thank you for your feedback! Your survey has been submitted.');
    surveyForm.reset();
}




// Add event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            submitSurveyForm();
        });
    }
});

// Search functionality
const surveySearch = document.getElementById('survey-search');
const searchResults = document.getElementById('search-results');
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