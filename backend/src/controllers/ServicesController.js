const Service = require("../../models").Service;
const sequelize = require("sequelize");
const Op = sequelize.Op;
const {
  validateServiceInput,
  createError
} = require("../validation");
module.exports = {
  findServices(where, result) {
    return Service.findOne(where)
      .then((dbBooking) => {
        return result(null, dbBooking);
      })
      .catch((error) => {
        result(error, null);
      });
  },
  saveService(service, result) {
    const {
      errors,
      isValid,
      //check if fiels is empty
    } = validateServiceInput(service);
    if (!isValid) {
      const customError = createError(errors);
      result(customError, null);
    } else {
      //check if package exists
      this.findServices({
          where: {
            service_name: service.name,
            service_date: service.time,
          },
        },
        (err, dbService) => {
          if (err) {
            const customError = createError(err);
            result(customError, null);
          } else {
            if (dbService) {
              const customError = createError({
                service: "Service Already Exists",
              });
              result(customError, null);
            } else {
              Service.create({
                  service_name: service.name,
                  service_date: service.time,
                  service_status: 1,
                  created_at: new Date(),
                  updated_at: new Date(),
                })
                .then(() => {
                  result(null, {
                    message: "Service created Successfully",
                  });
                })
                .catch((err) => {
                  const customError = createError(err);
                  result(customError, null);
                });
            }
          }
        }
      );
    }
  },
  getAllServices(result) {
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    Service.findAll({
        attributes: ["*"],
        raw: true,
        where: {
          service_status: 1,
        },
      })
      .then((services) => {
        let filteredServices = services.filter(serv => new Date(serv.service_date) >= today);

        return result(null, filteredServices);
      })
      .catch((err) => {
        const customError = createError(err);
        result(customError, null);
      });
  },
  getServiceDates(result) {
    Service.findAll({
        attributes: ["service_date"],
        raw: true,
        order: [
          ["service_date", "ASC"]
        ],
      })
      .then((dates) => {
        return result(null, dates);
      })
      .catch((err) => {
        const customError = createError(err);
        result(customError, null);
      });
  },
};