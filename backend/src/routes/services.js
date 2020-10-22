const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  ServicesController
} = require("../controllers");

router.post("/", (req, res) => {
  ServicesController.saveService(req.body, (err, service) => {
    if (err) {
      //console.log(err);
      res.status(400).json(err);
    } else {
      //console.log(service);
      res.status(200).json(service);
    }
  });
});

router.get("/", (req, res) => {
  ServicesController.getAllServices((err, positions) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(positions);
    }
  });
});
router.get("/service-dates", (req, res) => {
  ServicesController.getServiceDates((err, dates) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(200).json(dates);
    }
  });
});

module.exports = router;