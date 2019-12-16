const Database = require("better-sqlite3");
const { DATABASE_PATH } = require("../settings");
const database = new Database(DATABASE_PATH);
function deparments() {
  return database.prepare("select * from department").all();
}

function departmentById(id) {
  return database.prepare("select * from department where dept_id=?").get(id);
}

function departmentsByHospitalId(hospitalId) {
  return database
    .prepare("select * from department where hospital_id=?")
    .all(hospitalId);
}

module.exports = {
  deparments,
  departmentById,
  departmentsByHospitalId
};
