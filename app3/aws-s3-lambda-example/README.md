# aws-s3-lambda-example

[![Build Status](http://img.shields.io/travis/jrgics/aws-s3-lambda-example/master.svg?style=flat-square)](https://travis-ci.org/jrgics/aws-s3-lambda-example)
[![Dependency Status](http://img.shields.io/david/jrgics/aws-s3-lambda-example.svg?style=flat-square)](https://david-dm.org/jrgics/aws-s3-lambda-example)

A sample project demonstrating the use of AWS S3, Lambda and Gateway API functionality, as well as testing idioms.

This example serves to illustrate some of the features of AWS, as well as modern and accepted testing and automation methodologies.

## Installing

All dependencies may be installed with `npm install`.

## Running Locally

The website can run locally. If the standalone server is used, API's will be run locally, as well. Be sure to append `?environment=dev` in order to
have the website leverage the locally deployed API's.

### Standalone Server

In the console, run `npm serve:local`.

### Using the IDE

Some IDE's allow for live serving; check your IDE for reference. Using the live server functionality of the will not run the API's locally, so it is
important to run against deployed API's in this case.

## Running Tests

There are several types of tests which can be run:

* Unit tests against the local lambda functions
* Tests against the local HTML file
* API tests against the local API's
* Integration tests against the local HTML
* API tests against the deployed API's
* Integration tests against the deployed HTML

All local tests can be run with the command `npm test`.

### Local Lambda

Using [jest](https://jestjs.io/), the Lambda functions can be tested, with code coverage.

Run `npm run test:lambda`.

### Local HTML

Local HTML tests are run using [mocha](https://mochajs.org/) with [chai](https://www.chaijs.com/).

The HTML runner file is `test/html/index-spec.html` and the specs are located in `test/html/index-spec.js`.

#### In a Browser

Simply open `test/html/index-spec.html` in a browser. Be sure that the files are being served to the browser and not simply read off the disk. Most IDE's provide this behavior.

The page will refresh when tests are changed.

#### In the Console

In the console, run `npm run test:html` to run the HTML tests.

### Local API's

In the console, run `npm run test:api:local`.

### Local Integration

In the console, run `npm run test:integration:local`.

### Deployed API's

Using [postman](https://www.getpostman.com/) and [newman](https://www.npmjs.com/package/newman), the deployed API's can be tested. Be sure to modify the `test/api/env/production.postman_environment.json` file to reflect appropriate endpoints to test.

These tests can be modified using the Postman application.

Run the tests using the command `npm run test:api:production`.

### Deployed HTML

The end-to-end or integration tests leverage [cypress](https://www.cypress.io/). The tests can be modified by using the command `npm run test:integration:production`.

To open the integration test editor, run `npm run test:design:integration`.


## Deploying

Any deploy operation requires the AWS CLI, as well as some environment variables. Keep in mind that without these variables set, the deploy process will fail.

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_DEFAULT_REGION
* AWS_BUCKET

The HTML and API's may be deployed separately or together. To deploy the entire package, run `npm run deploy`. Deploying just the HTML, run `npm run deploy:s3` and the lambdas may be deployed using `npm run deploy:lambda`.

## AWS

### Installing AWS

Full instructions may be found on the Amazon website at <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html.>

On MacOS, for example, the CLI may be installed like:

```bash
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
```

Linux users may use a package manager:

```bash
sudo apt-get install awscli
```

### Configuring AWS

#### Create and Secure a Bucket

A bucket will need to be provisioned - be sure to edit the `conf/aws-s3-bucket-policy.json` file and replace `BUCKET_NAME` with the name of the bucket to deploy to.

#### Creating Users

Automated deploys require an access key and ID. Using IAM, a used can be created. Amazon lists the general procedure at <https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html>

##### Groups

In order to deploy, the user must belong to these groups:

* AmazonS3FullAccess
* AWSLambdaFullAccess
