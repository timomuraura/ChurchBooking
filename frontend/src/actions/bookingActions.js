import {
  axios,
  createError
} from "../utils";
import Swal from "sweetalert2";

import {
  GET_ERRORS,
  GET_SERVICES,
  POST_BOOKING,
  GET_ALL_BOOKINGS,
  FETCH_SERVICE_DATES,
  CREATE_SERVICE
} from "./types";

// fetch available services
export const getServices = () => (dispatch) => {
  let url = `services`;

  axios
    .get(url)
    .then((services) => {
      console.log(services.data);
      dispatch({
        type: GET_SERVICES,
        payload: services.data,
      });
    })
    .catch((err) => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// post a booking
export const postBookings = (details) => (dispatch) => {
  console.log(details);
  let url = `bookings`;

  axios
    .post(url, details)
    .then((booking) => {
      Swal.fire("Success", booking.data.message, "success");
      dispatch({
        type: POST_BOOKING,
        payload: booking.data,
      });
    })
    .catch((err) => {
      Swal.fire("Error", err.response.data.error.booking, "error");
      dispatch(createError(err, GET_ERRORS));
    });
};

// fetch all bookings
export const fetchBookingHistory = (date) => (dispatch) => {

  let url = `bookings/history`;
  url += `?date=${date}`;
  console.log(url);

  axios
    .get(url)
    .then((allBookings) => {
      console.log(allBookings.data);
      dispatch({
        type: GET_ALL_BOOKINGS,
        payload: allBookings.data,
      });
    })
    .catch((err) => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// fetch services dates
export const fetchServiceDates = () => (dispatch) => {
  let url = `services/service-dates`;
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: FETCH_SERVICE_DATES,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// create service
export const createService = (serviceDetails) => (dispatch) => {
  let url = `services`;

  axios
    .post(url, serviceDetails)
    .then((service) => {
      Swal.fire("Success", service.data.message, "success");
      dispatch({
        type: CREATE_SERVICE,
        payload: service.data,
      });
    })
    .catch((err) => {
      // Swal.fire("Error", err.response.data.error.booking, "error");
      dispatch(createError(err, GET_ERRORS));
    });
};