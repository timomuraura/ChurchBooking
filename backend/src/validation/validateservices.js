const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateServiceInput(service) {
    let errors = {};
    name = !isEmpty(service.name) ? service.name : "";
    time = !isEmpty(service.time) ? service.time : "";
    if (validator.isEmpty(time)) {
        errors.time = "Time field is required";
    }
    if (validator.isEmpty(name)) {
        errors.name = "name field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};