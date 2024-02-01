INSERT INTO department (name)
VALUES ("Fire Force"),
       ("Water Force"),
       ("Police Force"),
       ("Parasyte the Maxim"),
       ("Earth Force");

INSERT INTO role (title, salary, department_id)
VALUES  ("Commander", 150000.00, 1 ),
        ("Vice-Commander", 100000.00, 1 ),
        ("Lieutenant", 75000.00, 1 ),
        ("King", 125000.00, 2),
        ("Queen", 75000.00, 2),
        ("Coral", 50000.00, 2),
        ("General", 117000.50, 3 ),
        ("Vice-General", 86000.50, 3 ),
        ("Corprol", 59000.50, 3 ),
        ("President", 160000.00, 4),
        ("Vice-President", 140000.00, 4),
        ("Secretary of State", 100000.00, 4),
        ("Crust", 185000.00, 5),
        ("Mantle", 155000.00, 5),
        ("Inner Core", 135000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
 VALUES ("Obi", "Akitaru", 1, NULL),
        ("Kusakabe", "Shinra", 3, 1),
        ("Takehisa", "Hinawa", 2, 1),
        ("Athur", "Curry", 4, NULL),
        ("Mera", "Curry", 5, 4),
        ("Stevey", "Phish", 6, 4),
        ("Bruce", "Wayne", 7, NULL),
        ("Jim", "Gordon", 8, 7),
        ("Tim", "Drake", 9, 7),
        ("Joe", "Biden", 10, NULL),
        ("Kamala", "Harris", 11, 10),
        ("Mike", "Johnson", 12, 10),
        ("Litho", "Sphere", 13, NULL),
        ("Astheno", "Sphere", 14, 13),
        ("Inner", "Core", 15, 13);