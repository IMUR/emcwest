# EMC West Website Development Guide

## Project Overview

EMC West is a creative production company with a team of talented filmmakers, editors, and production professionals. The website serves as a showcase for their work and team, with a modern, sophisticated aesthetic that highlights their creative capabilities.

## Design Direction

The design follows these key principles:
- Dark, minimalist aesthetic with strategic accent colors
- Full-screen media (videos/images) with strong visual impact
- Sophisticated typography with careful attention to spacing
- Subtle animations that enhance rather than distract
- Interactive elements that demonstrate creativity

## Reference Sites

1. **[Sunnyboyentertainment.com](https://sunnyboyentertainment.com/)**
   - Minimalist dark aesthetic with strong visual focus
   - Full-screen video/image backgrounds
   - Subtle navigation that doesn't compete with content
   - Project-focused portfolio presentation

2. **[TheMillcom](https://themill.com/)**
   - Dramatic full-bleed imagery
   - Card-based content organization
   - Bold typography with elegant spacing
   - Sophisticated animations and transitions

3. **Puzzle.io and Related Inspirations**
   - Gradient color treatments
   - Modern card layouts with hover effects
   - Strategic use of whitespace (or darkspace)
   - Motion design elements

## Site Structure

```
EMC West Website
│
├── Home (index.html)
│   └── Featured Spline 3D Logo Animation
│
├── About Us/Team (about.html)
│   └── Team Member Profiles with Bios
│
├── Work (work.html)
│   └── Portfolio of Vimeo-hosted Videos
│
├── Reel (reel.html)
│   └── Featured Showreel Video
│
└── Contact (contact.html)
    └── Contact Form & Information
```

## Technical Stack

### Core Technologies
- **HTML5/CSS3**: Semantic markup and modern styling
- **JavaScript**: ES6+ for interactions and animations
- **Spline 3D**: For interactive logo and 3D elements

### Libraries & Tools
- **GSAP**: For advanced animations and transitions
- **IntersectionObserver API**: For scroll-based effects
- **Vimeo Player API**: For video integration and control
- **Barba.js** (optional): For smooth page transitions

### Responsive Approach
- Mobile-first design methodology
- Key breakpoints at 480px, 768px, 1024px, and 1440px
- Fluid typography and spacing using clamp() and relative units

## Color Scheme

```css
:root {
  --primary-color: #0F0F1A;
  --secondary-color: #1A1A2E;
  --accent-color: #7B61FF;
  --text-color: #ffffff;
  --card-bg: rgba(30, 30, 60, 0.25);
  --bg-gradient: linear-gradient(135deg, #121212 0%, #1E1E24 50%, #252538 100%);
}
```

## Typography

- **Primary Font**: Helvetica Neue or Inter
- **Secondary Font**: Option for a distinctive display font for headers
- **Base Size**: 16px with responsive scaling
- **Type Scale**: 1.2 ratio for harmonious sizing

## Page-Specific Requirements

### Homepage
- Full-screen Spline 3D logo as the centerpiece
- Interactive elements that respond to cursor movement
- Minimal text with a strong call-to-action
- Smooth transitions to other sections

```html
<section class="hero-section">
  <div class="spline-container">
    <spline-viewer url="https://prod.spline.design/uVeibPvaqMhEuWXF/scene.splinecode"></spline-viewer>
  </div>
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">EMC West</h1>
      <p class="hero-subtitle">Creative Production Excellence</p>
      <a href="/about" class="cta-button">Explore Our Work</a>
    </div>
  </div>
</section>
```

### Team/About Page
- Elegant grid layout of team members
- Interactive cards with subtle hover effects
- Comprehensive bios that are easily readable
- Consistent styling that maintains brand identity

Team member information:
```
- Barbara Toennies, Executive Producer
- Charlie Visnic, Co-Creative Director, Editor, DP
- Nathan Aceves, Co-Creative Director, Editor
- Richard Martinez, Director of Photography
- Todd Roisman, Post Production Supervisor
- Jessica Arcelles, Production Coordinator/Manager
```

### Work Page
- Grid of video thumbnails that expand to full view
- Integration with Vimeo for video hosting
- Filter options if there are multiple project categories
- Smooth transitions between project views

```html
<div class="work-grid">
  <article class="work-item">
    <a href="#" class="work-link" data-vimeo-id="123456789">
      <div class="work-thumbnail" style="background-image: url('path/to/thumbnail.jpg')">
        <div class="work-overlay">
          <h3 class="work-title">Project Title</h3>
          <p class="work-category">Category</p>
        </div>
      </div>
    </a>
  </article>
  <!-- Additional work items -->
</div>
```

### Reel Page
- Featured showreel video that loads quickly
- Clean, distraction-free viewing experience
- Optional breakdown of featured projects
- Consideration for multiple device viewing

### Contact Page
- Clean form with validation
- Company information (address, phone, email)
- Map integration (optional)
- Social media links if applicable

## Navigation

- Primary navigation in header (Logo, Reel, Work, About Us)
- Secondary navigation in footer (Home, About, Work, Contact)
- Mobile hamburger menu with smooth animation
- Active state indicators

```html
<header class="top-header">
  <div class="container">
    <a href="/" class="logo">
      <div class="logo-container">
        <spline-viewer url="https://prod.spline.design/uVeibPvaqMhEuWXF/scene.splinecode" class="logo-viewer"></spline-viewer>
      </div>
    </a>
    <div class="nav-container">
      <nav class="main-nav">
        <a href="/reel">REEL</a>
        <a href="/work">WORK</a>
        <a href="/about">ABOUT US</a>
      </nav>
      <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</header>
```

## Key Interactions & Animations

1. **Navigation Effects**
   - Subtle underline/highlight animations on hover
   - Shrinking header on scroll
   - Smooth mobile menu transitions

2. **Scroll Effects**
   - Revealed elements as they enter viewport
   - Parallax for depth on certain sections
   - Background changes on scroll depth

3. **Cursor Effects**
   - Custom cursor styles for interactive elements
   - Magnetic effects for buttons and links
   - Cursor trails or highlights for creative flair

4. **Content Transitions**
   - Smooth page transitions between sections
   - Card hover effects with depth and information reveals
   - Image/video loading transitions

## Performance Considerations

1. **Image Optimization**
   - Responsive images using srcset and sizes
   - Modern formats (WebP with fallbacks)
   - Lazy loading for off-screen content

2. **Video Handling**
   - Lazy loading videos until needed
   - Multiple quality options based on connection
   - Thumbnail placeholders until playback

3. **Animation Performance**
   - Use requestAnimationFrame for custom animations
   - Prefer CSS transforms and opacity for smoothness
   - Throttle/debounce event listeners

4. **General Optimizations**
   - Minimal dependencies to reduce payload
   - Critical CSS inlining for key above-fold styles
   - Resource hints (preconnect, prefetch) for external resources

## Accessibility Considerations

- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes where appropriate
- Sufficient color contrast
- Alternative text for images
- Captions for videos
- Focus styles for interactive elements

## Implementation Notes

### Spline 3D Integration
```html
<!-- Include the Spline viewer library -->
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.37/build/spline-viewer.js"></script>

<!-- Use the Spline component -->
<spline-viewer url="https://prod.spline.design/uVeibPvaqMhEuWXF/scene.splinecode"></spline-viewer>
```

### Vimeo Integration
```javascript
// Example of Vimeo API usage for work page
document.querySelectorAll('[data-vimeo-id]').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    const videoId = item.getAttribute('data-vimeo-id');
    
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
    
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Handle close button
    modal.querySelector('.close-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
      document.body.classList.remove('modal-open');
    });
  });
});
```

### Responsive Navigation
```javascript
// Dynamic navigation shrinking effect
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.top-header');
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.main-nav');
  
  // Initial state management
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
});
```

### Scroll Animations with IntersectionObserver
```javascript
// Reveal elements as they scroll into view
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, { threshold: 0.15 });

  // Target elements to reveal
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', observeElements);
```

## Contact Information

EMC West
- Phone: 818 846 4574
- Email: info@emcwest.com
- Address: 505 S Victory Blvd, Burbank, CA

## Team Bios

**BARBARA TOENNIES**  
*Executive Producer*  
As the founder and core of EMC, Barbara embodies the trust and commitment that define our company. An award-winning filmmaker with a wealth of experience in news production, public relations, and motion picture marketing, she has crafted impactful publicity campaigns and produced acclaimed bonus content for major motion pictures over the past two decades. Drawing from her rich background and passion for storytelling, Barbara collaborates with esteemed filmmakers like Martin Scorsese and John Lasseter, delivering narratives that resonate ly with audiences.

**CHARLIE VISNIC**  
*Co-Creative Director, Editor, DP*  
An unparalleled creative force, Charlie Visnic is EMC's resident visionary whose limitless imagination elevates every project he touches. While excelling in the most demanding work at EMC, he gained worldwide recognition through his blog, **The B-Roll**, documenting a new creative endeavor every day for a year—showcasing ingenuity that sets him apart in the industry. Charlie's extraordinary talent shines in projects like *Kingdom of the Planet of the Apes*, *Loki*, and *The Muppets: Scratching the Surface*.

**NATHAN ACEVES**  
*Co-Creative Director, Editor*  
An exceptional storyteller, Nathan brings calm brilliance to the editing suite, crafting projects like *Inside Out 2* and *Star Wars: The Last Jedi*. Drawing from his background in art, music, philosophy, and the strength he gains from family, he infuses his work with profound emotional depth. This unique blend enables him to create narratives that resonate deeply with audiences, solidifying his role as a masterful storyteller at EMC.

**RICHARD MARTINEZ**  
*Director of Photography*  
A versatile and dynamic Director of Photography, Richard is our "Iron Man" behind the camera. Whether capturing the energy of LA's streets with his run-and-gun shooting style or crafting meticulous lighting in Hollywood's top studios, he brings a unique visual storytelling talent to every project. With expertise in drone shooting and an eye for dynamic visuals, Richard's dedication and creative vision elevate each production he touches.

**TODD ROISMAN**  
*Post Production Supervisor*  
A seasoned professional, Todd brings over thirty years of experience in every facet of production and post-production to EMC. His expertise as an online editor, colorist, and graphic artist reflects his deep commitment to the craft. Beyond the studio, Todd's passion for photography and videography fuels his volunteer work with animal rescue organizations and Habitat for Humanity, showcasing his dedication to impactful storytelling both professionally and personally.

**JESSICA ARCELLES**  
*Production Coordinator/Manager*  
Jessica Arcelles is the cornerstone of our production team, ensuring every project runs seamlessly. With her exceptional ability to coordinate every aspect of production, she meticulously manages the myriad details that make our work dependable and secure. Jessica's unwavering commitment and organizational skills provide the care and reliability that underpin EMC's success.
