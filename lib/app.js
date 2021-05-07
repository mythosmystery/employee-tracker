const sequelize = require("sequelize");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Prompt = require("./prompt");
const Employee = require("../models/employee");
const Department = require("../models/department");
const Role = require("../models/role");
class App {
    static init(){
        console.log("App loaded");
        this.menu();        
    }
    static menu(){
        Prompt.menuPrompt().then((resp) => {
            if(resp.menu == "See all employees") this.showAll();
            if(resp.menu == "Add new employee") this.addNew();
            if(resp.menu == "Delete employee") this.deleteEmployee();
            if(resp.menu == "Seed database") this.seedData();
            if(resp.menu == "Exit") process.exit(0);
        })
    }
    static async seedData(){
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
        this.menu();
    }
    static async addNew(){
        Prompt.addEmployeePrompt().then((res) => {
            Employee.create({
                first_name: res.firstName,
                last_name: res.lastName,
                role_id: res.roleID,
                manager_id: res.managerID
            }).then(() => console.log("Success"));
        }).then(() => this.menu());
    }
    static async showAll(){
        const employees = await Employee.findAll({ raw: true });
        console.table("Employees", employees);
        this.menu();
    }
    static async deleteEmployee(){
        Prompt.deletePrompt().then((res) => {
            Employee.destroy({
                where: {
                    employee_id: res.deleteID
                }
            });            
        }).then(() => this.menu());
    }
}

module.exports = App;