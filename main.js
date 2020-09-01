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
    console.log(target.validity.patternMismatch)
    if (target.validity.patternMismatch) {
      return 'Country name can not have any numbers';
    }
    if(target.validity.tooShort) {
      return `Country should be at least ${ target.minLength } characters`;
    }
  };

  const getZipMessage = (target) => {
    
    if (target.validity.patternMismatch) {
      return "Zip should be exactly 4 numbers, or be in the format DK-0000";
    }
  };

  return { getEmailMessage, getCountryMessage, getZipMessage };
};





const renderError = (errorElem, message) => {
  //errorElem.textContent = message;
  errorElem.classList.add('show');
};

const clearError = (errorElem) => {
  errorElem.classList.remove('show');
};

Array.from(form.elements).forEach(element => {
  if (element.tagName !== 'button') {
    element.addEventListener('blur', validateEmail);
  }
});