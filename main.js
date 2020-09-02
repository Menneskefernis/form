const form = document.getElementById('form');

const validateField = (e) => {
  let target = e.target;
  if (!target) target = e;

  const errorElement = target.parentNode.querySelector('.error');
  if (target.name === 'password-confirmation') setPasswordConfirmationPattern(target);
  
  if (target.validity.valid) {
    target.classList.remove('input-error');
    clearErrorMessage(errorElement);
  } else if (!target.validity.valid) {
    target.classList.add('input-error');
    renderErrorMessage(errorElement, getErrorMessage(target));
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
      message = messages().getPasswordConfirmationMessage(target);
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
      return `<strong>Password must have:</strong><br>
      <ul>
        <li>A length of at least 8</li>
        <li>One or more uppercase characters</li>
        <li>One or more lowercase characters</li>
        <li>One or more numeric values</li>
        <li>One or more special characters</li>
      </ul>
      `;
    }
  };

  const getPasswordConfirmationMessage = (target) => {
    const password = form.password.value;
    const passwordConfirmationValue = form['password-confirmation'].value;
    console.log(form['password-confirmation'].pattern)
    if (target.validity.patternMismatch) {
      return "Passwords don't match";
    }    
  };

  return { getEmailMessage, getCountryMessage, getZipMessage, getPasswordMessage, getPasswordConfirmationMessage };
};

const setPasswordConfirmationPattern = (target) => {
  const password = form.password.value;
  target.setAttribute('pattern', `(?:^|\W)${password}(?:$|\W)`);
};

const renderErrorMessage = (errorElement, message) => {
  errorElement.querySelector('p').innerHTML = message;
  errorElement.classList.add('show');
};

const clearErrorMessage = (errorElem) => {
  errorElem.classList.remove('show');
};

Array.from(form.elements).forEach(element => {
  if (element.name !== 'submit') element.addEventListener('blur', validateField);
});

const checkForm = (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    Array.from(form.elements).forEach(element => {
      if (element.name !== 'submit') {
        console.log(element.tagName)
        validateField(element);
      }
    });
  }
};

form.submit.addEventListener('click', checkForm);