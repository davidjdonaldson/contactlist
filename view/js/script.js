const nameRegex = new RegExp('[A-Za-z_]');
const mobileRegex = new RegExp('^[0-9]{1,10}$');
const emailRegex = new RegExp('@');
const errorDisplay = document.getElementById('error');
var table = document.getElementById("summaryTable");
var row = table.insertRow(1);
var nameCell = row.insertCell(0);
var mobileCell = row.insertCell(1);
var emailCell = row.insertCell(2);
var allContacts = []

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
    if(existingContacts == null) 
        existingContacts = [];
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
    allContacts.push(contact);
    localStorage.setItem("existingContacts", JSON.stringify(allContacts));
}

function render() {
    var getContacts = JSON.parse(localStorage.getItem('allContacts'));
    var input = '';
    for (var i = 0; i < getContacts.length; i++) {
           console.log(getContacts);
           input = '<tr><th>' + getContacts.name + '</th><th>' + getContacts.mobile + '</th><th>' + getContacts.email + '</th></tr>';
       }

console.log(input);


    // table = document.getElementById("summaryTable");
    // row = table.insertRow(1);
    // nameCell = row.insertCell(0);
    // mobileCell = row.insertCell(1);
    // emailCell = row.insertCell(2);

    // nameCell.textContent = getContacts.name;
    // mobileCell.textContent = getContacts.mobile;
    // emailCell.textContent = getContacts.email;

    // const function getContacts() {
    //     for (var i = 0; i < localStorage.length i++) {
    //         console.log(localStorage)
    // }
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