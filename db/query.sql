SELECT employee.first_name, employee.last_name, role.title, role.salary
FROM role
Inner JOIN employee ON employee.role_id=role.id