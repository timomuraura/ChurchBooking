import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import PropTypes, { string } from "prop-types";
import { loginUser } from "../actions/authActions";
import { Preloader } from "../common";

class Login extends Component {
  state = {
    user_name: "",
    password: "",
    errors: {},
    preloaderStyle: "d-none",
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
    if (props.auth.isAuthenticated) {
      return {
        preloaderStyle: "d-none",
      };
    }
  }

  login = (e) => {
    e.preventDefault();
    const { user_name, password } = this.state;
    if (user_name === "" || password === "") {
      Swal.fire("Error", "User Name & Password are required", "error");
    } else {
      this.handlePreloader("d-block");
      let data = { user_name, password };
      this.props.loginUser(data, this.props.history);
    }
  };

  render() {
    const { user_name, password, errors, preloaderStyle } = this.state;

    let data = typeof errors === "string" && errors;

    console.log(data);

    console.log(typeof errors);

    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="container-booking">
          <div className="header">
            <div className="top-centered">
              <span>ADMIN LOGIN</span>
              <span data-toggle="modal" data-target="#exampleModal">
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <div className="wrap-booking">
            <form className="booking-form" onSubmit={this.login}>
              {typeof errors === "string" && (
                <div className="alert alert-danger">{errors}</div>
              )}
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
              {/* button */}
              <div className="container-booking-form-btn">
                <div className="wrap-booking-form-btn">
                  <div className="booking-form-bgbtn"></div>
                  <button className="booking-form-btn">
                    <span>
                      Login
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
              <div className="mt-4"></div>
              <Link className="label-input" to="/reset-password">
                Reset Password
              </Link>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
