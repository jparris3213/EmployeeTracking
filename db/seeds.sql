INSERT INTO department (department_name)
VALUES ("Office"),("R&D"),("Machine Room"),("Assembly"),("Shipping"),("Float");

INSERT INTO role (title, department_id, salary)
VALUES ("Sales Lead", 1, 100000),
        ("CAD Drafter", 2, 30000),
        ("Frame Designer", 2, 60000),
        ("Spring Up", 4, 30000),
        ("Knock UP", 4, 40000),
        ("CNC",3,40000),
        ("Hardwood",3,45000),
        ("Loader/Forklift", 5, 50000),
        ("Owner",1,100);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jacob", "Parris", 2, 5),
       ("Jay", "Scwatts", 3, NULL),
       ("Robert", "Chester", 3, 3),
       ("Joey", "Parris", 9, 2),
       ("Malia", "Brown", 6, 5),
       ("Sarah", "Lourd", 7, NULL),
       ("Tom", "Allen", 8, 7);

       