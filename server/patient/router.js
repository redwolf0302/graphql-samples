const express = require("express");
const router = express.Router();
const dao = require("./dao");
router.get("/list", (req, res) => {
  res.json(dao.patients());
});
router.get("/:id(\\d+)", (req, res) => {
  res.json(dao.patientById(req.params.id));
});
router.get("/doctor/:doctorId(\\d+)", (req, res) => {
  res.json(dao.patientsByDoctorId(req.params.doctorId));
});
router.get("/:id(\\d+)/doctors", (req, res) => {
  res.json(dao.doctorsByPatientId(req.params.id));
});
module.exports = router;
