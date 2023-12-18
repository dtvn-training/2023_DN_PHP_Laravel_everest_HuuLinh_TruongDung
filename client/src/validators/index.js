import validator from "validator";

const validateEmail = ({ email }) => {
  if (!email) return "Please input email";
  if (!validator.isEmail(email)) return "Invalid email";
  return "";
};

const validatePassword = ({ password }) => {
  if (!password) return "Please input password";
  if (!validator.isStrongPassword(password)) return "Password is too weak";
  return "";
};

const validateRoleSelection = ({ role_id }) => {
  if (!role_id || !validator.isNumeric(role_id)) return "Please select role";
  return "";
};

const validateTimeRange = ({ start_date, end_date }) => {
  if (start_date > end_date) return "Start date must be before end date";
  return "";
};

const validateStatus = ({ status }) => {
  if (!status || !validator.isNumeric(status)) return "Please select status";
  return "";
};

export const validatePasswordConfirmation = ({
  password,
  confirm_password,
}) => {
  if (password !== confirm_password) return "Confirm password does not match";
  return "";
};

export const validateCreateAccountForm = (data) => {
  const errors = [
    validateEmail(data),
    validateRoleSelection(data),
    validatePassword(data),
    validatePasswordConfirmation(data),
  ].filter(Boolean);
  return errors;
};

export const validateEditAccount = (data) => {
  const errors = [validateEmail(data), validateRoleSelection(data)].filter(
    Boolean
  );
  return errors;
};

export const validateCreateCampaign = (data) => {
  const errors = [validateStatus(data), validateTimeRange(data)].filter(
    Boolean
  );
  return errors;
};

export const validateUpdateCampaign = (data) => {
  const errors = [validateStatus(data), validateTimeRange(data)].filter(
    Boolean
  );
  return errors;
};
