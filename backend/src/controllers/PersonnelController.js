const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const Personnel = require("../../models").Personnel;

const {
  createError,
  validateLoginInput,
  isEmpty
} = require("../validation");

const {
  keys
} = require("../../config");

module.exports = {
  findById(id, result) {
    if (id > 0) {
      Personnel.findOne({
        attributes: [
          "id",
        ],
        where: {
          id: id,
        },
      })
        .then((personnel) => {
          if (personnel) {
            result(null, personnel);
          } else {
            let err = {
              error: "Personel does not exist",
            };
            result(err, null);
          }
        })
        .catch((error) => {
          result(error, null);
        });
    } else {
      let err = {
        error: "The ID is not a number",
      };
      result(err, null);
    }
  },
  findPersonnel(where, result) {
    Personnel.findOne({
        raw: true,
        attributes: ["*"],
        where: where,
      })
      .then((user) => {
        return result(null, user);
      })
      .catch((error) => {
        result(error, null);
      });
  },
  login(personnel, result) {
    const {
      errors,
      isValid
    } = validateLoginInput(personnel);

    if (!isValid) {
      const customError = createError(errors);
      result(customError, null);
    } else {
      this.findPersonnel({
          personnel_name: personnel.user_name,
        },
        (err, user) => {
          if (err) {
            result(err, null);
          } else {
            if (user) {
              if (user.personnel_reset_password === 1) {
                const customError = createError({
                  password: "Please reset your password",
                });
                result(customError, null);
              } else {
                bcrypt
                  .compare(personnel.password, user.personnel_password)
                  .then((isMatch) => {
                    if (isMatch) {
                      const payload = {
                        id: user.id,
                        personnel_name: user.personnel_name,
                      };
                      jwt.sign(
                        payload,
                        keys.secretKey, {
                          expiresIn: 31536000,
                        },
                        (err, token) => {
                          if (err) {
                            const customError = createError(err);
                            result(customError, null);
                          } else {
                            const res = {
                              personnel_reset_password: 0,
                              accessToken: token,
                              expires_in: "24h",
                            };
                            result(null, res);
                          }
                        }
                      );
                    } else {
                      const customError = createError({
                        password: "You have entered an incorrect password",
                      });
                      result(customError, null);
                    }
                  });
              }
            } else {
              const customError = createError({
                user: "User does not exist",
              });
              result(customError, null);
            }
          }
        }
      );
    }
  },
  resetPassword(personnel, result) {
    const {
      errors,
      isValid
    } = validateLoginInput(personnel);
    if (!isValid) {
      const customError = createError(errors);
      result(customError, null);
    } else {
      this.findPersonnel({
          personnel_name: personnel.user_name,
        },
        (err, user) => {
          if (err) {
            const customError = createError(err);
            result(customError, null);
          } else {
            if (user) {
              bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                  const customError = createError(err);
                  result(customError, null);
                } else {
                  bcrypt.hash(personnel.password, salt, (err, hash) => {
                    if (err) {
                      const customError = createError(err);
                      result(customError, null);
                    } else {
                      Personnel.update({
                          personnel_password: hash,
                          personnel_reset_password: 0,
                        }, {
                          where: {
                            personnel_name: personnel.user_name,
                          },
                        })
                        .then(() => {
                          result(null, {
                            message: "password successfully reset",
                          });
                        })
                        .catch((err) => {
                          const customError = createError(err);
                          result(customError, null);
                        });
                    }
                  });
                }
              });
            } else {
              const customError = createError({
                user: "User does not exist",
              });
              result(customError, null);
            }
          }
        }
      );
    }
  },
};