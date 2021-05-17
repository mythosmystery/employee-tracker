const inquirer = require("inquirer");

class Prompt {
    static mainMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "What would you like to edit?",
                name: "mainMenu",
                choices: ["Employees", "Roles", "Departments", "Exit"]
            }
        ]);
    }
    static employeeMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Menu:",
                name: "menu",
                choices: ["See all employees", "Add new employee", "Update employee role", "Update employee manager", "Delete employee", "Exit"]
            }
        ]);
    }
    static departmentMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Menu:",
                name: "menu",
                choices: ["See all departments", 'Add new department', "Delete department", "Exit"]
            }
        ]);
    }
    static roleMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Menu:",
                name: "menu",
                choices: ["See all roles", "Add new role", "Delete role", "Exit"]
            }
        ]);
    }
    static getEmployeeToUpdate(employees) {
        return inquirer.prompt([
            {
                type: "list",
                message: "Select the employee to update",
                name: "updateID",
                choices: employees
            }
        ]);
    }
    static updateEmployeeRole() {
        return inquirer.prompt([
            {
                type: "number",
                message: "Enter the ID of the role to add to this employee:",
                name: "roleID"
            }
        ]);
    }
    static updateEmployeeManager() {
        return inquirer.prompt([
            {
                type: "number",
                message: "Enter the ID of the manager to add to this employee:",
                name: "managerID"
            }
        ]);
    }
    static addRole() {
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter the title of the role you'd like to add:",
                name: "title"
            },
            {
                type: "number",
                message: "Enter the salary for this role:",
                name: "salary"
            },
            {
                type: "number",
                message: "Enter the department ID of the department this role belongs in:",
                name: "department_id"
            }
        ]);
    }
    static deleteRole() {
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter the ID of the role to be deleted:",
                name: "deleteID"
            }
        ]);
    }
    static addDepartment() {
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter the name of the department you'd like to add:",
                name: "name"
            }
        ]);
    }
    static deleteDepartment() {
        return inquirer.prompt([
            {
                type: "number",
                message: "Enter department ID of department to delete:",
                name: "deleteID"
            }
        ]);
    }
    static deleteEmployee() {
        return inquirer.prompt([
            {
                type: "number",
                message: "Enter employee ID of employee to delete:",
                name: "deleteID"
            }
        ]);
    }
    static addEmployee() {
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter new employee's first name:",
                name: "firstName"
            },
            {
                type: "input",
                message: "Enter new employee's last name:",
                name: "lastName"
            },
            {
                type: "input",
                message: "Enter role ID:",
                name: "roleID"
            },
            {
                type: "input",
                message: "Enter manager ID:",
                name: "managerID"
            }
        ]);
    }
}

module.exports = Prompt;