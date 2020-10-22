import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword } from "../actions/authActions";
import { Preloader } from "../common";

class ResetPassword extends Component {
  state = {
    user_name: "",
    password: "",
    confirmPassword: "",
    errors: {},
    preloaderStyle: "d-none",
    passwordResponse: {},
  };

  handlePreloader = (preloaderStyle) => {
    this.setState({
      preloaderStyle,
    });
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
        preloaderStyle: "d-none",
      };
    }
    if (props.password !== state.passwordResponse) {
      if (props.password.message) {
        return {
          passwordResponse: props.password,
          preloaderStyle: "d-none",
        };
      }
    }
  }

  resetPassword = (e) => {
    e.preventDefault();
    const { user_name, password, confirmPassword } = this.state;
    if (user_name === "" || password === "" || confirmPassword === "") {
      Swal.fire("Error", "All fields are required", "error");
    } else {
      if (password !== confirmPassword) {
        Swal.fire("Error", "Password do not match", "error");
      } else {
        this.handlePreloader("d-block");
        let data = { user_name, password };
        this.props.resetPassword(data, this.props.history);
      }
    }
  };
  render() {
    const {
      user_name,
      password,
      confirmPassword,
      preloaderStyle,
      errors,
    } = this.state;

    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="container-booking">
          <div className="header">
            <div className="top-centered">
              <span>ADMIN RESET PASSWORD</span>
              <span data-toggle="modal" data-target="#exampleModal">
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <div className="wrap-booking">
            <form className="booking-form" onSubmit={this.resetPassword}>
              {/* username */}
              <div
                className="wrap-input validate-input"
                data-validate="Some error feedback here!!!"
              >
                <span className="label-input">User Name</span>
                <input
                  className="input"
                  type="text"
                  name="user_name"
                  value={user_name}
                  onChange={this.onChange}
                  placeholder="Enter User Name"
                />
                <span className="focus-input"></span>
              </div>
              {errors.user && (
                <div className="alert alert-danger">{errors.user}</div>
              )}
              {/* password */}
              <div
                className="wrap-input validate-input"
                data-validate="Some error feedback here!!!"
              >
                <span className="label-input">Password</span>
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  placeholder="Enter Password"
                />
                <span className="focus-input"></span>
              </div>
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
              {/* confirm password */}
              <div
                className="wrap-input validate-input"
                data-validate="Some error feedback here!!!"
              >
                <span className="label-input">Confirm Password</span>
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.onChange}
                  placeholder="Confirm Password"
                />
                <span className="focus-input"></span>
              </div>
              {/* button */}
              <div className="container-booking-form-btn">
                <div className="wrap-booking-form-btn">
                  <div className="booking-form-bgbtn"></div>
                  <button className="booking-form-btn">
                    <span>
                      Reset Password
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
              <div className="mt-4"></div>
              <Link className="label-input mt-3" to="/login">
                Login
              </Link>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ResetPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  password: state.auth.password,
  errors: state.errors,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
