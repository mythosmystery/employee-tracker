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
        if (res.mainMenu == "Employees") this.employeeMenu();
        if (res.mainMenu == "Roles") this.roleMenu();
        if (res.mainMenu == "Departments") this.departmentMenu();
        if (res.mainMenu == "Exit") process.exit(0);
    }
    static roleMenu() {
        console.log("role menu");
        this.menu();
    }
    static departmentMenu() {
        console.log("department menu");
        this.menu();
    }
    static async employeeMenu() {
        const resp = await Prompt.employeeMenuPrompt()
        if (resp.menu == "See all employees") this.showAllEmployees();
        if (resp.menu == "Add new employee") this.addNewEmployee();
        if (resp.menu == "Delete employee") this.deleteEmployee();
        if (resp.menu == "Seed database") this.seedData();
        if (resp.menu == "Exit") this.menu();
    }
    static async seedData() {
        await Employee.drop();
        console.log("Dropped table");
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
                last_name: "Lahey",
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
        this.employeeMenu();
    }
    static async addNewEmployee() {
        const employee = await Prompt.addEmployeePrompt();
        await Employee.create({
            first_name: employee.firstName,
            last_name: employee.lastName,
            role_id: employee.roleID,
            manager_id: employee.managerID
        });
        console.log("New Employee created!");
        this.employeeMenu();
    }
    static async showAllEmployees() {
        const employees = await Employee.findAll({ raw: true });
        console.table("Employees", employees);
        this.employeeMenu();
    }
    static async deleteEmployee() {
        const res = await Prompt.deletePrompt();
        const delEmp = await Employee.findByPk(res.deleteID, { raw: true });
        await Employee.destroy({
            where: {
                employee_id: res.deleteID
            }
        });        
        console.log(`Employee ${delEmp.first_name} ${delEmp.last_name} successfully deleted`);
        this.employeeMenu();
    }
}

module.exports = App;