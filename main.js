const form = document.getElementById('form');

const validateForm = (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    Array.from(form.elements).forEach(element => {
      if (element.name !== 'submit') {
        validateField(element);
      }
    });
  }
};

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
  if (target.validity.valueMissing) return messages().emptyField;
  
  let message = '';
  
  switch (target.name) {
    case 'email':
      message = messages().email(target);
      break;
    case 'country':
      message = messages().country(target);
      break;
    case 'zip':
      message = messages().zip(target);
      break;
    case 'password':
      message = messages().password(target);
      break;
    case 'password-confirmation':
      message = messages().passwordConfirmation(target);
      break;
  }
  return message;
};

const messages = () => {
  const emptyField = 'You have to fill in stuff';

  const email = (target) => {
    if(target.validity.typeMismatch) {
      return 'Entered value needs to be an e-mail address.';
    }
    if(target.validity.tooShort) {
      return `Email should be at least ${ target.minLength } characters`;
    }
  };
  
  const country = (target) => {
    if (target.validity.patternMismatch) {
      return 'Country name can not contain any numbers';
    }
    if(target.validity.tooShort) {
      return `Country should be at least ${ target.minLength } characters`;
    }
  };

  const zip = (target) => {
    if (target.validity.patternMismatch) {
      return "Zip should be in a Danish postal code format, eg. 'DK-xxxx' or just 'xxxx'";
    }
  };

  const password = (target) => {
   
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

  const passwordConfirmation = (target) => {
    const password = form.password.value;
    const passwordConfirmationValue = form['password-confirmation'].value;

    if (target.validity.patternMismatch) {
      return "Passwords don't match";
    }    
  };

  return { emptyField, email, country, zip, password, passwordConfirmation };
};

const setPasswordConfirmationPattern = (target) => {
  const password = form.password.value;
  target.setAttribute('pattern', `(?:^|\W)${password}(?:$|\W)`);
};

const renderErrorMessage = (errorElement, message) => {
  errorElement.querySelector('p').innerHTML = message;
  errorElement.classList.add('show');
};

const clearErrorMessage = (errorElement) => {
  errorElement.classList.remove('show');
};

Array.from(form.elements).forEach(element => {
  if (element.name !== 'submit') element.addEventListener('blur', validateField);
});

form.submit.addEventListener('click', validateForm);