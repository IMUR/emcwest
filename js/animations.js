/**
 * Animations for EMC West website
 * Provides enhanced animation effects for elements
 */

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSequentialAnimate();
  initParallaxEffects();
  initTeamCardAnimations();
  initHeroAnimations();
});

/**
 * Create a staggered animation for elements appearing in sequence
 */
function initSequentialAnimate() {
  // Find all elements with the sequential-animate class
  const animatedGroups = document.querySelectorAll('[data-animate-group]');
  
  animatedGroups.forEach(group => {
    const elements = group.querySelectorAll('[data-animate-item]');
    const staggerDelay = parseInt(group.getAttribute('data-stagger-delay')) || 100;
    
    // Set up observer to trigger animations when group is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate each child element with a staggered delay
          elements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('animate');
            }, index * staggerDelay);
          });
          
          // Stop observing once animation has started
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Start observing the group
    observer.observe(group);
  });
}

/**
 * Create parallax scrolling effects for backgrounds and elements
 */
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  // Function to update parallax positions
  const updateParallax = () => {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.1;
      const offset = scrollTop * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  };
  
  // Update on scroll
  window.addEventListener('scroll', () => {
    // Use requestAnimationFrame for smooth performance
    window.requestAnimationFrame(updateParallax);
  });
  
  // Initial update
  updateParallax();
}

/**
 * Initialize special animation effects for team cards
 */
function initTeamCardAnimations() {
  const teamCards = document.querySelectorAll('.team-card');
  
  if (teamCards.length === 0) return;
  
  teamCards.forEach(card => {
    // Create hover animation effects
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('.team-img');
      const info = card.querySelector('.team-info');
      
      if (img) {
        img.style.height = '220px';
      }
      
      if (info) {
        info.style.transform = 'translateY(-10px)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('.team-img');
      const info = card.querySelector('.team-info');
      
      if (img) {
        img.style.height = '250px';
      }
      
      if (info) {
        info.style.transform = 'translateY(0)';
      }
    });
    
    // Create subtle movement on mousemove for 3D effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateX = (y / rect.height) * 10; // Max 10 degrees
      const rotateY = (x / rect.width) * -10; // Max 10 degrees
      
      // Apply transform with perspective for 3D effect
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });
    
    // Reset transform when mouse leaves
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.3s ease';
    });
  });
}

/**
 * Initialize special animation effects for the hero section
 */
function initHeroAnimations() {
  const heroSection = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');
  
  if (!heroSection || !heroContent) return;
  
  // Create subtle parallax effect on mouse move
  heroSection.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
    
    // Apply subtle shift to hero content for parallax effect
    heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
    heroContent.style.transition = 'transform 0.3s ease-out';
  });
  
  // Reset position when mouse leaves
  heroSection.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0, 0)';
    heroContent.style.transition = 'transform 0.5s ease';
  });
  
  // Add subtle float animation
  let floatDirection = 1;
  let floatPosition = 0;
  
  // Create gentle floating animation effect
  function animateFloat() {
    // Change direction at bounds
    if (floatPosition > 10) floatDirection = -1;
    if (floatPosition < -10) floatDirection = 1;
    
    // Update position
    floatPosition += 0.2 * floatDirection;
    
    // Apply transform for floating effect
    heroContent.style.transform = `translateY(${floatPosition}px)`;
    
    // Continue animation
    requestAnimationFrame(animateFloat);
  }
  
  // Start floating animation when not being hovered
  let isHovering = false;
  
  heroSection.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  heroSection.addEventListener('mouseleave', () => {
    isHovering = false;
    animateFloat();
  });
  
  // Start animation
  animateFloat();
}
