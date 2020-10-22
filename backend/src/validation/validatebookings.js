const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookingInput(service, age, phone) {
  let errors = {};
  service = !isEmpty(service) ? service : "";
  age = !isEmpty(age) ? age : "";
  phone = !isEmpty(phone) ? phone : "";
  if (validator.isEmpty(service)) {
    errors.service = "service field is required";
  }
  if (validator.isEmpty(age)) {
    errors.age = "age field is required";
  }
  if (validator.isEmpty(phone)) {
    errors.phone = "phone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};