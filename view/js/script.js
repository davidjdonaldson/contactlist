// JS code goes here
var nameRegex = new RegExp('[A-Za-z_]');
var mobileRegex = new RegExp('^[0-9]{1,10}$');
var emailRegex = new RegExp('@');

document.getElementById("submit").addEventListener("click", validateInputs);
document.getElementById("nameColumn").addEventListener("click", sort);

function validateInputs() {
    var errorDisplay = document.getElementById('error');
    
    if (validateName() === false || validateMobile() === false || validateEmail() === false) {
        errorDisplay.setAttribute('style', 'display:block;');
    } else {
        addContact();
        document.getElementById("name").value = '';
        document.getElementById("mobile").value = '';
        document.getElementById("email").value = '';
        errorDisplay.setAttribute('style', 'display:hidden;');
        console.log("success");
    }

}

function validateName() {
var firstName = document.getElementById('name').value;
 if(nameRegex.test(firstName) === true)
    return true;
else
    return false;
}

function validateMobile() {
var mobile = document.getElementById('mobile').value;
if(mobileRegex.test(mobile) === true)
    return true;
else
    return false;
}

function validateEmail() {
var email = document.getElementById('email').value;
if(emailRegex.test(email) === true)
    return true;
else
    return false;
}

function addContact() {
    sessionStorage.setItem('Name', document.getElementById('name').value);
    sessionStorage.setItem('Mobile', document.getElementById('mobile').value);
    sessionStorage.setItem('Email', document.getElementById('email').value);

    var table = document.getElementById("summaryTable");
    var row = table.insertRow(1);
    var nameCell = row.insertCell(0);
    var mobileCell = row.insertCell(1);
    var emailCell = row.insertCell(2);

    nameCell.innerHTML = sessionStorage.Name;
    mobileCell.innerHTML = sessionStorage.Mobile;
    emailCell.innerHTML = sessionStorage.Email;
};

function sort() {
    // build this
}