export const validateEmail = (email) => {
  var RegularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegularExpression.test(email);
};

export const validateRequireFields = (text) => {
  return !(text.trim().length === 0);
};

export const validateMinLength = (text, minLength) => {
  return text.length >= minLength;
};

export const validateMaxLength = (text, maxLength) => {
  return text.length <= maxLength;
};

export const validateMatchString = (str1, str2) => {
  return str1 === str2;
};

export const validatePassword = (password) => {
  var mediumRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  );

  return mediumRegex.test(password);
};

export const validateMobileNumber = (country, number) => {
  if (country === 'Kuwait') {
    return /^(([0-9]{9})|([0-9]{8})){1}$/.test(number);
  } else if (country === 'Egypt') {
    return /^(010|011|012|015){1}[0-9]{8}$/.test(number);
  } else if (country === 'Lebanon') {
    return /^(([0-9]{7})|([0-9]{8})){1}$/.test(number);
  } else {
    return /^(([0-9]{9})|([0-9]{8})){1}$/.test(number);
  }
};

export const validateMobileNumberWithoutCountry = (number) => {
  if (
    /^(([0-9]{9})|([0-9]{8})){1}$/.test(number) ||
    /^(010|011|012|015){1}[0-9]{8}$/.test(number) ||
    /^(([0-9]{9})|([0-9]{8})){1}$/.test(number)
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateNumber = (number) => {
  return /[0-9]/.test(number);
};

export const validateUserName = (userName) => {
  var RegularExpression = /^[a-zA-Z0-9@_\-.]*$/;
  return RegularExpression.test(userName);
};
