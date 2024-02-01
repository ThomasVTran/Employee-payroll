// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { default: Choices } = require('inquirer/lib/objects/choices');

const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Copium',
    database: 'books_db'
  },
  console.log(`Connected to the killmonger_db database.`)
);

//Query database


//Inquirer questions
inquirer 
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menu',
      Choices: [
      {
        //**TODO view all departments
        type: 'input',
        message: 'View all departments.',
        name: 'Departments'
      },
      {
        //**TODO view all roles
        type: 'input',
        message: 'View all roles.',
        name: 'Roles'
      },
      {
        //**TODO view all employees
        type: 'input',
        message: 'View all employees.',
        name: 'employees'
      },
      {
        //**TODO add a department
        type: 'input',
        message: 'Add a department.',
        name: ''
      },
      {
        //**TODO add a role
        type: 'input',
        message: 'Add a role.',
        name: ''
      },
      {
        //**TODO add an employee
        type: 'input',
        message: 'Add an employee.',
        name: ''
      },
      {
        //**TODO update an employee role
        type: 'input',
        message: 'Update an employee role.',
        name: ''
      }]
    }
  ])
  
  .then((response) => {
    if (response.answer === "View all departments") {
      db.query('SELECT*FROM department')
    }
  });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});