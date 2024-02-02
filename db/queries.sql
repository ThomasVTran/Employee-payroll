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

-- *View all departments
SELECT*FROM department;