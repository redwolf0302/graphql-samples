const express = require("express");
const router = express.Router();
const dao = require("./dao");
router.get("/list", (req, res) => {
  res.json(dao.hospitals());
});
router.get("/:id(\\d+)", (req, res) => {
  res.json(dao.hospitalById(req.params.id));
});
module.exports = router;
