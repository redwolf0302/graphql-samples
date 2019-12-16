const Database = require("better-sqlite3");
const { DATABASE_PATH } = require("../settings");
const database = new Database(DATABASE_PATH);
function doctors() {
  return database.prepare("select * from doctor").all();
}

function doctorById(id) {
  return database.prepare("select * from doctor where doctor_id=?").get(id);
}

function doctorsByHospitalId(hospitalId) {
  return database
    .prepare("select * from doctor where hospital_id=?")
    .all(hospitalId);
}

function doctorsByDeptId(deptId) {
  return database.prepare("select * from doctor where dept_id=?").all(deptId);
}

module.exports = {
  doctors,
  doctorsByHospitalId,
  doctorsByDeptId,
  doctorById
};
