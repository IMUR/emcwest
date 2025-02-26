#!/bin/bash

# EMC West Website Deployment Configuration
# Edit this file to configure your deployment settings

# Server Configuration
SERVER_USER="username"        # SSH username for the server
SERVER_HOST="example.com"     # Server hostname or IP address
SERVER_PATH="/var/www/emcwest" # Path on the server where the website should be deployed

# Build Configuration
BUILD_DIR="build"             # Directory where the build files are located

# Domain Configuration
DOMAIN_NAME="emcwest.com"     # Primary domain name
USE_WWW=false                 # Whether to use www subdomain as primary

# SSL Configuration
USE_SSL=true                  # Whether to use HTTPS
SSL_EMAIL="info@emcwest.com"  # Email for SSL certificate notifications

# Backup Configuration
CREATE_BACKUP=true            # Whether to create a backup before deployment
BACKUP_RETENTION=5            # Number of backups to keep on the server 