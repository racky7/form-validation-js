const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const address = document.getElementById('address');
const gender = document.getElementById('gender');
const college = document.getElementById('college');
const dob = document.getElementById('dob');
const htmlslider = document.getElementById('htmlslider');
const cssslider = document.getElementById('cssslider');
const jsslider = document.getElementById('jsslider');
const modal = document.getElementById('modal');
const modalcontent = document.getElementById('modalcontent');

//variable declaration for values of form data
let fnameVal, lnameVal, emailVal, mobileVal, addressVal, genderVal, collegeVal, dobVal, htmlVal, cssVal, jsVal;


const getColleges = async () => {
    var data;
    //API call for fething list of university and colleges in india
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
    formControl.className = 'form-control success';
}

const isEmail = (email) => {
    //applying email regex
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const validateFirstName = () => {
    fnameVal = firstname.value.trim();
    if (fnameVal === "") {
        setErrorMsg(firstname, 'First name is required')
    }
    else removeErrorMsg(firstname)

}

const validateEmail = () => {
    emailVal = email.value.trim();

    if (emailVal === "") {
        setErrorMsg(email, 'Email is required')
    }
    else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'Please enter a valid email address.')
    }
    else removeErrorMsg(email)

}

const validatePhone = () => {
    mobileVal = mobile.value.trim();
    if (mobileVal === "") {
        setErrorMsg(mobile, 'Mobile number is required')
    }
    else if (mobileVal.length > 10) {
        setErrorMsg(mobile, 'Maximum 10 digit number is allowed')
    }
    else removeErrorMsg(mobile)

}

const validateLocation = () => {
    addressVal = address.value.trim();
    if (addressVal === "") {
        setErrorMsg(address, 'Current Location is requried')
    }
    else removeErrorMsg(address)

}

const validateGender = () => {
    genderVal = '';
    if (document.getElementById('male').checked) {
        genderVal = document.getElementById('male').value;
    }
    else if (document.getElementById('female').checked) {
        genderVal = document.getElementById('female').value;
    }

    if (genderVal === "") {
        setErrorMsg(gender, 'Please select your gender.')
    }
    else removeErrorMsg(gender)

}

const validateCollege = () => {
    collegeVal = college.value;
    if (collegeVal === "") {
        setErrorMsg(college, 'College is required')
    }
    else removeErrorMsg(college)

}

const validateDOB = () => {
    dobVal = dob.value;
    if (dobVal === "") {
        setErrorMsg(dob, 'DOB is required')
    }
    else removeErrorMsg(dob)

}

const handleValidation = () => {
    //removing white space before and after

    validateFirstName();

    //removing white space from lastname value
    lnameVal = lastname.value.trim();

    validateEmail();

    validatePhone();

    validateLocation();

    validateGender();

    validateCollege();

    validateDOB();

}

//form reset function
const formReset = () => {
    form.reset();
    htmlVal.innerText = 0;
    cssVal.innerText = 0;
    jsVal.innerText = 0;

}

const finalCheck = () => {

    //counting number of fields having sucess in their classname

    let formControls = document.getElementsByClassName('form-control')
    var count = 0;
    for (var i = 0; i < formControls.length; i++) {
        if (formControls[i].className === 'form-control success') {
            count += 1;
        }
    }

    //we only require 7 fields having classname success

    if (count == 7) {

        modal.style.display = "block";
        modalcontent.innerHTML +=
            `<center>Form is Valid</center> <br>
      <p>First Name - ${fnameVal}</p> <br>
      <p>Last Name - ${lnameVal}</p> <br>
      <p>Email - ${emailVal}</p> <br>
      <p>Mobile - ${mobileVal}</p> <br>
      <p>Current Location - ${addressVal}</p> <br>
      <p>Gender - ${genderVal}</p> <br>
      <p>College / University - ${collegeVal}</p> <br>
      <p>DOB - ${dobVal}</p> <br>
      <p>Skills - HTML : ${htmlVal.innerText}, CSS: ${cssVal.innerText} Javascript: ${jsVal.innerText}  </p> <br>
    `

        formReset();
    }


}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleValidation()
    finalCheck();

})

// skill bar handler

htmlVal = document.getElementById('htmlval');

cssVal = document.getElementById('cssval');

jsVal = document.getElementById('jsval');

const sliderHandler = (slider, outputVal) => {

    slider.innerHTML = slider.value;

    slider.oninput = function () {
        outputVal.innerText = this.value;
    }

}

sliderHandler(htmlslider, htmlVal);
sliderHandler(cssslider, cssVal);
sliderHandler(jsslider, jsVal);

//close modal handler
const closeModal = () => {
    modal.style.display = "none";
    modalcontent.innerHTML = "";
}
