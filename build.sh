#!/bin/bash

# EMC West Website Build Script
# This script prepares the website for production deployment

# Load configuration
CONFIG_FILE="deploy-config.sh"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
    echo "Loaded configuration from $CONFIG_FILE"
else
    echo "Warning: Configuration file '$CONFIG_FILE' not found. Using default settings."
    BUILD_DIR="build"
    DOMAIN_NAME="emcwest.com"
    USE_SSL=true
fi

echo "Starting EMC West website build process..."

# Create build directory
echo "Creating build directory: $BUILD_DIR"
mkdir -p $BUILD_DIR

# Copy all production files to build directory
echo "Copying production files..."
cp -r index.html about.html work.html contact.html reel.html $BUILD_DIR/
cp -r assets $BUILD_DIR/
cp -r css $BUILD_DIR/
cp -r js $BUILD_DIR/

# Remove any development or unnecessary files
echo "Removing development files..."
find $BUILD_DIR -name "*.DS_Store" -type f -delete
find $BUILD_DIR -name "*.log" -type f -delete
find $BUILD_DIR -name "*.tmp" -type f -delete

# Create robots.txt if it doesn't exist
if [ ! -f "$BUILD_DIR/robots.txt" ]; then
    echo "Creating robots.txt..."
    cat > $BUILD_DIR/robots.txt << EOL
User-agent: *
Allow: /
Sitemap: http$([ "$USE_SSL" = true ] && echo "s")://$DOMAIN_NAME/sitemap.xml
EOL
fi

# Create simple sitemap.xml if it doesn't exist
if [ ! -f "$BUILD_DIR/sitemap.xml" ]; then
    echo "Creating sitemap.xml..."
    cat > $BUILD_DIR/sitemap.xml << EOL
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http$([ "$USE_SSL" = true ] && echo "s")://$DOMAIN_NAME/</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>http$([ "$USE_SSL" = true ] && echo "s")://$DOMAIN_NAME/about.html</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>http$([ "$USE_SSL" = true ] && echo "s")://$DOMAIN_NAME/work.html</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>http$([ "$USE_SSL" = true ] && echo "s")://$DOMAIN_NAME/reel.html</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>http$([ "$USE_SSL" = true ] && echo "s")://$DOMAIN_NAME/contact.html</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>
EOL
fi

echo "Build process complete. Files are ready in the '$BUILD_DIR' directory."
echo ""
echo "Next steps:"
echo "1. Optimize images (consider using tools like ImageOptim or TinyPNG)"
echo "2. Minify CSS and JavaScript files"
echo "3. Test the site in the build directory"
echo "4. Deploy to production server using './deploy.sh'"
echo ""
echo "For full deployment checklist, refer to README.md" 