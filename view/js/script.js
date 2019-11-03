// JS code goes here
var firstName = document.getElementById('name').value;
var mobile = document.getElementById('mobile').value;
var email = document.getElementById('email').value;
var nameRegex = new RegExp('[A-Za-z_]');
var mobileRegex = new RegExp('^[0-9]{1,10}$');
var emailRegex = new RegExp('@');




document.getElementById("submit").addEventListener("click", validateInputs);
document.getElementById("nameColumn").addEventListener("click", sort);


function validateInputs() {
    var errorDisplay = document.getElementById('error');

    if (validateName() === false || validateMobile() === false || validateEmail() === false) {
        disp.setAttribute('style', 'display:block;');
    } else {
        addContact();
        document.getElementById("name").value = '';
        document.getElementById("mobile").value = '';
        document.getElementById("email").value = '';
        disp.setAttribute('style', 'display:hidden;');
        console.log("success");
    }

}

function validateName() {
 if(nameRegex.test(firstName) === false)
    return false;
else
    return true;
}

function validateMobile() {
     if(mobileRegex.test(mobile) === false)
    return false;
else
    return true;
}

function validateEmail() {
     if(emailRegex.test(email) === false)
    return false;
else
    return true;
}

function addContact() {
    sessionStorage.setItem('Name', document.getElementById('name').value);
    sessionStorage.setItem('Mobile', document.getElementById('mobile').value);
    sessionStorage.setItem('Email', document.getElementById('email').value);

    var table = document.getElementById("summaryTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = sessionStorage.Name;
    cell2.innerHTML = sessionStorage.Mobile;
    cell3.innerHTML = sessionStorage.Email;
};

function sort() {
    // build this
}