# Amazon Cognito with S3 & Lamda
The goal of this application is to understand how to use Amazon Cognito and gain access to other Amazon Services like S3 and Lamda.

The intention is to create a simple web app that has the following features
- Login by giving a user name and password
- View all files of a particular S3 Bucket
- Upload an image to an S3 bucket.
- TODO: Invoke a Lamda function passing a few parameters

## How does it work
User Management is done by defining a user pool where users are added. You can create a new user pool using the AWS documentation [here](http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html). For a user to be able to login to this application, it must be added in the user pool. Once the user pool is created (through the console possibly), a user identity pool will be required to be created. Follow the Cognito Developer's Guide to create it.

## How to get this app to work
Spcecify the correct parameters in config.js and open the index.html file

##### Useful Links
- AWS SDK Guide: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html
- AWS Cognito Identity: Common use cases can be found here - https://github.com/aws/amazon-cognito-identity-js
