const Booking = require("../../models").Booking;
const Service = require("../../models").Service;
const sequelize = require("sequelize");
const Op = sequelize.Op;
const { validateBookingInput, createError, isEmpty } = require("../validation");
const { where } = require("sequelize");
const moment = require("moment");
const ACCEPT_FORMAT = "YYYY-MM-DD hh:mm:ss";
module.exports = {
  findBooking(where, result) {
    return Booking.findAll(where)
      .then((dbBooking) => {
        return result(null, dbBooking);
      })
      .catch((error) => {
        result(error, null);
      });
  },
  saveBooking(name, age, booking, result) {
    const {
      errors,
      isValid,
      //check if fiels is empty
    } = validateBookingInput(booking.service, age, booking.phone);
    if (!isValid) {
      const customError = createError(errors);
      result(customError, null);
    } else {
      //check if package exists

      this.findBooking(
        {
          where: {
            phone: booking.phone,
            service_id: booking.service,
          },
        },
        (err, dbBooking) => {
          if (err) {
            const customError = createError(err);
            result(customError, null);
          } else {
            let totalbooking =
              parseInt(dbBooking.length) + parseInt(booking.seats);
            // console.log({
            //   totalbooking,
            // });
            if (totalbooking > 5) {
              let remainder = 5 - parseInt(dbBooking.length);
              const customError = createError({
                booking: "You can only book " + remainder + " seats",
              });
              result(customError, null);
            } else {
              Booking.findAll({
                where: {
                  service_id: booking.service,
                },
                raw: true,
              })
                .then((bookings) => {
                  if (bookings.length < 100) {
                    let remaining = 100 - bookings.length;
                    if (booking.seats > remaining) {
                      const customError = createError({
                        booking: "Only '" + remaining + "' seats are available",
                      });
                      result(customError, null);
                    } else {
                      Booking.create({
                        service_id: booking.service,
                        phone: booking.phone,
                        seats: 1,
                        first_name: name,
                        age: age,
                        created_at: new Date(),
                        updated_at: new Date(),
                      })
                        .then(() => {
                          result(null, {
                            message: "Booking created Successfully",
                          });
                        })
                        .catch((err) => {
                          const customError = createError(err);
                          result(customError, null);
                        });
                    }
                  } else {
                    if (bookings.length >= 100) {
                      // console.log("SERVICE ID", booking.service);
                      Service.update(
                        {
                          service_status: 0,
                        },
                        {
                          where: {
                            id: booking.service,
                          },
                        }
                      )
                        .then((response) => {
                          // console.log("RESPONSE", response);
                          const customError = createError({
                            booking: "Service is fully Booked",
                          });
                          result(customError, null);
                        })
                        .catch((err) => {
                          result(null, {
                            err,
                          });
                        });
                    }
                  }
                })
                .catch((err) => {
                  result(err, null);
                });
            }
          }
        }
      );
    }
  },
  getTotalBookings(service, result) {
    return;
  },

  getBookedPositions(result) {
    Booking.findAll({
      attributes: [
        "id",
        "phone",
        "seats",
        "first_name",
        "last_name",
        "age",
        [(sequelize.col("service_booking.service_name"), "service_name")],
      ],
      raw: true,
      include: [
        {
          model: Service,
          as: "service_booking",
          attributes: [],
        },
      ],
    })
      .then((allbookings) => {
        return result(null, allbookings);
      })
      .catch((err) => {
        const customError = createError(err);
        result(customError, null);
      });
  },
  getBookingsHistory(date, result) {
    let where = {};
    if (!isEmpty(date)) {
      where["service_date"] = {
        [Op.gte]: date,
      };
    }
    Booking.findAll({
      attributes: [
        "id",
        "phone",
        "seats",
        "first_name",
        "last_name",
        "age",
        [sequelize.col("service_booking.service_name"), "service_name"],
        [sequelize.col("service_booking.service_date"), "service_date"],
      ],
      raw: true,
      include: [
        {
          model: Service,
          as: "service_booking",
          required: true,
          where: where,
          attributes: [],
        },
      ],
    })
      .then((allbookings) => {
        return result(null, allbookings);
      })
      .catch((err) => {
        const customError = createError(err);
        result(customError, null);
      });
  },
};
