// Global functions for the website

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Animate skill bars
  const skillBars = document.querySelectorAll('.skill-bar');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle (would need HTML element)
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Form validation for contact form
function validateForm(form) {
  let isValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate all required fields
  form.querySelectorAll('[required]').forEach(field => {
    const errorElement = document.getElementById(`${field.id}Error`);
    
    if (field.value.trim() === '' || 
        (field.type === 'email' && !emailRegex.test(field.value))) {
      field.classList.add('input-error');
      if (errorElement) errorElement.style.display = 'block';
      isValid = false;
    } else {
      field.classList.remove('input-error');
      if (errorElement) errorElement.style.display = 'none';
    }
  });

  return isValid;
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm(this)) {
      // Show success message
      const successMessage = document.getElementById('successMessage');
      successMessage.classList.remove('hidden');
      
      // Reset form
      this.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
    }
  });

  // Real-time validation
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        this.classList.remove('input-error');
        const errorId = this.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) errorElement.style.display = 'none';
      }
    });
  });
}

// Dark mode toggle (example implementation)
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}