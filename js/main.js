/**
 * Main JavaScript file for EMC West website
 * Handles navigation, animations, and interactivity
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initCursorEffects();
  setupModalHandlers();
});

/**
 * Initialize navigation functionality
 * Handles header shrinking and mobile menu
 */
function initNavigation() {
  const header = document.querySelector('.top-header');
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.main-nav');
  
  // Initial state management for header shrinking
  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      body.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      body.classList.remove('scrolled');
    }
  };
  
  // Check on page load
  checkScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', checkScroll);
  
  // Dynamic blur gradient intensity based on cursor position
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Dynamic blur gradient intensity based on cursor position
    const gradientElement = document.querySelector('body:after');
    if (gradientElement) {
      const blurIntensity = Math.max(5, 15 - (mouseY * 15));
      gradientElement.style.backdropFilter = `blur(${blurIntensity}px)`;
    }
  });
  
  // Mobile menu toggle - only set up if elements exist
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
}

/**
 * Initialize scroll animations
 * Reveals elements as they enter the viewport
 */
function initScrollAnimations() {
  // Use Intersection Observer to detect when elements enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, { threshold: 0.15 }); // When 15% of the element is visible

  // Target elements with the reveal-on-scroll class
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // Add subtle parallax effect to team cards
  const teamCards = document.querySelectorAll('.team-card');
  
  if (teamCards.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      teamCards.forEach((card, index) => {
        const cardOffset = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate when the card is in view
        if (scrollPosition + windowHeight > cardOffset && 
            scrollPosition < cardOffset + cardHeight) {
          // Create a subtle parallax effect based on scroll position
          const parallaxValue = (scrollPosition - cardOffset) * 0.05;
          // Alternate direction for even/odd cards
          const direction = index % 2 === 0 ? 1 : -1;
          
          card.style.transform = `translateY(${parallaxValue * direction}px)`;
        }
      });
    });
  }
}

/**
 * Initialize cursor effects for interactive elements
 */
function initCursorEffects() {
  // Add hover effects to buttons and cards
  const interactiveElements = document.querySelectorAll('.cta-button, .team-card, .work-item');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transition = 'all 0.3s ease';
    });
  });
  
  // Create magnetic effect for buttons
  const buttons = document.querySelectorAll('.cta-button');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Create a subtle magnetic pull effect
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

/**
 * Set up video modal handlers for work page
 */
function setupModalHandlers() {
  // Find all video links with data-vimeo-id attributes
  const videoLinks = document.querySelectorAll('[data-vimeo-id]');
  
  if (videoLinks.length > 0) {
    videoLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const videoId = link.getAttribute('data-vimeo-id');
        
        // Create modal with Vimeo embed
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
          <div class="video-container">
            <iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1" 
              frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            <button class="close-modal">×</button>
          </div>
        `;
        
        // Add modal to the body
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Handle close button
        modal.querySelector('.close-modal').addEventListener('click', () => {
          document.body.removeChild(modal);
          document.body.classList.remove('modal-open');
        });
        
        // Close modal when clicking outside of video
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.classList.remove('modal-open');
          }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', function escKeyHandler(e) {
          if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', escKeyHandler);
          }
        });
      });
    });
  }
}

/**
 * Helper function to add CSS animation classes
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS class for animation
 * @param {number} delay - Delay in milliseconds before adding class
 */
function animateElement(element, animationClass, delay = 0) {
  setTimeout(() => {
    element.classList.add(animationClass);
  }, delay);
}
