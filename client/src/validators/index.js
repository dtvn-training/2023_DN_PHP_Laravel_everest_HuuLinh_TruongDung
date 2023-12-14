import validator from "validator";

const validateEmail = (email) => {
  if (email === "") {
    return "Please input email";
  } else if (!validator.isEmail(email)) {
    return "Invalid email";
  } else {
    return "";
  }
};

const validatePassword = (password) => {
  if (password === "") {
    return "Please input password";
  } else {
    return "";
  }
};

const validateTimeRange = (data) => {
  if (data.start_date > data.end_date) {
    return "Start date must be before end date";
  } else {
    return "";
  }
};

const validateStatus = (data) => {
  if (!data.status) {
    return "Please select a status";
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

export const validateCreateCampaign = (data) => {
  const errors = [];
  const statusError = validateStatus(data);
  const timeRangeError = validateTimeRange(data);

  if (statusError) {
    errors.push(statusError);
  }
  if (timeRangeError) {
    errors.push(timeRangeError);
  }

  return errors;
};

export const validateUpdateCampaign = (data) => {
  const errors = [];
  const timeRangeError = validateTimeRange(data);

  if (timeRangeError) {
    errors.push(timeRangeError);
  }

  return errors;
};
