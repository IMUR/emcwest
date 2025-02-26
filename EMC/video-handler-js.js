/**
 * Video Handler for EMC West website
 * Manages Vimeo video integration and player controls
 */

// Initialize video functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initVimeoPlayers();
  setupVideoModalSystem();
  setupReelPlayer();
});

/**
 * Initialize embedded Vimeo players
 * Applies custom controls and tracking
 */
function initVimeoPlayers() {
  // Find all embedded Vimeo iframes
  const vimeoIframes = document.querySelectorAll('iframe[src*="vimeo.com"]');
  
  if (vimeoIframes.length === 0) return;
  
  // Load Vimeo API if needed
  if (!window.Vimeo && vimeoIframes.length > 0) {
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Wait for API to load before initializing players
    script.onload = () => {
      initializeVimeoPlayersWithAPI(vimeoIframes);
    };
  } else if (window.Vimeo) {
    // API already loaded
    initializeVimeoPlayersWithAPI(vimeoIframes);
  }
}

/**
 * Initialize Vimeo players with the API
 * @param {NodeList} iframes - List of Vimeo iframe elements
 */
function initializeVimeoPlayersWithAPI(iframes) {
  iframes.forEach((iframe, index) => {
    // Create player instance
    const player = new Vimeo.Player(iframe);
    
    // Add data attribute for reference
    iframe.setAttribute('data-player-id', `vimeo-player-${index}`);
    
    // Setup event listeners
    player.on('play', () => {
      console.log(`Video ${index} started playing`);
      // Pause other videos when one starts playing
      pauseOtherVideos(iframe);
    });
    
    player.on('pause', () => {
      console.log(`Video ${index} paused`);
    });
    
    player.on('ended', () => {
      console.log(`Video ${index} ended`);
      // Maybe show related content or another call to action
    });
    
    // Set player options
    player.setVolume(1); // Full volume
    
    // Add custom controls if needed
    addCustomControls(iframe, player);
  });
}

/**
 * Pause all other videos when one starts playing
 * @param {HTMLIFrameElement} currentIframe - The currently playing iframe
 */
function pauseOtherVideos(currentIframe) {
  const currentId = currentIframe.getAttribute('data-player-id');
  const allIframes = document.querySelectorAll('iframe[data-player-id]');
  
  allIframes.forEach(iframe => {
    if (iframe.getAttribute('data-player-id') !== currentId) {
      const player = new Vimeo.Player(iframe);
      player.pause();
    }
  });
}

/**
 * Add custom controls to Vimeo player
 * @param {HTMLIFrameElement} iframe - The Vimeo iframe
 * @param {Object} player - Vimeo player instance
 */
function addCustomControls(iframe, player) {
  // Only add custom controls for selected videos
  if (iframe.hasAttribute('data-custom-controls')) {
    // Create custom control container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'custom-video-controls';
    
    // Create play/pause button
    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.innerHTML = '<span>▶</span>';
    playButton.setAttribute('aria-label', 'Play');
    
    // Add click event
    playButton.addEventListener('click', () => {
      player.getPaused().then(paused => {
        if (paused) {
          player.play();
          playButton.innerHTML = '<span>❚❚</span>';
          playButton.setAttribute('aria-label', 'Pause');
        } else {
          player.pause();
          playButton.innerHTML = '<span>▶</span>';
          playButton.setAttribute('aria-label', 'Play');
        }
      });
    });
    
    // Add to container
    controlsContainer.appendChild(playButton);
    
    // Add container near iframe
    iframe.parentNode.insertBefore(controlsContainer, iframe.nextSibling);
    
    // Update button state on player events
    player.on('play', () => {
      playButton.innerHTML = '<span>❚❚</span>';
      playButton.setAttribute('aria-label', 'Pause');
    });
    
    player.on('pause', () => {
      playButton.innerHTML = '<span>▶</span>';
      playButton.setAttribute('aria-label', 'Play');
    });
  }
}

/**
 * Set up the video modal system for work page
 */
function setupVideoModalSystem() {
  // Find all video thumbnails with data-vimeo-id
  const videoThumbnails = document.querySelectorAll('[data-vimeo-id]');
  
  if (videoThumbnails.length === 0) return;
  
  videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
      e.preventDefault();
      
      const videoId = thumbnail.getAttribute('data-vimeo-id');
      const videoTitle = thumbnail.getAttribute('data-video-title') || 'Video';
      
      // Create modal element
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-content">
          <div class="video-modal-header">
            <h3>${videoTitle}</h3>
            <button class="video-modal-close" aria-label="Close video">×</button>
          </div>
          <div class="video-container">
            <iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0" 
              frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
          </div>
        </div>
      `;
      
      // Add to page
      document.body.appendChild(modal);
      document.body.classList.add('modal-open');
      
      // Set up close functionality
      const closeButton = modal.querySelector('.video-modal-close');
      closeButton.addEventListener('click', () => {
        closeVideoModal(modal);
      });
      
      // Close when clicking outside the content
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeVideoModal(modal);
        }
      });
      
      // Close on escape key
      document.addEventListener('keydown', function escKeyPress(e) {
        if (e.key === 'Escape') {
          closeVideoModal(modal);
          document.removeEventListener('keydown', escKeyPress);
        }
      });
      
      // Add animation class after small delay for transition effect
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    });
  });
}

/**
 * Close a video modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeVideoModal(modal) {
  // Remove active class first (for animation)
  modal.classList.remove('active');
  
  // Remove after animation completes
  setTimeout(() => {
    document.body.removeChild(modal);
    document.body.classList.remove('modal-open');
  }, 300); // Match this to CSS transition time
}

/**
 * Set up the featured reel player on the reel page
 */
function setupReelPlayer() {
  const reelContainer = document.querySelector('.reel-container');
  
  if (!reelContainer) return;
  
  // Find the showcase video
  const reelVideo = reelContainer.querySelector('iframe');
  
  if (!reelVideo) return;
  
  // Create custom controls if needed
  if (window.Vimeo) {
    const player = new Vimeo.Player(reelVideo);
    
    // Create reel controls
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'reel-controls';
    
    // Add play button
    const playButton = document.createElement('button');
    playButton.className = 'reel-play-button';
    playButton.innerHTML = '<span>Play Reel</span>';
    
    // Add to container
    controlsContainer.appendChild(playButton);
    
    // Insert before video
    reelContainer.insertBefore(controlsContainer, reelVideo);
    
    // Set up play button
    playButton.addEventListener('click', () => {
      player.play();
      
      // Add playing class to container
      reelContainer.classList.add('playing');
      
      // Hide controls after playing
      setTimeout(() => {
        controlsContainer.style.opacity = '0';
        setTimeout(() => {
          controlsContainer.style.display = 'none';
        }, 500);
      }, 1000);
    });
    
    // Reset controls when video ends
    player.on('ended', () => {
      controlsContainer.style.display = 'flex';
      setTimeout(() => {
        controlsContainer.style.opacity = '1';
      }, 10);
      reelContainer.classList.remove('playing');
    });
  }
}
