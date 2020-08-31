const form = document.getElementById('form');

const validateEmail = (e) => {
  const target = e.target;
  const errorElement = target.parentNode.querySelector('.error');
  
  if (target.validity.valid) {
    clearError(errorElement);
  } else {
    //positionError(target, errorElement);
    if (target.validity.valueMissing) {
      renderError(errorElement, 'You have to fill in stuff');  
    } else {
      renderError(errorElement, getErrorMessage(target));
    }
  }
};

const positionError = (target, errorElement) => {
  const rightEdge = target.getBoundingClientRect().right;
  console.log(rightEdge)
  errorElement.style.left = `${rightEdge}px`;
};

const getErrorMessage = (target) => {
  let message = '';
  switch (target.name) {
    case 'email':
      message = getEmailMessage(target);
      //message = 'You have to do something here';
      break;
    case 'country':
      message = 'Do another thing here';
      break;
  }
  return message;
};

const getEmailMessage = (target) => {
  if(target.validity.typeMismatch) {
    return 'Entered value needs to be an e-mail address.';
  }
  if(target.validity.tooShort) {
    return `Email should be at least ${ target.minLength } characters; you entered ${ target.value.length }.`;
  }
};

const renderError = (errorElem, message) => {
  errorElem.textContent = message;
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