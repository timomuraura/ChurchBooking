import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

import {
  axios,
  createError
} from "../utils";
import {
  SET_CURRENT_PERSONNEL,
  GET_ERRORS,
  RESET_PASSWORD
} from "./types";

//set current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_PERSONNEL,
    payload: decoded,
  };
};

// login admin
export const loginUser = (userDetails, history) => (dispatch) => {
  console.log(userDetails);
  let url = `personnel/login`;
  axios
    .post(url, userDetails)
    .then((response) => {
      const {
        accessToken
      } = response.data;

      //set token to local storage
      localStorage.setItem("jwtToken", accessToken);
      //set token to auth header
      setAuthToken(accessToken);
      //decode token to get user data
      const decoded = jwt_decode(accessToken);
      history.push("/admin");

      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err);
      // Swal.fire("Error", 'Oops! something went wrong', "error");

      dispatch(createError(err, GET_ERRORS));
    });
};

//log out Agent
export const logoutUser = () => (dispatch) => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// send reset password
export const resetPassword = (passwordDetails, history) => (dispatch) => {
  let url = `personnel/reset_password`;

  axios
    .patch(url, passwordDetails)
    .then((response) => {
      console.log(response.data.message);
      Swal.fire("Success", response.data.message, "success");
      history.push("/login");
      dispatch({
        type: RESET_PASSWORD,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      // Swal.fire("Error", err.response.data.error, "error");
      dispatch(createError(err, GET_ERRORS));
    });
};