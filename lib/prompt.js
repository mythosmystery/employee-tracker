const inquirer = require("inquirer");

class Prompt{
    static mainMenuPrompt(){
        return inquirer.prompt([
            {
                type: "list",
                message: "What would you like to edit?",
                name: "mainMenu",
                choices: ["Employees", "Roles", "Departments", "Exit"]
            }
        ]);
    }
    static employeeMenuPrompt(){
        return inquirer.prompt([
            {
                type: "list",
                message: "Menu:",
                name: "menu",
                choices: ["See all employees", "Add new employee", "Delete employee", "Seed database", "Exit"]
            }
        ]);
    }
    static deletePrompt(){
        return inquirer.prompt([
            {
                type: "number",
                message: "Enter employee ID of employee to delete:",
                name: "deleteID"
            }
        ]);
    }
    static addEmployeePrompt(){
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