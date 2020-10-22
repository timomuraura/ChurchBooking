const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.user_name)) {
    errors.user_name = "Name field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
