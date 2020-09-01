const form = document.getElementById('form');

const validateEmail = (e) => {
  const target = e.target;
  const errorElement = target.parentNode.querySelector('.error');
  
  if (target.validity.valid) {
    clearError(errorElement);
  } else {
    renderError(errorElement, getErrorMessage(target));
    positionError(target, errorElement);
  }
};

const positionError = (target, errorElement) => {
  const targetHeight = target.getBoundingClientRect().height;
  const errorHeight = errorElement.getBoundingClientRect().height;
  const difference = errorHeight - targetHeight;

  errorElement.style.bottom = `${-(difference / 2)}px`;
};

const getErrorMessage = (target) => {
  if (target.validity.valueMissing) return 'You have to fill in stuff';
  
  let message = '';
  
  switch (target.name) {
    case 'email':
      message = messages().getEmailMessage(target);
      break;
    case 'country':
      message = messages().getCountryMessage(target);
      break;
    case 'zip':
      message = messages().getZipMessage(target);
      break;
    case 'password':
      message = messages().getPasswordMessage(target);
      break;
    case 'password-confirmation':
      console.log('john')
      message = messages().getPasswordConfirmationMessage();
      break;
  }
  return message;
};

const messages = () => {
  const getEmailMessage = (target) => {
    if(target.validity.typeMismatch) {
      return 'Entered value needs to be an e-mail address.';
    }
    if(target.validity.tooShort) {
      return `Email should be at least ${ target.minLength } characters`;
    }
  };
  
  const getCountryMessage = (target) => {
    if (target.validity.patternMismatch) {
      return 'Country name can not contain any numbers';
    }
    if(target.validity.tooShort) {
      return `Country should be at least ${ target.minLength } characters`;
    }
  };

  const getZipMessage = (target) => {
    if (target.validity.patternMismatch) {
      return "Zip should be in the format DK-0000 (yes, a Danish post code)";
    }
  };

  const getPasswordMessage = (target) => {
    if (target.validity.patternMismatch) {
      return `Password must have:<br>
      - A length of at least 8<br>
      - One or more uppercase characters<br>
      - One or more lowercase characters<br>
      - One or more numeric values<br>
      - One or more special characters
      `;
    }
  };

  const getPasswordConfirmationMessage = () => {
    const password = form.password.value;
    const passwordConfirmationValue = form['password-confirmation'].value;
    console.log(password)
    console.log(passwordConfirmationValue)
  };

  return { getEmailMessage, getCountryMessage, getZipMessage, getPasswordMessage, getPasswordConfirmationMessage };
};



const renderError = (errorElement, message) => {
  errorElement.querySelector('p').innerHTML = message;
  errorElement.classList.add('show');
};

const clearError = (errorElem) => {
  errorElem.classList.remove('show');
};

Array.from(form.elements).forEach(element => {
  if (element.tagName !== 'button') {
    element.addEventListener('blur', validateEmail);
  }
});