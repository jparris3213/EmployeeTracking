const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '12345678',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

