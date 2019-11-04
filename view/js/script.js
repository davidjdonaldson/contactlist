const nameRegex = new RegExp('[A-Za-z_]');
const mobileRegex = new RegExp('^[0-9]{1,10}$');
const emailRegex = new RegExp('@');
const errorDisplay = document.getElementById('error');
// Setting up the table here because it was generating multiple tables on the render method each time it was called.
document.getElementById('contactSummary').insertAdjacentHTML('afterend', '<table id="contactsTable"><thead><tr><th id="nameFilter">Name</th><th>Mobile</th><th>Email</th></tr></thead><tbody><tr id="trBody">');
document.getElementById('trBody').insertAdjacentHTML('beforeend', '</tr></tbody></table>');

var allContacts

//Displaying the existing contact list saved in local storage
render()

//Waiting for clicks
document.getElementById("submit").addEventListener("click", validateInputs);
document.getElementById("nameFilter").addEventListener("click", sort);

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
    if (nameRegex.test(firstName) === true)
        return true;
    return false;
}

function validateMobile() {
    const mobile = document.getElementById('mobile').value;
    if (mobileRegex.test(mobile) === true)
        return true;
    return false;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    if (emailRegex.test(email) === true)
        return true;
    return false;
}

function addContact() {
    var existingContacts = JSON.parse(localStorage.getItem('allContacts'));
    if (existingContacts == null) existingContacts = [];
   
    var newContact = {
        "name": document.getElementById('name').value,
        "mobile": document.getElementById('mobile').value,
        "email": document.getElementById('email').value
    };
    existingContacts = existingContacts.concat(newContact);
    localStorage.setItem("allContacts", JSON.stringify(existingContacts));

}

function render() {
    var parsedContact = JSON.parse(localStorage.getItem("allContacts"));
    if(parsedContact === null) {
        console.log('no contacts');
    } else {
    for (var i = 0, len = parsedContact.length; i < len; i++) {
        document.getElementById('trBody').insertAdjacentHTML('afterend', '<th>' + parsedContact.name + '</th><th>' + parsedContact.mobile + '</th><th>' + parsedContact.email + '</th>');
     };
    }
};

function clearInputs() {
    document.getElementById("name").value = '';
    document.getElementById("mobile").value = '';
    document.getElementById("email").value = '';
    localStorage.clear();
}

function sort() {
    var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);    
}