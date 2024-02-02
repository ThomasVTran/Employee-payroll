// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { default: Choices } = require('inquirer/lib/objects/choices');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Copium',
    database: 'killmonger_db'
  },
  console.log(`Connected to the killmonger_db database.`)
);

//Query database


//Inquirer questions
function menuPrompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View all departments.',
          'View all roles.',
          'View all employees.',
          'Add a department.',
          'Add a role.',
          'Add an employee.',
          'Update an employee role.',
        ]
      }
    ])
    .then((res) => {
      if (res.menu === 'View all departments.') {
        db.query('SELECT*FROM department ORDER BY department.name', (err, result) => {
          if (err) {
            statusMessage(400).console.log({ error: err.message });
          } else {
            console.table(result)
            menuPrompt()
          }
        })
      } else if (res.menu === 'View all roles.') {
        db.query('SELECT*FROM role ORDER BY role.department_id', (err, result) => {
          if (err) {
            statusMessage(400).console.log({ error: err.message });
          } else {
            console.table(result)
            menuPrompt()
          }
        })
      } else if (res.menu === 'View all employees.') {
        db.query(`SELECT employees.first_name, employees.last_name, title, salary, managers.first_name 
        AS Manager_First_Name, managers.last_name 
        AS Manager_Last_Name
        FROM employees 
        LEFT JOIN employees AS managers
        ON employees.manager_id = managers.id 
        JOIN role
        ON employees.role_id = role.id
        ORDER BY employees.id` , (err, result) => {
          if (err) {
            statusMessage(400).console.log({ error: err.message });
          } else {
            console.table(result)
            menuPrompt()
          }
        })
      } else if (res.menu === 'Add a department.') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Name of the department?',
              name: 'add_department'
            }
          ])
          .then((res) => {
            db.query('INSERT INTO department(name) VALUES (?)',
              res.add_department, (err, result) => {
                if (err) {
                  statusMessage(400).console.log({ error: err.message });
                } else {
                  console.table(result)
                  console.log(`Added ${res.add_department} as a department`);
                  menuPrompt();
                }
              }
            )
          })
      } else if (res.menu === 'Add a role.') {
        db.query("SELECT * FROM department ORDER BY department.name",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              const roleSwitched = result.map((role) => {
                return {
                  name: role.name,
                  value: role.id,
                };
              });
              inquirer
                .prompt([
                  {
                    type: 'input',
                    message: 'Title of the role?',
                    name: 'add_role'
                  },
                  {
                    type: 'input',
                    message: 'Salary of the role?',
                    name: 'add_salary'
                  },
                  {
                    type: 'list',
                    message: 'Which department does this role go in?',
                    name: 'add_to_department',
                    choices: roleSwitched,
                  },
                ])
                .then((res) => {
                  db.query('INSERT INTO role(title, salary, department_id) VALUES (?,?,?)',
                    [res.add_role, res.add_salary, res.add_to_department], (err, result) => {
                      if (err) {
                        statusMessage(400).console.log({ error: err.message });
                      } else {
                        console.table(result)
                        console.log(`Added ${res.add_role} as a role.`);
                        menuPrompt();
                      }
                    })
                })
            }
          })

      } else if (res.menu === 'Add an employee.') {
        db.query(`SELECT employees.first_name, employees.last_name, employees.id FROM employees `,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(`SELECT role.title, role.id FROM role`, (err, roleResult) => {
                if (err) {
                  console.log(err);
                } else {
                  const roleList = roleResult.map((role) => {
                    return {
                      name: role.title,
                      value: role.id,
                    };
                  });
                  const managerList = result.map((employees) => {
                    return {
                      name: `${employees.first_name} ${employees.last_name}`,
                      value: employees.id,
                    };
                  });
                  managerList.push({ name: 'None', value: null })
                  inquirer
                    .prompt([
                      {
                        type: 'input',
                        message: 'First name of the employee?',
                        name: 'add_first_name'
                      },
                      {
                        type: 'input',
                        message: 'Last name of the employee?',
                        name: 'add_last_name'
                      },
                      {
                        type: 'list',
                        message: 'What role do they have?',
                        name: 'add_role',
                        choices: roleList,
                      },
                      {
                        type: 'list',
                        message: 'Who is their manager?',
                        name: 'add_manager',
                        choices: managerList,
                      },
                    ])
                    .then((res) => {
                      db.query('INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
                        [res.add_first_name, res.add_last_name, res.add_role, res.add_manager], (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            console.table(result)
                            console.log(`Added ${res.add_first_name} ${res.add_last_name} as an employee.`);
                            menuPrompt();
                          }
                        })
                    })
                }
              })

            }
          })
      } else {
        db.query(`SELECT * FROM employees `,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(`SELECT * FROM role`, (err, roleResult) => {
                if (err) {
                  console.log(err);
                } else {
                  const newRole = roleResult.map((role) => {
                    return {
                      name: role.title,
                      value: role.id,
                    };
                  });
                  const employeeList = result.map((employees) => {
                    return {
                      name: `${employees.first_name} ${employees.last_name}`,
                      value: employees.id,
                    };
                  });
                  inquirer
                    .prompt([
                      {
                        type: 'list',
                        message: 'Who do you want to update?',
                        name: 'updateEmployee',
                        choices: employeeList,
                      },
                      {
                        type: 'list',
                        message: 'What is their new role?',
                        name: 'updateRole',
                        choices: newRole,
                      },
                    ])
                    .then((res) => {
                      db.query('UPDATE employees SET role_id = ? WHERE id = ?',
                        [res.updateRole, res.updateEmployee], (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            console.table(result)
                            console.log(`Updated employee's title.`);
                            menuPrompt();
                          };
                        });
                    });
                };
              });
            };
          });
      };
    });
};

menuPrompt();