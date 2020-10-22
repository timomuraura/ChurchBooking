const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  BookingsController
} = require("../controllers");

router.post("/", (req, res) => {
  console.log('body', req.body);
  const userDetails = req.body.userDetails;
  for (let index = 0; index < userDetails.length; index++) {

    const name = userDetails[index].name;
    const age = userDetails[index].age

    BookingsController.saveBooking(name, age, req.body, (err, merchant) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        //console.log(merchant);
        res.status(200).json(merchant);
      }
    });
  }
});

router.get("/booked-positions", (req, res) => {
  // console.log(req);
  BookingsController.getBookedPositions((err, positions) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(positions);
    }
  });
});

//  @route  GET history
//  @desc   history list all
//  @access private  
router.get(
  "/history",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {

    const date = req.query.hasOwnProperty("date") ? req.query.date : "";
    BookingsController.getBookingsHistory(date, (err, history) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(history);
      }
    });
  }
);

module.exports = router;