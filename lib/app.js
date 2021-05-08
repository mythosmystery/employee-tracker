const sequelize = require("sequelize");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Prompt = require("./prompt");
const Employee = require("../models/employee");
const Department = require("../models/department");
const Role = require("../models/role");
class App {
    static init() {
        console.log("App loaded");
        this.menu();
    }
    static async menu() {
        const res = await Prompt.mainMenuPrompt()
        if (res.mainMenu == "Employees") Employee.employeeMenu();
        if (res.mainMenu == "Roles") this.roleMenu();
        if (res.mainMenu == "Departments") Department.departmentMenu();
        if (res.mainMenu == "Exit") process.exit(0);
    }        
}

module.exports = App;