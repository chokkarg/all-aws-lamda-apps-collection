#!/bin/bash

## Deploys the HTML and API
echo "Building on branch: $TRAVIS_BRANCH"
npm test

if [[ 'master' == $TRAVIS_BRANCH ]]; then
    echo "Deploying on branch: $TRAVIS_BRANCH"
    set AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
    set AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
    set AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION
    set AWS_BUCKET=$AWS_BUCKET
    npm run deploy
fi
