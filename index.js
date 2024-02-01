// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')
const cTable = require('console.table')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
        message: '',
        choies: [""],
        name: ''
    },
    {
      type: 'list',
      message: '',
      choies: [""],
      name: ''
    },
    {
        type: 'list',
        message: '',
        choies: [""],
        name: ''
    },
    {
        type: 'list',
        message: '',
        choies: [""],
        name: ''
    },
    {
        type: 'input',
        message: '',
        name: ''
    },
    {
        type: 'input',
        message: '',
        name: ''
    },
    {
        type: 'input',
        message: '',
        name: ''
    },
    {
        type: 'input',
        message: '',
        name: ''
    }
  ])
  .then((response) => {
    if (response.answer === "View all departments"){
      db.query()
    }
  });

app.use((req, res) => {
    res.status(404).end();
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });