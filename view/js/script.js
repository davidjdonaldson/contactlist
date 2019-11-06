const nameRegex = new RegExp('[A-Za-z_]{1,20}');
const mobileRegex = new RegExp('^[0-9]{10,10}$');
const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');


// Setting up the table here because it was generating multiple tables on the render method each time it was called.
document.getElementById('contactSummary').insertAdjacentHTML('afterend', '<table id="contactsTable"><thead><tr><th id="nameFilter"><span id="clickName">Name</span><span id="arrowBody"><i id="clickAsc" class="fas fa-sort-up"></i><i id="clickDesc" class="fas fa-sort-down"></i></span></th><th>Mobile</th><th>Email</th></tr></thead><tbody id="rowBody"><tr id="trBody">');
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
document.getElementById("clickName").addEventListener("click", sort,'name');
document.getElementById("clickAsc").addEventListener("click", sort, 'name');
document.getElementById("clickDesc").addEventListener("click", sort, '-name');

function submit() {
    if(validateInputs()) {
        addContact(validName(),validMobile(),validEmail());
        clearInputs();
        render();
    }
    else {
         //Not sure if I should have a generic validation error message or specefic messages where validation failed.
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
    errorDisplay.innerHTML = message;
}

function validateInputs() {
    if (validName() === false || validMobile() === false || validEmail() === false) {
        return false;
    } else {
        const errorDisplay = document.getElementById('error'); 
        errorDisplay.setAttribute('style', 'display:hidden!important;');
        return true;
    }
}

function validName() {
    const firstName = document.getElementById('name').value;
    if (nameRegex.test(firstName) === true)
        return firstName;
    displayError('Please enter a valid name');
    return false;
}

function validMobile() {
    const mobile = document.getElementById('mobile').value;
    if (mobileRegex.test(mobile) === true)
        return mobile;
    displayError('Please enter a valid number');
    return false;
}

function validEmail() {
    const email = document.getElementById('email').value;
    if (emailRegex.test(email) === true)
        return email;
    displayError('Please enter a valid email');
    return false;
}

function addContact(name, mobile, email) {
    var existingContacts = JSON.parse(localStorage.getItem(allContactsKey));
    var newContact = {
        "name": name,
        "mobile": mobile,
        "email": email,
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
    var allContacts = getAllContact();
    var existingTableBody = document.getElementById('rowBody');
    existingTableBody.innerHTML = '';
    allContacts.forEach(function(retrievedContact) {
        existingTableBody.innerHTML += '<td>' + retrievedContact.name + '</td><td>' + retrievedContact.mobile + '</td><td>' + retrievedContact.email + '</td>';
     });
    
};

function clearInputs() {
    document.getElementById("name").value = '';
    document.getElementById("mobile").value = '';
    document.getElementById("email").value = '';
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

function sort(name) {
var contactsToSort = getAllContact();
contactsToSort.sort(dynamicSort(name));
getAllContact() = contactsToSort;
}