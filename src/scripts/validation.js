const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#eMail");
const phoneNo = document.querySelector("#phoneNo");
const form = document.querySelector("form");
const dialog = document.querySelector('#thanksMsg');
const closeDialog = document.querySelector('.close-btn')

function getErrorElementForInput(input) {
  return document.querySelector(`.error[data-error-for="${input.id}"]`);
}



function nameValidate(name, errorElement) {
  const nameValue = name.value;
  const regExp = /[^\p{L}]/gu;
  if (nameValue.trim() === "") {
    errorElement.textContent = "Name cannot be empty";
    errorElement.style.opacity = 1;
    return false;
  } else if (nameValue.match(regExp)) {
    errorElement.textContent = "Please enter only letters";
    errorElement.style.opacity = 1;
    return false;
  } else {
    errorElement.textContent = "";
    errorElement.style.opacity = 0;
    return true;
  }
}

function emailValidate(emailInput, errorElement) {
  const emailValue = emailInput.value;
  const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailValue.trim() === "") {
    errorElement.textContent = "Name cannot be empty";
    errorElement.style.opacity = 1;
    return false;
  } else if (!emailValue.includes("@")) {
    errorElement.textContent = "Include @ in your Email";
    errorElement.style.opacity = 1;
    return false;
  } else if (!regExp.test(emailValue)) {
    errorElement.textContent = "Enter a valid email";
    errorElement.style.opacity = 1;
    return false;
  } else {
    errorElement.textContent = "";
    errorElement.style.opacity = 0;
    return true;
  }
}

function phoneValidate(phoneinput, errorElement) {
  const phoneValue = phoneinput.value;
  const regExp = /^\+\d{1,4}\s\d{7,15}$/;
  if (phoneValue.trim() === "") {
    errorElement.textContent = "Phone no. cannot be empty";
    errorElement.style.opacity = 1;
    return false;
  } else if (!regExp.test(phoneValue)) {
    errorElement.textContent = "Enter valid number with code";
    errorElement.style.opacity = 1;
    return false;
  } else {
    errorElement.textContent = "";
    errorElement.style.opacity = 0;
    return true;
  }
}

firstName.addEventListener("input", () => {
  nameValidate(firstName, getErrorElementForInput(firstName));
});

lastName.addEventListener("input", () => {
  nameValidate(lastName, getErrorElementForInput(lastName));
});

email.addEventListener("input", () => {
  emailValidate(email, getErrorElementForInput(email));
});

phoneNo.addEventListener("input", () => {
  phoneValidate(phoneNo, getErrorElementForInput(phoneNo));
});

nameValidate(firstName, getErrorElementForInput(firstName));

nameValidate(lastName, getErrorElementForInput(lastName));

emailValidate(email, getErrorElementForInput(email));

phoneValidate(phoneNo, getErrorElementForInput(phoneNo));

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstNameValid = nameValidate(firstName, getErrorElementForInput(firstName));
  const lastNameValid = nameValidate(lastName, getErrorElementForInput(lastName));
  const emailValid = emailValidate(email, getErrorElementForInput(email));
  const phoneValid = phoneValidate(phoneNo, getErrorElementForInput(phoneNo));
  if (firstNameValid && lastNameValid && emailValid && phoneValid) {
    dialog.showModal();
    setTimeout(() => {
      form.submit(); // This will submit to Formspree
      form.reset()
    }, 1000); // 1 second delay so dialog is visible before submit

  }
});

closeDialog.addEventListener('click', () => {
  dialog.close();
});