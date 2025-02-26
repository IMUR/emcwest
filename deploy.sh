#!/bin/bash

# EMC West Website Deploy Script
# This script deploys the website to a production server

# Load configuration
CONFIG_FILE="deploy-config.sh"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo "Error: Configuration file '$CONFIG_FILE' not found."
    echo "Please create the configuration file first."
    exit 1
fi

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "Error: Build directory '$BUILD_DIR' not found."
    echo "Please run './build.sh' first to create the build directory."
    exit 1
fi

# Prompt for confirmation
echo "This will deploy the EMC West website to production."
echo "Server: $SERVER_USER@$SERVER_HOST:$SERVER_PATH"
echo "Domain: $DOMAIN_NAME"
echo "SSL: $([ "$USE_SSL" = true ] && echo "Enabled" || echo "Disabled")"
read -p "Are you sure you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Deploy to server
echo "Deploying to production server..."
echo "Using rsync to transfer files..."

# Create a backup of the current site on the server if enabled
if [ "$CREATE_BACKUP" = true ]; then
    echo "Creating backup of current site on server..."
    ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && tar -czf ../emcwest-backup-$(date +%Y%m%d%H%M%S).tar.gz ."
    
    # Clean up old backups if retention is set
    if [ "$BACKUP_RETENTION" -gt 0 ]; then
        echo "Cleaning up old backups (keeping $BACKUP_RETENTION most recent)..."
        ssh $SERVER_USER@$SERVER_HOST "cd .. && ls -t emcwest-backup-*.tar.gz | tail -n +$((BACKUP_RETENTION+1)) | xargs rm -f"
    fi
fi

# Transfer files using rsync
echo "Transferring files to server..."
rsync -avz --delete $BUILD_DIR/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH

echo "Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Verify the site is working correctly at http$([ "$USE_SSL" = true ] && echo "s")://$DOMAIN_NAME"
echo "2. Check for any errors in the server logs"
echo "3. Test all functionality on the live site"
echo ""
echo "If you encounter any issues, you can restore from the backup created during deployment." 