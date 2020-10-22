import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { Preloader } from "../common";
import moment from "moment";

import {
  fetchServiceDates,
  fetchBookingHistory,
  createService,
} from "../actions/bookingActions";

import { logoutUser } from "../actions/authActions";

class AdminLayout extends Component {
  state = {
    allServiceDates: [],
    date: "",
    name: "",
    time: "",
    serviceHistory: [],
    preloaderStyle: "d-none",
    saveService: {},
    allBookings: [],
  };

  onSelectOption = (value, e) => {
    console.log(value);
    this.setState({
      [e.name]: value,
    });
    // this.handlePreloader("d-block");

    this.props.fetchBookingHistory(value.value);
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlePreloader = (preloaderStyle) => {
    this.setState({
      preloaderStyle,
    });
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      // console.log(props.auth);
      this.props.history.push("/login");
    } else {
      this.props.fetchServiceDates();
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "/login";
  };

  addService = (e) => {
    e.preventDefault();
    const { name, time } = this.state;
    if (name === "" || time === "") {
      Swal.fire("Error", "All fields are required", "error");
    } else {
      this.handlePreloader("d-block");
      let data = { name, time };
      this.props.createService(data);
      this.setState({
        name: "",
        time: "",
      });
    }
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.allServiceDates !== state.allServiceDates) {
      return {
        allServiceDates: props.allServiceDates,
        preloaderStyle: "d-none",
      };
    }
    if (props.saveService !== state.saveService) {
      if (props.saveService.message) {
        return {
          allServiceDates: props.saveService,
          preloaderStyle: "d-none",
        };
      }
    }
    if (props.allBookings !== state.allBookings) {
      return {
        allBookings: props.allBookings,
        preloaderStyle: "d-none",
      };
    }
  };

  render() {
    const {
      allServiceDates,
      date,
      name,
      time,
      allBookings,
      preloaderStyle,
    } = this.state;

    // let sortedData = allBookings.sort((a, b) =>
    //   a.service_name.localeCompare(b.service_name)
    // );

    console.log(allServiceDates);

    const exportAllBookings =
      allBookings instanceof Array
        ? allBookings.map((history) => {
            let data = {
              ServiceName: history.service_name,
              ServiceDate: moment(history.service_date).format("YYYY-MM-DD"),
              Name: history.first_name,
              Phone: history.phone,
              Age: history.age,
            };

            return data;
          })
        : null;

    const allServiceDatesData =
      allServiceDates instanceof Array
        ? allServiceDates.map((date) => {
            return {
              label: moment(date.service_date).format("YYYY-MM-DD"),
              value: moment(date.service_date).format("YYYY-MM-DD"),
            };
          })
        : null;

        console.log(allServiceDatesData);
    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="container-booking">
          <div className="header">
            <div className="top-centered">
              <span>ADMIN PORTAL</span>
              <div
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                Admin
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a
                  className="dropdown-item"
                  type="button"
                  onClick={this.onLogoutClick}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>

          <div className="wrap-booking">
            <span className="booking-form-title">Booking History</span>
            <div className="adminLayout">
              <div className="mb-3">
                <button
                  className="btn btn-success btn-sm"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Add Services
                </button>
              </div>
              <div className="wrap-input input-select">
                <span className="label-input">Search Service Date</span>
                <div>
                  <Select
                    options={allServiceDatesData}
                    value={date}
                    name="date"
                    onChange={this.onSelectOption}
                    required
                  />
                </div>
                <span className="focus-input"></span>
              </div>
              {allBookings.length > 0 && (
                <div className="">
                  <CSVLink
                    data={exportAllBookings}
                    filename="Download Bookings.csv"
                    className="btn btn-success rounded-0 d-flex flex-nowrap align-items-center"
                    target="_blank"
                  >
                    {"Download File " + date.value}
                  </CSVLink>
                </div>
              )}
               
            </div>
          </div>
        </div>
        {/* modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Set Service
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Enter Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={this.onChange}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Service Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="time"
                      value={time}
                      onChange={this.onChange}
                      id="exampleInputPassword1"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.addService}
                >
                  Save Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  allServiceDates: state.bookings.allServiceDates,
  saveService: state.bookings.saveService,
  allBookings: state.bookings.allBookings,
});

export default connect(mapStateToProps, {
  fetchServiceDates,
  fetchBookingHistory,
  createService,
  logoutUser,
})(AdminLayout);
