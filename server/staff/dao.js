const Database = require("better-sqlite3");
const { DATABASE_PATH } = require("../settings");
const database = new Database(DATABASE_PATH);
function staffs() {
  return database.prepare("select * from staff").all();
}

function staffById(id) {
  return database.prepare("SELECT * FROM staff WHERE id=?").get(id);
}

function staffByMobile(mobile) {
  return database.prepare("SELECT * FROM staff WHERE mobile=?").get(mobile);
}

function insertStaff(staff) {
  const stmt = database.prepare('INSERT INTO staff("staff_name", "mobile", "role", "created_at")VALUES(?,?,?,?)');
  const result = stmt.run([staff.staff_name, staff.mobile, staff.role, staff.created_at]);
  console.log(result);
}

module.exports = {
  staffs,
  staffById,
  staffByMobile,
  insertStaff,
};
