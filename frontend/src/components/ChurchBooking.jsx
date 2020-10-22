import React, { Component } from "react";
import { CSVLink } from "react-csv";
import Select from "react-select";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getServices, postBookings } from "../actions/bookingActions";
import { Preloader } from "../common";
import Swal from "sweetalert2";

class ChurchBooking extends Component {
  state = {
    services: [],
    seats: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5 (Maximum)", value: 5 },
    ],
    seat: "",
    service: "",
    phone: "",
    ageOne: "",
    ageTwo: "",
    ageThree: "",
    personOne: "",
    personTwo: "",
    personThree: "",
    userDetails: [],
    preloaderStyle: "d-none",
    serviceResponse: {},
    errors: {},
    personFour: "",
    ageFour: "",
    personFive: "",
    ageFive: "",
  };
  onSelectOption = (value, e) => {
    console.log(value);
    this.setState({
      [e.name]: value,
    });
  };

  onChange = (e) => {
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
    this.props.getServices();
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.services !== state.services) {
      return {
        services: props.services,
      };
    }

    if (props.serviceResponse !== state.serviceResponse) {
      return {
        serviceResponse: props.serviceResponse,
        preloaderStyle: "d-none",
      };
    }

    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
        preloaderStyle: "d-none",
      };
    }
  };

  postBooking = (e) => {
    e.preventDefault();
    const {
      service,
      seat,
      phone,
      ageOne,
      ageTwo,
      ageThree,
      personOne,
      personTwo,
      personThree,
      personFour,
      ageFour,
      personFive,
      ageFive,
    } = this.state;

    let userDetails;

    if (
      service === "" ||
      seat === "" ||
      phone === "" ||
      ageOne === "" ||
      personOne === "" ||
      seat[0] === 0 ||
      service[0] === 0 ||
      seat === null ||
      service === null
    ) {
      Swal.fire("Error", "Please complete the form and submit", "error");
    } else {
      if (
        (ageOne < 13 && ageOne !== "") ||
        (ageOne > 58 && ageOne !== "") ||
        (ageTwo < 13 && ageTwo !== "") ||
        (ageTwo > 58 && ageTwo !== "") ||
        (ageThree < 13 && ageThree !== "") ||
        (ageThree > 58 && ageThree !== "") ||
        (ageFour < 13 && ageFour !== "") ||
        (ageFour > 58 && ageFour !== "") ||
        (ageFive > 58 && ageFive !== "") ||
        (ageFive < 13 && ageFive !== "")
      ) {
        Swal.fire(
          "Error",
          "Only people of age between 13 and 58 are allowed, Thank you",
          "error"
        );
      } else {
        if (
          personOne !== "" &&
          ageOne !== "" &&
          personTwo === "" &&
          ageTwo === "" &&
          personThree === "" &&
          ageThree === "" &&
          personFour === "" &&
          ageFour === "" &&
          personFive === "" &&
          ageFive === ""
        ) {
          userDetails = [{ name: personOne, age: ageOne }];
        } else if (
          personTwo !== "" &&
          ageTwo !== "" &&
          personThree === "" &&
          ageThree === "" &&
          personFour === "" &&
          ageFour === "" &&
          personFive === "" &&
          ageFive === ""
        ) {
          if (seat === 1) {
            userDetails = [{ name: personOne, age: ageOne }];
          } else {
            userDetails = [
              { name: personOne, age: ageOne },
              { name: personTwo, age: ageTwo },
            ];
          }
        } else if (
          personThree !== "" &&
          ageThree !== "" &&
          personFour === "" &&
          ageFour === "" &&
          personFive === "" &&
          ageFive === ""
        ) {
          if (seat === 2) {
            userDetails = [
              { name: personOne, age: ageOne },
              { name: personTwo, age: ageTwo },
            ];
          } else {
            userDetails = [
              { name: personOne, age: ageOne },
              { name: personTwo, age: ageTwo },
              { name: personThree, age: ageThree },
            ];
          }
        } else if (
          personFour !== "" &&
          ageFour !== "" &&
          personFive === "" &&
          ageFive === ""
        ) {
          if (seat === 3) {
            userDetails = [
              { name: personOne, age: ageOne },
              { name: personTwo, age: ageTwo },
              { name: personThree, age: ageThree },
            ];
          } else {
            userDetails = [
              { name: personOne, age: ageOne },
              { name: personTwo, age: ageTwo },
              { name: personThree, age: ageThree },
              { name: personFour, age: ageFour },
            ];
          }
        } else if (personFive !== "" && ageFive !== "") {
          if (seat === 4) {
            userDetails = [
              { name: personOne, age: ageOne },
              { name: personTwo, age: ageTwo },
              { name: personThree, age: ageThree },
              { name: personFour, age: ageFour },
            ];
          } else {
            userDetails = [
              { name: personOne, age: ageOne },
              { name: personTwo, age: ageTwo },
              { name: personThree, age: ageThree },
              { name: personFour, age: ageFour },
              { name: personFive, age: ageFive },
            ];
          }
        }

        if (userDetails.length !== seat.value) {
          Swal.fire(
            "Error",
            "You have entered " +
              userDetails.length +
              " person(s) but booked " +
              seat.value +
              " seats",
            "error"
          );
        } else {
          this.handlePreloader("d-block");
          let data = {
            service: service.value.toString(),
            phone,
            seats: seat.value.toString(),
            userDetails,
          };

          this.props.postBookings(data);
          this.setState({
            seat: [0],
            service: [0],
            phone: "",
            ageOne: "",
            ageTwo: "",
            ageThree: "",
            personOne: "",
            personTwo: "",
            personThree: "",
            personFour: "",
            ageFour: "",
            personFive: "",
            ageFive: "",
          });
        }
      }
    }
  };

  render() {
    const {
      services,
      seats,
      seat,
      phone,
      ageOne,
      ageTwo,
      ageThree,
      personOne,
      personTwo,
      personThree,
      preloaderStyle,
      service,
      personFour,
      ageFour,
      personFive,
      ageFive,
    } = this.state;

    const allServices =
      services instanceof Array
        ? services.map((service) => {
            return { label: service.service_name, value: service.id };
          })
        : null;

    return (
      <React.Fragment>
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="container-booking">
          <div className="header">
            <div className="top-centered">
              <span>ACK NANYUKI (St. Andrews)</span>
              <span>
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <div className="wrap-booking">
            <span className="booking-form-title">Book for Sunday</span>

            <form className="booking-form" onSubmit={this.postBooking}>
              <div className="wrap-input input-select">
                <span className="label-input">Available Service</span>
                <div>
                  <Select
                    options={allServices}
                    value={service}
                    name="service"
                    onChange={this.onSelectOption}
                    required
                  />
                </div>
                <span className="focus-input"></span>
              </div>

              <div
                className="wrap-input validate-input"
                data-validate="Some error feedback here!!!"
              >
                <span className="label-input">Phone Number</span>
                <input
                  className="input"
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={this.onChange}
                  placeholder="07XXXXXXXX"
                />
                <span className="focus-input"></span>
              </div>

              <div className="wrap-input input-select">
                <span className="label-input">Number of Seats to Book</span>
                <div>
                  <Select
                    options={seats}
                    name="seat"
                    value={seat}
                    onChange={this.onSelectOption}
                    required
                  />
                </div>
                <span className="focus-input"></span>
              </div>

              <div
                className="wrap-input validate-input"
                data-validate="Some error feedback here!!!"
              >
                <span className="label-input">Name of person one</span>
                <input
                  className="input"
                  type="text"
                  name="personOne"
                  value={personOne}
                  onChange={this.onChange}
                  placeholder="Enter Name"
                />
                <span className="focus-input"></span>
              </div>

              <div
                className="wrap-input validate-input"
                data-validate="Some error feedback here!!!"
              >
                <span className="label-input">Age of person one</span>
                <input
                  className="input"
                  type="number"
                  name="ageOne"
                  value={ageOne}
                  onChange={this.onChange}
                  placeholder="Enter Age"
                />
                <span className="focus-input"></span>
              </div>

              {seat.value === 2 && (
                <React.Fragment>
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person two</span>
                    <input
                      className="input"
                      type="text"
                      name="personTwo"
                      value={personTwo}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person two</span>
                    <input
                      className="input"
                      type="number"
                      name="ageTwo"
                      value={ageTwo}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>
                </React.Fragment>
              )}
              {seat.value === 3 && (
                <React.Fragment>
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person two</span>
                    <input
                      className="input"
                      type="text"
                      name="personTwo"
                      value={personTwo}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person two</span>
                    <input
                      className="input"
                      type="number"
                      name="ageTwo"
                      value={ageTwo}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person three</span>
                    <input
                      className="input"
                      type="text"
                      name="personThree"
                      value={personThree}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person three</span>
                    <input
                      className="input"
                      type="number"
                      name="ageThree"
                      value={ageThree}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>
                </React.Fragment>
              )}
              {seat.value === 4 && (
                <React.Fragment>
                  {/* details for person two */}
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person two</span>
                    <input
                      className="input"
                      type="text"
                      name="personTwo"
                      value={personTwo}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person two</span>
                    <input
                      className="input"
                      type="number"
                      name="ageTwo"
                      value={ageTwo}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>
                  {/* details for person three */}
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person three</span>
                    <input
                      className="input"
                      type="text"
                      name="personThree"
                      value={personThree}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person three</span>
                    <input
                      className="input"
                      type="number"
                      name="ageThree"
                      value={ageThree}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>

                  {/* details for person four */}
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person four</span>
                    <input
                      className="input"
                      type="text"
                      name="personFour"
                      value={personFour}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person four</span>
                    <input
                      className="input"
                      type="number"
                      name="ageFour"
                      value={ageFour}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>
                </React.Fragment>
              )}

              {seat.value === 5 && (
                <React.Fragment>
                  {/* details for person two */}
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person two</span>
                    <input
                      className="input"
                      type="text"
                      name="personTwo"
                      value={personTwo}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person two</span>
                    <input
                      className="input"
                      type="number"
                      name="ageTwo"
                      value={ageTwo}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>
                  {/* details for person three */}
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person three</span>
                    <input
                      className="input"
                      type="text"
                      name="personThree"
                      value={personThree}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person three</span>
                    <input
                      className="input"
                      type="number"
                      name="ageThree"
                      value={ageThree}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>

                  {/* details for person four */}
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person four</span>
                    <input
                      className="input"
                      type="text"
                      name="personFour"
                      value={personFour}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person four</span>
                    <input
                      className="input"
                      type="number"
                      name="ageFour"
                      value={ageFour}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>
                  {/* details for person five */}
                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Name of person five</span>
                    <input
                      className="input"
                      type="text"
                      name="personFive"
                      value={personFive}
                      onChange={this.onChange}
                      placeholder="Enter Name"
                    />
                    <span className="focus-input"></span>
                  </div>

                  <div
                    className="wrap-input validate-input"
                    data-validate="Some error feedback here!!!"
                  >
                    <span className="label-input">Age of person five</span>
                    <input
                      className="input"
                      type="number"
                      name="ageFive"
                      value={ageFive}
                      onChange={this.onChange}
                      placeholder="Enter Age"
                    />
                    <span className="focus-input"></span>
                  </div>
                </React.Fragment>
              )}
              <div className="container-booking-form-btn">
                <div className="wrap-booking-form-btn">
                  <div className="booking-form-bgbtn"></div>
                  <button className="booking-form-btn">
                    <span>
                      Submit
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="dropDownSelect1"></div>

        {/* modal */}
        {/* <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Bookings
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
                <CSVLink
                  data={exportAllBookings}
                  filename="Download Bookings.csv"
                  className="btn btn-success rounded-0 d-flex flex-nowrap align-items-center"
                  target="_blank"
                >
                  Download File
                </CSVLink>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
               
              </div>
            </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

ChurchBooking.propTypes = {
  services: PropTypes.array.isRequired,
  getServices: PropTypes.func.isRequired,
  postBookings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  services: state.bookings.services,
  errors: state.errors,
  serviceResponse: state.bookings.saveBooking,
});

export default connect(mapStateToProps, {
  getServices,
  postBookings,
})(ChurchBooking);
