const sequelize = require("sequelize");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Prompt = require("./prompt");
const Employee = require("../models/employee");
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
            if(resp.menu == "Exit") process.exit(0);
        })
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
        //employees.forEach((person) => console.log(person.dataValues));
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