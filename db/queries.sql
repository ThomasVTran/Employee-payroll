-- *View all departments
SELECT*FROM department;

-- *View all roles
SELECT*FROM role ORDER BY role.department_id;

-- *Table of employees with their titles, salaries, managers names
SELECT employees.first_name, employees.last_name, title, salary, managers.first_name 
AS Manager_First_Name, managers.last_name 
AS Manager_Last_Name
FROM employees 
LEFT JOIN employees AS managers
ON employees.manager_id = managers.id 
JOIN role
ON employees.role_id = role.id
ORDER BY employees.id; 

-- *Add department
-- INSERT INTO department(name) VALUES (?);

-- *Table for department options for roles
SELECT * FROM department ORDER BY department.name;

-- *Add role
-- INSERT INTO role(title, salary, department_id) VALUES (?,?,?);

-- *Table of employees with their roles and managers
SELECT employees.first_name, employees.last_name, employees.id FROM employees;

SELECT role.title, role.id FROM role;

-- *Add employee
-- INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);

-- *View all employees and their roles
SELECT * FROM employees;

SELECT * FROM role;

-- *Update employee role
-- UPDATE employees SET (title = ?) WHERE (?);