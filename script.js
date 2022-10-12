const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const address = document.getElementById('address');
const college = document.getElementById('college');
const dob = document.getElementById('dob');

//API call for fething list of university and colleges
const getColleges = async () => {
    var data;
    data = await fetch("http://universities.hipolabs.com/search?country=India")
        .then(response => response.json())
        .then(result => data = result)
        .catch(error => console.log('error', error));

    var collegeOptions = '';
    data.forEach((itm, ind) => {
        collegeOptions += `<option value="${itm.name}">${itm.name}</option>`
    })

    college.innerHTML += collegeOptions;

}

getColleges();


const setErrorMsg = (input, errmsg) => {

    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = errmsg;
}

const removeErrorMsg = (input) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control success';
}

const isEmail = (email) => {
    // length of email
    n = email.length;

    // Check position of '@''
    var indexOfAt = email.indexOf("@");
    if (indexOfAt == 0 || indexOfAt == n - 1) return false;
    // Check position of '.'
    var indexOfDot = email.lastIndexOf('.');
    if (indexOfDot <= indexOfAt + 2 || indexOfDot == n - 1) return false;

    return true;
}

const validateFirstName = () => {
    const fnameVal = firstname.value.trim();
    if (fnameVal === "") {
        setErrorMsg(firstname, 'First name is required')
    }
    else removeErrorMsg(firstname)

}

const validateEmail = () => {
    const emailVal = email.value.trim();

    if (emailVal === "") {
        setErrorMsg(email, 'Email is required')
    }
    else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'Please enter a valid email address.')
    }
    else removeErrorMsg(email)

}

const validatePhone = () => {
    const mobileVal = mobile.value.trim();
    if (mobileVal === "") {
        setErrorMsg(mobile, 'Mobile number is required')
    }
    else if (mobileVal.length > 10) {
        setErrorMsg(mobile, 'Maximum 10 digit number is allowed')
    }
    else removeErrorMsg(mobile)

}

const validateLocation = () => {
    const addressVal = address.value.trim();
    if (addressVal === "") {
        setErrorMsg(address, 'Current Location is requried')
    }
    else removeErrorMsg(address)

}

const validateCollege = () => {
    const collegeVal = college.value;
    if (collegeVal === "") {
        setErrorMsg(college, 'College is required')
    }
    else removeErrorMsg(college)

}

const validateDOB = () => {
    const dobVal = dob.value;
    if (dobVal === "") {
        setErrorMsg(dob, 'DOB is required')
    }
    else removeErrorMsg(dob)

}

const handleValidation = () => {
    //removing white space before and after

    validateFirstName();

    validateEmail();

    validatePhone();

    validateLocation();

    validateCollege();

    validateDOB();

}

const finalCheck = () => {

    let formControls = document.getElementsByClassName('form-control')
    var count = 0;
    for (var i = 0; i < formControls.length; i++) {
        if (formControls[i].className === 'form-control success') {
            count += 1;
        }
    }

    if (count == 6) {
        alert('Form Valid')
    }
    else {
        //Set blur event on each field
        firstname.addEventListener("blur", validateFirstName);
        email.addEventListener("blur", validateEmail);
        mobile.addEventListener("blur", validatePhone);
        address.addEventListener("blur", validateLocation);
        college.addEventListener("change", validateCollege);
        dob.addEventListener("change", validateDOB);
    }


}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleValidation()
    finalCheck();

})