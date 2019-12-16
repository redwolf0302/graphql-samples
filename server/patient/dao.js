const Database = require("better-sqlite3");
const { DATABASE_PATH } = require("../settings");
const database = new Database(DATABASE_PATH);
function patients() {
  return database.prepare("select * from patient").all();
}

function patientById(id) {
  return database.prepare("SELECT * FROM patient WHERE patient_id=?").get(id);
}

function patientsByDoctorId(doctorId) {
  return database
    .prepare(
      "SELECT DISTINCT p.* FROM patient p LEFT JOIN doctor_patient_mapping m ON p.patient_id=m.patient_id LEFT JOIN doctor d ON m.doctor_id=d.doctor_id WHERE d.doctor_id=?"
    )
    .all(doctorId);
}

function doctorsByPatientId(patientId) {
  return database
    .prepare(
      "SELECT DISTINCT d.*FROM doctor d LEFT JOIN doctor_patient_mapping m ON m.doctor_id=d.doctor_id LEFT JOIN patient p ON p.patient_id=m.patient_id WHERE p.patient_id=?"
    )
    .all(patientId);
}

module.exports = {
  patients,
  patientById,
  patientsByDoctorId,
  doctorsByPatientId
};
