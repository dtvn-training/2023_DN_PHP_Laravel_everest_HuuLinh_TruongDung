import validator from "validator";

export const validateEmail = (email) => {
  if (email === "") {
    return "Please input email";
  } else if (!validator.isEmail(email)) {
    return "Invalid email";
  } else {
    return "";
  }
};

export const validatePassword = (password) => {
  if (password === "") {
    return "Please input password";
  } else {
    return "";
  }
};
export const validatePasswordConfirmation = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return "Confirm password does not match";
  } else {
    return "";
  }
};

export const validateLoginForm = (email, password) => {
  const errors = [];
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) {
    errors.push(emailError);
  }
  if (passwordError) {
    errors.push(passwordError);
  }

  return errors;
};

export const validateCreateAccountForm = (password, passwordConfirm) => {
  const errors = [];
  const passwordConfirmError = validatePasswordConfirmation(
    password,
    passwordConfirm
  );

  if (passwordConfirmError) {
    errors.push(passwordConfirmError);
  }

  return errors;
};
