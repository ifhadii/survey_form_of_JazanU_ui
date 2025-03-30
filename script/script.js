  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
  });

  // Form validation
  const surveyForm = document.getElementById('surveyForm');
  
  surveyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      // Validate name
      const name = document.getElementById('fullname');
      const nameError = document.getElementById('nameError');
      if (name.value.trim() === '') {
          name.classList.add('invalid');
          nameError.style.display = 'block';
          isValid = false;
      } else {
          name.classList.remove('invalid');
          nameError.style.display = 'none';
      }

      // Validate email
      const email = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value) || !email.value.includes('jazanu.edu.sa')) {
          email.classList.add('invalid');
          emailError.style.display = 'block';
          isValid = false;
      } else {
          email.classList.remove('invalid');
          emailError.style.display = 'none';
      }

      // Validate college
      const college = document.getElementById('college');
      const collegeError = document.getElementById('collegeError');
      if (college.value === '') {
          college.classList.add('invalid');
          collegeError.style.display = 'block';
          isValid = false;
      } else {
          college.classList.remove('invalid');
          collegeError.style.display = 'none';
      }

      // Validate academic level
      const levelSelected = document.querySelector('input[name="level"]:checked');
      const levelError = document.getElementById('levelError');
      if (!levelSelected) {
          levelError.style.display = 'block';
          isValid = false;
      } else {
          levelError.style.display = 'none';
      }

      if (isValid) {
          alert('Thank you for your feedback! Your survey has been submitted.');
          surveyForm.reset();
      }
  });

  // Search functionality
  const surveySearch = document.getElementById('survey-search');
  const searchResults = document.getElementById('search-results');

  surveySearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      // In a real application, you would fetch actual results
      // Here we're just simulating search results
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


