const Database = require("better-sqlite3");
const { DATABASE_PATH } = require("../settings");
const database = new Database(DATABASE_PATH);
function hospitals() {
  return database.prepare("select * from hospital").all();
}

function hospitalById(id) {
  return database.prepare("select * from hospital where id=?").get(id);
}

module.exports = {
  hospitals,
  hospitalById
};
