// Import and require mysql2
const mysql = require("mysql2");
require(`console.table`);
const { prompt } = require("inquirer");
const db = require("./connnection/connection");
const build = require("./utils/constructors");
const { first } = require("rxjs");
const { addEmployee } = require("./utils/constructors");

const question_list = [
  "Choose Option Below",
  "Enter Department Name",
  "Enter Role Name",
  "Salary Associated With Role",
  "Assign Roll to Department",
  "Enter Employee First Name",
  "Enter Employee Surname",
  "Assign Manager to Employee",
  "Choose Employee to Update",
  "Choose Role for Employee",
];

const questionAsker = (data) => {
  prompt([
    {
      type: "list",
      message: data[0],
      name: "firstQuestion",
      choices: [
        "View Employee List",
        "Hire Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View Department List",
        "Add Department",
        "Quit",
      ],
    },
  ]).then(async (answer) => {
    const { firstQuestion } = answer;
    if (firstQuestion === "View Employee List") {
      build.viewEveryEmployee();
      questionAsker(question_list);
    }

    if (firstQuestion === "Hire Employee") {
      employee_dialog(question_list);
    }

    if (firstQuestion === "Update Employee Role") {
      update_employee_dialog(question_list);
    }

    if (firstQuestion === "View All Roles") {
      build.viewEveryRole();
      questionAsker(question_list);
    }

    if (firstQuestion === "Add Role") {
      role_add_dialog(question_list);
    }

    if (firstQuestion === "View Department List") {
      build.viewEveryDepartment();
      questionAsker(question_list);
    }

    if (firstQuestion === "Add Department") {
      add_dept_dialog(question_list);
    }

    if (firstQuestion === "Quit") {
      process.exit();
    }
  });
};

const employee_dialog = async (data) => {
  const role = await db.query("SELECT * FROM role");
  const listedRoles = role.map(({ title, id }) => ({
    name: title,
    value: id,
  }));
  const manager = await db.query("SELECT * FROM employee");
  const listedManagers = manager.map(({ first_name, last_name, id }) => ({
    name: `${first_name}, ${last_name}`,
    value: `${id}`,
  }));

  prompt([
    {
      type: "input",
      message: data[5],
      name: "firstName",
    },
    {
      type: "input",
      message: data[6],
      name: "lastName",
    },
    {
      type: "list",
      message: data[7],
      name: "roles",
      choices: listedRoles,
    },
    {
      type: "list",
      message: data[8],
      name: "managerName",
      choices: listedManagers,
    },
  ])
  .then(async (answer) => {

    const { firstName, lastName, roles, managerName } = answer;
        build.addEmployee(firstName, lastName, roles, managerName);
        build.viewEveryEmployee();
        questionAsker(question_list);
  });
};

const update_employee_dialog = async (data) => {
  const listedEmployees = await db.query('SELECT * FROM employee');
  const employee = listedEmployees.map(({first_name, last_name, id }) => ({name: `${first_name}, ${last_name}`, value: id }));
  const roles = await db.query('SELECT * FROM role');
  const listedRoles = roles.map(({ title, id }) => ({ name: title, value: id }));
  prompt([
      {
          type: 'list',
          message: data[9],
          name: 'employee',
          choices: employee
      },
      {
          type: 'list',
          message: data[10],
          name: 'role',
          choices: listedRoles
      }
  ])
  .then(async (answer) => {
      const { employee, role } = answer;
      console.log(employee, role);
      build.updateRole(employee, role);
      build.viewEveryEmployee();
      questionAsker(question_list);
  });
};


const role_add_dialog = async (data) => {
  const departments = await db.query('SELECT * FROM department');
  const department = departments.map(({department_name, id}) => ({name: department_name, value: id}));
  prompt([
      {
          type: 'list',
          message: data[4],
          name: 'department',
          choices: department
      },
      {
          type: 'input',
          message: data[2],
          name: 'roleName'
      },
      {
          type: 'input',
          message: data[3],
          name: 'salary'
      },
  ])
  .then(async (answer) => {
      const { department, roleName, salary } = answer;
      console.log(department, roleName, salary);
      build.addRole(department, roleName, salary);
      build.viewEveryRole();
      questionAsker(question_list);
  });
};

const add_dept_dialog = async (data) => {
  prompt([
      {
          type: 'input',
          message: data[1],
          name: 'department'
      }
  ])
  .then(async (answer) => {
      const { department } = answer;
      build.addDept(department);
      build.viewEveryDepartment();
      questionAsker(question_list);
  });
};


function init() {
  questionAsker(question_list);
}

init();
