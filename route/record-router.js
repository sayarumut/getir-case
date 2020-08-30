  
const express = require("express");
const controller = require("../controller/record-controller");
const validator = require("../validator/record-validator");

var router = express.Router();

router.post("/", validator.search, controller.search);

module.exports = router;