const express = require("express");
const router = express.Router();
const dao = require("./dao");
router.get("/list", (req, res) => {
  res.json(dao.staffs());
});
router.get("/:id(\\d+)", (req, res) => {
  res.json(dao.staffById(req.params.id));
});
router.get("/mobile/:mobile(\\d+)", (req, res) => {
  res.json(dao.staffByMobile(req.params.mobile));
});
module.exports = router;
