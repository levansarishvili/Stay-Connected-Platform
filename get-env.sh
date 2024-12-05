#!/bin/bash

# Define the API URLs for Production and Staging
PRODUCTION_API_URL="http://10.114.0.2"
STAGING_API_URL="http://10.114.0.11"

echo "Making appropriate environment file for $CI_ENVIRONMENT_NAME"

# Delete old file if exists
if [ -f .env ]; then
  echo "Deleting existing .env file..."
  rm .env
fi

# Set the API_URL
if [ "$CI_ENVIRONMENT_NAME" == "production" ]; then
  DATA_API_URL=$PRODUCTION_API_URL
elif [ "$CI_ENVIRONMENT_NAME" == "staging" ]; then
  DATA_API_URL=$STAGING_API_URL
else
  echo "Unknown environment: $CI_ENVIRONMENT_NAME"
  exit 1
fi

# Create the .env
echo "Creating new .env file with API URL: $API_URL"
echo "API_URL=$API_URL" > .env

# for debug
cat .env