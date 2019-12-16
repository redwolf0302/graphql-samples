const express = require("express");
const router = express.Router();

const dao = require("./dao");

router.get("/list", (req, res) => {
  res.json(dao.doctors());
});
router.get("/:id(\\d+)", (req, res) => {
  res.json(dao.doctorById(req.params.id));
});
router.get("/hospital/:hospitalId(\\d+)", (req, res) => {
  res.json(dao.doctorsByHospitalId(req.params.hospitalId));
});
router.get("/deparment/:deptId(\\d+)", (req, res) => {
  res.json(dao.doctorsByDeptId(req.params.deptId));
});
module.exports = router;
