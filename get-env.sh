#!/bin/bash

# Define the API URLs for Production and Staging
PRODUCTION_API_URL="http://10.114.0.2"
STAGING_API_URL="http://10.114.0.11"
STAGING_FRONTEND_URL=http://stg.stayconnected.digital
PRODUCTION_FRONTEND_URL=http://stayconnected.digital
STAGING_DATA_API_URL=http://10.114.0.2  #http://ios-stg.stayconnected.digital
PRODUCTION_DATA_API_URL="http://10.114.0.11"# http://ios.stayconnected.digital

echo "Making appropriate environment file for $CI_ENVIRONMENT_NAME"

# Delete old file if exists
if [ -f .env ]; then
  echo "Deleting existing .env file..."
  rm .env
fi

# Set the API_URL
if [ "$CI_ENVIRONMENT_NAME" == "production" ]; then
  DATA_API_URL=$PRODUCTION_API_URL
  FRONTEND_URL=$PRODUCTION_FRONTEND_URL

elif [ "$CI_ENVIRONMENT_NAME" == "staging" ]; then
  DATA_API_URL=$STAGING_API_URL
  FRONTEND_URL=$STAGING_FRONTEND_URL
else
  echo "Unknown environment: $CI_ENVIRONMENT_NAME"
  exit 1
fi

# Create the .env
echo "Creating new .env file with DATA API URL: $DATA_API_URL"
echo "DATA_API_URL=$DATA_API_URL \n FRONTEND_URL=$FRONTEND_URL" > .env.test

# for debug
cat .env