const mysql = require('mysql2');
const utils = require('util');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'sqlbubly8!',
      database: 'employee_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  db.query = utils.promisify(db.query);

  module.exports = db;

