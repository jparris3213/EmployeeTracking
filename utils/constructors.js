const db = require("../connnection/connection");

const viewEveryDepartment = () => {
  db.query("SELECT * FROM department", (err, results) => {
    console.log(" ");
    console.log("DEPARTMENTS---------------");
    console.table(results);
    console.log("press arrow to continue");
  });
};

const viewEveryRole = () => {
  db.query(
    'SELECT role.title AS role_title, role.department_id AS role_ID, department.department_name, role.salary FROM role LEFT JOIN department ON department.id = role.department_id',
    (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
      console.log(" ");
      console.log("ROLES------------------------");
      console.table(results);
      console.log("Press Arrow Buttom to Continue");
    }
  );
};

const viewEveryEmployee = () => {
  db.query(
    "SELECT e.id, e.first_name, e.last_name, m.first_name AS Manager, role.title, department.department_name, role.salary FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id ",
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(" ");
      console.log("EMPLOYEES----------------------------");
      console.table(results);
      console.log("Press Arrow to Continue");
    }
  );
};

const addDept = (department_name) => {
  db.query(
    `INSERT INTO department (department_name) VALUES ("${department_name}")`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
};


const addRole = (department_id, title, salary) => {
  db.query(
    `INSERT INTO role (title, department_id, salary) VALUES ("${title}", "${department_id}", "${salary}")`,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
};

const updateRole = (id, role_id) => {
  db.query(
    `UPDATE employee SET role_id = ${role_id} WHERE id = ${id}`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
};

module.exports = {
  viewEveryDepartment,
  viewEveryRole,
  viewEveryEmployee,
  addDept,
  addEmployee,
  addRole,
  updateRole,
};
