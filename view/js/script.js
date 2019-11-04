const nameRegex = new RegExp('[A-Za-z_]');
const mobileRegex = new RegExp('^[0-9]{1,10}$');
const emailRegex = new RegExp('@');
const errorDisplay = document.getElementById('error');
var table = document.getElementById("summaryTable");
var row = table.insertRow(1);
var nameCell = row.insertCell(0);
var mobileCell = row.insertCell(1);
var emailCell = row.insertCell(2);
var allContacts

document.getElementById("submit").addEventListener("click", validateInputs);
document.getElementById("nameColumn").addEventListener("click", sort);

function validateInputs() {
    
    if (validateName() === false || validateMobile() === false || validateEmail() === false) {
        errorDisplay.setAttribute('style', 'display:block!important;');
    } else {
        addContact();
        clearInputs();
        render();
        errorDisplay.setAttribute('style', 'display:hidden!important;');
    }
}

function validateName() {
const firstName = document.getElementById('name').value;
 if(nameRegex.test(firstName) === true)
    return true;
return false;
}

function validateMobile() {
const mobile = document.getElementById('mobile').value;
if(mobileRegex.test(mobile) === true)
    return true;
return false;
}

function validateEmail() {
const email = document.getElementById('email').value;
if(emailRegex.test(email) === true)
    return true;
return false;
}

function addContact() {
    var existingContacts = JSON.parse(localStorage.getItem('allContacts'));
    if(existingContacts == null) existingContacts = [];
    var name = document.getElementById('name').value;
    var mobile = document.getElementById('mobile').value;
    var email = document.getElementById('email').value;
    var contact = {
        "name": name,
        "mobile": mobile,
        "email": email
    };

    localStorage.setItem("contact", JSON.stringify(contact));
    // Append existing entries back
    existingContacts.push(contact);
    localStorage.setItem("allContacts", JSON.stringify(existingContacts));
}

function render() {
    var parsedContact = JSON.parse(localStorage.getItem('allContacts') || []);
    var input = '';

    parsedContact.forEach(function(contact) {
        console.log(contact.name);
        input = '<tr><th>' + contact.name + '</th><th>' + contact.mobile + '</th><th>' + contact.email + '</th></tr>';
});
    console.log(input);
    document.getElementById("summaryTable").innerHTML = '<table id="summaryTable"><thead><tr><th id="nameColumn">Name</th><th>Mobile</th><th>Email</th></tr></thead><tbody>' + input + '</tbody></table>';
};

function clearInputs() {
    document.getElementById("name").value = '';
    document.getElementById("mobile").value = '';
    document.getElementById("email").value = '';
}

function sort() {
    console.log(getContacts)
var inSort = [
    { name: 'name', value: getContacts.name},
    { name: 'mobile', value: getContacts.mobile},
    { name: 'email', value: getContacts.email}
];
console.log(inSort)
inSort.sort(function (a, b) {
  return a.value - b.value;
});

inSort.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
window.localStorage.setItem('contacts', JSON.stringify(inSort));
render();
}