const express = require("express");
const router = express.Router();
router.use("/patient", require("./patient/router"));
router.use("/hospital", require("./hospital/router"));
router.use("/doctor", require("./doctor/router"));
router.use("/department", require("./department/router"));
module.exports = router;
