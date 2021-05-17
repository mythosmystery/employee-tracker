const inquirer = require("inquirer");

class Prompt {
    static mainMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "What would you like to edit?",
                name: "mainMenu",
                choices: ["Employees", "Roles", "Departments", new inquirer.Separator(), "Exit"]
            }
        ]);
    }
    static employeeMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Menu:",
                name: "menu",
                choices: ["See all employees", "Add new employee", "Update employee", "Delete employee", new inquirer.Separator(), "Back"]
            }
        ]);
    }
    static departmentMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Menu:",
                name: "menu",
                choices: ["See all departments", 'Add new department', "See department budget", "Delete department", new inquirer.Separator(), "Back"]
            }
        ]);
    }
    static roleMenu() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Menu:",
                name: "menu",
                choices: ["See all roles", "Add new role", "Delete role", new inquirer.Separator(), "Back"]
            }
        ]);
    }
    static selectFromList(msg, list) {
        return inquirer.prompt([
            {
                type: "list",
                message: msg,
                name: "name",
                choices: list
            }
        ]);
    }

    static propToUpdate() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Select property to update:",
                name: "prop",
                choices: ["Role", "Manager"]
            }
        ])
    }
    static addRole() {
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter the title of the role you'd like to add:",
                name: "title",
                validate: this.validateName
            },
            {
                type: "number",
                message: "Enter the salary for this role:",
                name: "salary",
                validate: (input) => input > 0 ? true : "Error: salary must be greater than 0"
            }
        ]);
    }
    static addDepartment() {
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter the name of the department you'd like to add:",
                name: "name",
                validate: this.validateName
            }
        ]);
    }
    static addEmployee() {
        return inquirer.prompt([
            {
                type: "input",
                message: "Enter new employee's first name:",
                name: "firstName",
                validate: this.validateName
            },
            {
                type: "input",
                message: "Enter new employee's last name:",
                name: "lastName",
                validate: this.validateName
            },
        ]);
    }
    static validateName(name) {
        if (name.length < 1 || name.length > 20) {
            return "Error: not a valid name or title";
        } else {
            return true;
        }
    }
}

module.exports = Prompt;