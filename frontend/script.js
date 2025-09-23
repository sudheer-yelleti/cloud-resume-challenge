// Enhanced Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
 callAzureFunction();
  const contactForm = document.getElementById('contact-form');
  const response = document.getElementById('response');

  // Form validation and submission
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();

    // Validate form
    if (!validateForm(name, email, message)) {
      return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      showResponse('success', 'Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });

  // Form validation
  function validateForm(name, email, message) {
    let isValid = true;
    let errorMessage = '';

    if (!name) {
      errorMessage += 'Name is required. ';
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      errorMessage += 'Please enter a valid email address. ';
      isValid = false;
    }

    if (!message) {
      errorMessage += 'Message is required. ';
      isValid = false;
    }

    if (!isValid) {
      showResponse('error', errorMessage.trim());
    }

    return isValid;
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show response message
  function showResponse(type, message) {
    response.style.display = 'block';
    response.className = `response-message ${type}`;
    response.textContent = message;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      response.style.display = 'none';
    }, 5000);
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      nav.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Add typing effect to the title
  const title = document.querySelector('.profile-info h1');
  if (title) {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Add hover effects to skill tags
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add click effect to download button
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      // Add ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
});


async function callAzureFunction() {
  try {
    const response = await fetch("https://getvisitordata.azurewebsites.net/api/GetVisitorCount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Sudheer",
        email: "sudheer@example.com",
        message: "Hello from JavaScript!"
      })
    });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    const data = await response.json();
    console.log("Function response:", data);
    document.getElementById("result").textContent = data.message;
  } catch (err) {
    console.error(err);
  }
}


// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .download-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
