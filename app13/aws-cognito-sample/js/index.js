<!-- UI Related Function -->
function showMenuDiv (display) {
    var e = document.getElementById('menuDiv');
    if (display)
        e.style.display = 'block';
    else
        e.style.display = 'none';
}

function showLoginDiv (display) {
    var e = document.getElementById('loginDiv');
    if (display)
        e.style.display = 'block';
    else
        e.style.display = 'none';
}

function setLoginErrorMessge (err) {
    var errorFld = document.getElementById ('loginErrMsg');
    errorFld.innerHTML = err.message;
}


function clearLoginError () {
    var errorFld = document.getElementById ('loginErrMsg');
    errorFld.innerHTML = '&nbsp;';
}


function disableButton (buttonName) {
    var aButton = document.getElementById (buttonName);
    aButton.disabled=true;
    aButton.innerHTML = "<img src='images/loading.gif'/>";
}


function enableButton (buttonName, buttonText) {
    var aButton = document.getElementById (buttonName);
    aButton.disabled=false;
    aButton.innerHTML = buttonText;
}
