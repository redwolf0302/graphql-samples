const express = require("express");
const router = express.Router();
const dao = require("./dao");

router.get("/list", (req, res) => {
  res.json(dao.deparments());
});
router.get("/:deptId(\\d+)", (req, res) => {
  res.json(dao.departmentById(req.params.deptId));
});
router.get("/hospital/:hospitalId(\\d+)", (req, res) => {
  res.json(dao.departmentsByHospitalId(req.params.hospitalId));
});
module.exports = router;
