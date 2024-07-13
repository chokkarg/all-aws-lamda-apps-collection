var cognitoUser;

function _makeAWSCredentials (idToken) {
    var someVar = 'cognito-idp.' + awsConfig.regionName + 'us-west-2.amazonaws.com/' + awsConfig.userPoolId;
    return new AWS.CognitoIdentityCredentials( {
        IdentityPoolId: awsConfig.identityPoolId,
        Logins: {
           someVar : idToken
        }
    });
}


function _makeUserPool () {
    var poolData = {
        UserPoolId : awsConfig.userPoolId,
        ClientId : awsConfig.clientId
    };
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
}



function init () {
    AWS.config.region = awsConfig.regionName;


    // Load cognito User from local storage
    var userPool = _makeUserPool ();
    cognitoUser = userPool.getCurrentUser();


    // If not Found, show login page
    if (cognitoUser == null) {
        showLoginDiv (true);
        showMenuDiv(false);
        return;
    }


    // Load Session from Local storage if found
    cognitoUser.getSession(function(err, session) {
        if (err) {
            alert(err);
            return;
        }

        console.log('session validity: ' + session.isValid());
        console.log('ID Token: ' + session.idToken.jwtToken);

        // Set Credentials within AWS Config to access other AWS services
        var idToken = session.idToken.jwtToken;
        AWS.config.credentials = _makeAWSCredentials (idToken);

        // Refresh the credentials - in case the session has expired
        AWS.config.credentials.get(function(err){
            if (err) {
                alert(err);
            }
        });

    });

    // if user is logged IN, show Menu
    showMenuDiv (true);
    showLoginDiv (false);
}



function onLogin () {
    clearLoginError ();
    disableButton ('loginButton');

    var userNameFld = document.getElementById ('userName');
    var passwordFld = document.getElementById ('password');

    if (userNameFld === null || passwordFld === null) {
        alert ('Programmatic Error. User Name or Password Field is not configured properly');
        return;
    }

    var userName = userNameFld.value;
    var password = passwordFld.value;

    // Now Login to AWS
    _loginToAWS (userName, password);
}



function _loginToAWS (userName, password) {
    var userPool = _makeUserPool ();
    var userData = {
        Username : userName,
        Pool : userPool
    };
    cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    var authenticationData = {
            Username : userName,
            Password : password,
        };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);


    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: _callbackOnAWSLoginSuccess,
        onFailure: _callbackOnAWSLoginFailure,
        newPasswordRequired: _callbackOnAWSForcePasswdChange
    });

}


function _callbackOnAWSLoginSuccess (result) {
    console.log('access token + ' + result.getAccessToken().getJwtToken());
    /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
    console.log('idToken + ' + result.idToken.jwtToken);

    idToken = result.idToken.jwtToken;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials( {
        IdentityPoolId: 'us-west-2:b23326a5-e847-49ff-aa97-f4167056c634',
        Logins: {
           'cognito-idp.us-west-2.amazonaws.com/us-west-2_9M8H5S4iM': idToken
        }
    });

    setTimeout (function () {
        enableButton ('loginButton', 'Sign in');
        showMenuDiv (true);
        showLoginDiv (false);
    }, 100);
}



function _callbackOnAWSLoginFailure (err) {
    console.log ("Failure: ");
    setLoginErrorMessge (err);
    enableButton ('loginButton', 'Sign in');
}



// TODO: Improve this by asking for modified password
function _callbackOnAWSForcePasswdChange (userAttributes, requiredAttributes) {
    // User was signed up by an admin and must provide new
    // password and required attributes, if any, to complete
    // authentication.

    // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.
    // Required attributes according to schema, which don’t have any values yet, will have blank values.
    // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.

    console.log('User Attributes: ' + userAttributes);
    console.log('Required Attributes: ' + requiredAttributes);

    // Get these details and call
    // newPassword: password that user has given
    // attributesData: object with key as attribute name and value that the user has given.
    cognitoUser.completeNewPasswordChallenge('password123', {}, this)
}




function onLogout () {
    if (cognitoUser == null) {
        alert ('user not logged in');
        return;
    }

    cognitoUser.signOut ();
    cognitoUser = null;
    showLoginDiv (true);
    showMenuDiv (false);
    console.log ('Signed Out');
}
