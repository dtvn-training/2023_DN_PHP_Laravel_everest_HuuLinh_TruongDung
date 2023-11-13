import validator from "validator";

export const validateName = (name) => {
  if (name === "") {
    return "Please input name";
  } else {
    return "";
  }
};

export const validateEmail = (email) => {
  if (email === "") {
    return "Please input email";
  }
  else if (!validator.isEmail(email)) {
    return "Invalid email";
  }
  else {
    return "";
  }
};

export const validatePassword = (password) => {
  if (password === "") {
    return "Please input password";
  } 
  else {
    return "";
  }
};
export const validatePasswordConfirmation = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return "Those passwords did not match. Try again.";
  } 
  else {
    return ""; 
  }
};
export const validateRegisterForm = (name, email, password, passwordConfirm) => {
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const passwordConfirmError = validatePasswordConfirmation(password, passwordConfirm)
  return {
    nameError,
    emailError,
    passwordError,
    passwordConfirmError,
  };
};