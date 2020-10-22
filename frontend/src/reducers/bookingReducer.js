import {
  GET_SERVICES,
  POST_BOOKING,
  GET_ALL_BOOKINGS,
  FETCH_SERVICE_DATES,
  CREATE_SERVICE
} from "../actions/types";

const initialState = {
  services: [],
  saveBooking: {},
  allBookings: [],
  allServiceDates: [],
  saveService: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case POST_BOOKING:
      return {
        ...state,
        saveBooking: action.payload,
      };
    case GET_ALL_BOOKINGS:
      return {
        ...state,
        allBookings: action.payload,
      };
    case FETCH_SERVICE_DATES:
      return {
        ...state,
        allServiceDates: action.payload,
      };
    case CREATE_SERVICE:
      return {
        ...state,
        saveService: action.payload,
      };
    default:
      return state;
  }
}