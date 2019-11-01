// JS code goes here
document.getElementById("submit").addEventListener("click", validateInput);
document.getElementById("nameColumn").addEventListener("click", sort);

function validateInput() {
    var disp = document.getElementById('error');
    var fName = document.getElementById('name').value;
    var fMobile = document.getElementById('mobile').value;
    var fEmail = document.getElementById('email').value;

    var nameRegex = new RegExp('[A-Za-z_]');
    var mobileRegex = new RegExp('^[0-9]{1,10}$');
    var emailRegex = new RegExp('@');

    var result1 = nameRegex.test(fName);
    var result2 = mobileRegex.test(fMobile);
    var result3 = emailRegex.test(fEmail);

    console.log(result1 + " " + result2 + " " + result3)

    if (result1 === false || result2 === false || result3 === false) {
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