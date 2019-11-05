const nameRegex = new RegExp('[A-Za-z_]');
const mobileRegex = new RegExp('^[0-9]{1,10}$');
const emailRegex = new RegExp('@');

// Setting up the table here because it was generating multiple tables on the render method each time it was called.
document.getElementById('contactSummary').insertAdjacentHTML('afterend', '<table id="contactsTable"><thead><tr><th id="nameFilter">Name</th><th>Mobile</th><th>Email</th></tr></thead><tbody id="rowBody"><tr id="trBody">');
document.getElementById('trBody').insertAdjacentHTML('beforeend', '</tr></tbody></table>');

var allContactsKey = 'allContacts'

//Displaying the existing contact list saved in local storage
window.onload = function() {
  if(getAllContact() == null) {
    console.log('no contacts');
} else {
    render();
}
};

//Waiting for clicks
document.getElementById("submit").addEventListener("click", submit);
document.getElementById("nameFilter").addEventListener("click", sort);

function submit() {
    if(validateInputs()) {
        addContact(); // TODO: need to pass in the validated new contact
        clearInputs();
        render();
    }
    else {
        displayError('There was a validation error'); // TODO: Add error message function, and pass it a message
    }
}

function getAllContact() {
    const parsedContacts = JSON.parse(localStorage.getItem(allContactsKey));
    if(parsedContacts === null) {
        console.log('no contacts');
        } else {
     return parsedContacts
    }
}

function displayError(message) {
    const errorDisplay = document.getElementById('error');
    errorDisplay.setAttribute('style', 'display:block!important;');
    errorDislay.textContent = message;

}

function validateInputs() {
    if (validateName() === false || validateMobile() === false || validateEmail() === false) {
        return false;
        // 
    } else {
        const errorDisplay = document.getElementById('error'); 
        errorDisplay.setAttribute('style', 'display:hidden!important;');

        return true;

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
    var existingContacts = JSON.parse(localStorage.getItem(allContactsKey));

    var newContact = {
        "name": document.getElementById('name').value,
        "mobile": document.getElementById('mobile').value,
        "email": document.getElementById('email').value
    };
    if(existingContacts) {
        existingContacts.push(newContact);
    }
    else {
        existingContacts = [];
        existingContacts.push(newContact);
    }
    
    localStorage.setItem(allContactsKey, JSON.stringify(existingContacts));

}

function render() {
    //TO DO: Make a getAllContacts function for retrieving contacts from the localstorage
    var allContacts = getAllContact();

    var existingTableBody = document.getElementById('rowBody');
    existingTableBody.innerHTML = '';
    allContacts.forEach(function(retrievedContact) {
        existingTableBody.innerHTML += '<tr><td>' + retrievedContact.name + '</td><td>' + retrievedContact.mobile + '</td><td>' + retrievedContact.email + '</td><tr>';
     });
    
};

function clearInputs() {
    document.getElementById("name").value = '';
    document.getElementById("mobile").value = '';
    document.getElementById("email").value = '';
}

function sort() {
   
}