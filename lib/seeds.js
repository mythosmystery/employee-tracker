const Employee = require("../models/employee");
const Department = require("../models/department");
const Role = require("../models/role");

class Seeds {
    static async seedRoles() {
        await Role.drop();
        await Role.sync();
        await Role.bulkCreate([
            {
                title: "Manager",
                salary: 100000,
                department_id: 1
            },
            {
                title: "Analyst",
                salary: 80000,
                department_id: 2
            },
            {
                title: "Senior Engineer",
                salary: 200000,
                department_id: 3
            },
            {
                title: "Junior Engineer",
                salary: 65000,
                department_id: 3
            },
            {
                title: "Customer Service Rep",
                salary: 45000,
                department_id: 4
            }
        ]);
    }
    static async seedDepartments() {
        await Department.drop();
        await Department.sync();
        await Department.bulkCreate([
            {
                name: "Managment"
            },
            {
                name: "System Administration"
            },
            {
                name: "Software Development"
            },
            {
                name: "Customer Service"
            }
        ]);
    }
    static async seedEmployees() {
        await Employee.drop();
        await Employee.sync();
        await Employee.bulkCreate([
            {
                first_name: "Jim",
                last_name: "Lahey",
                role_id: 1
            },
            {
                first_name: "Randy",
                last_name: "Bo-bandy",
                role_id: 2,
                manager_id: 1
            },
            {
                first_name: "Ricky",
                last_name: "LaFluer",
                role_id: 1,
                manager_id: 1
            },
            {
                first_name: "Bubbles",
                last_name: "",
                role_id: 4,
                manager_id: 3
            }
        ]);
    }
}
module.exports = Seeds;