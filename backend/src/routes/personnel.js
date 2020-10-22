const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  PersonnelController
} = require("../controllers");

//  @route  POST personnel/login
//  @desc   Personnel login
//  @access Public
router.post("/login", (req, res) => {
  PersonnelController.login(req.body, (err, personnel) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(200).json(personnel);
    }
  });
});

//  @route  PATCH personnel/login
//  @desc   Personnel reset password
//  @access Public
router.patch("/reset_password", (req, res) => {
  PersonnelController.resetPassword(req.body, (err, personnel) => {
    if (err) {
      res.status(400).json(err);
    } else {
      //console.log(personnel)
      res.status(200).json(personnel);
    }
  });
});



module.exports = router;