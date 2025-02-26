# EMC West Website

A professional website for EMC West, a creative production company specializing in entertainment marketing content.

## Overview

EMC West's website showcases the company's creative production work through a modern, sophisticated design that highlights their portfolio, team, and services. The site features a dark, minimalist aesthetic with strategic accent colors, full-screen media with strong visual impact, and subtle animations.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints at 480px, 768px, 1024px, and 1440px
- **Interactive Elements**: Animated transitions, hover effects, and parallax scrolling
- **Embedded Video**: Integration with Vimeo for portfolio and showreel content
- **3D Logo**: Interactive Spline 3D logo animation
- **Team Profiles**: Showcase of team members with bios and photos
- **Portfolio Grid**: Filterable grid of work examples with video modal integration
- **Contact Form**: Interactive form with validation and feedback

## Technologies Used

- **HTML5/CSS3**: Semantic markup and modern styling
- **JavaScript (ES6+)**: For interactions and animations
- **Spline 3D**: For interactive logo and 3D elements
- **Vimeo Player API**: For video integration and control

## Project Structure

```
emcwest/
├── index.html              # Homepage
├── about.html              # Team/About page
├── work.html               # Portfolio page
├── reel.html               # Showreel page
├── contact.html            # Contact page
├── css/
│   ├── main.css            # Main stylesheet
│   ├── animations.css      # Animation styles
│   └── responsive.css      # Responsive styles
├── js/
│   ├── main.js             # Main JavaScript file
│   ├── animations.js       # Animation functionality
│   └── video-handler.js    # Video integration (Vimeo)
├── assets/
│   ├── images/             # Image assets
│   │   ├── team/           # Team member photos
│   │   ├── projects/       # Project thumbnails
│   │   └── clients/        # Client logos
│   ├── fonts/              # Font files (if applicable)
│   └── videos/             # Video files (if applicable)
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript for any customizations

### Installation

1. Clone the repository
   ```
   git clone https://github.com/IMUR/emcwest.git
   ```

2. Navigate to the project directory
   ```
   cd emcwest
   ```

3. Open index.html in your browser or set up a local server
   ```
   # Using Python for a simple server
   python -m http.server 8000
   ```

4. Visit `http://localhost:8000` in your browser

## Development

### CSS Architecture

The CSS is organized into three main files:

- **main.css**: Core styles, layout, typography, and component styles
- **animations.css**: Animation keyframes and animation-specific styles
- **responsive.css**: Media queries and responsive adjustments

### JavaScript Organization

- **main.js**: Core functionality including navigation, scroll effects, and initialization
- **animations.js**: Specialized animation effects for elements throughout the site
- **video-handler.js**: Handles Vimeo video integration, modal functionality, and player controls

### Project Customization

#### Updating Team Information

Edit the team cards in `about.html`:

```html
<div class="team-card">
    <div class="team-img" style="background-image: url('assets/images/team/member.jpg')"></div>
    <div class="team-info">
        <h3 class="team-name">Team Member Name</h3>
        <p class="team-role">Position/Role</p>
        <p class="team-bio">Bio text here...</p>
    </div>
</div>
```

#### Adding Portfolio Items

Add new portfolio items to `work.html`:

```html
<article class="work-item" data-category="category-name">
    <a href="#" class="work-link" data-vimeo-id="VIDEO_ID" data-video-title="Video Title">
        <div class="work-thumbnail" style="background-image: url('assets/images/projects/thumbnail.jpg')">
            <div class="work-overlay">
                <h3 class="work-title">Project Title</h3>
                <p class="work-category">Category</p>
            </div>
        </div>
    </a>
</article>
```

#### Updating the Showreel

Update the Vimeo ID in `reel.html`:

```html
<iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen data-custom-controls></iframe>
```

## Deployment

To deploy the website to a live server:

1. Upload all files to your web hosting server via FTP or Git
2. Ensure all file permissions are set correctly
3. Point your domain to the directory containing the index.html file

## Credits

- **Spline 3D**: [https://spline.design](https://spline.design)
- **Feather Icons**: [https://feathericons.com](https://feathericons.com)
- **Vimeo Player API**: [https://developer.vimeo.com/player/sdk](https://developer.vimeo.com/player/sdk)

## License

This project is proprietary and owned by EMC West.

## Contact

For questions about the website development:
- Email: info@emcwest.com
- Phone: 818 846 4574
- Address: 505 S Victory Blvd, Burbank, CA
