const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/connection");
const cTable = require("console.table");
const Prompt = require("../lib/prompt");
const Seeds = require("../lib/seeds");
const Role = require("./role");

class Employee extends Model {
    static async employeeMenu() {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.employeeMenu();
            if (resp.menu == "See all employees") await this.showAllEmployees();
            if (resp.menu == "Add new employee") await this.addNewEmployee();
            if (resp.menu == "Update employee role") await this.updateEmployeeRole();
            if (resp.menu == "Update employee manager") await this.updateEmployeeManager();
            if (resp.menu == "Delete employee") await this.deleteEmployee();
            if (resp.menu == "Seed database") await Seeds.seedEmployees();
        }
    }
    static async showAllEmployees() {
        const employees = await this.findAll({ raw: true });
        console.table("Employees", employees);
    }
    static async addNewEmployee() {
        const employee = await Prompt.addEmployee();
        const role = await Role.findByPk(employee.role_id, { raw: true });
        await this.create({
            first_name: employee.firstName,
            last_name: employee.lastName,
            role_id: employee.roleID,
            manager_id: employee.managerID
        });
        console.log(`New Employee ${employee.firstName} ${employee.lastName} created!`);
    }

    static async updateEmployeeRole() {
        const id = await Prompt.getEmployeeToUpdate();
        const role = await Prompt.updateEmployeeRole();
        await Employee.update(
            {
                role_id: role.roleID
            },
            {
                where: { employee_id: id.updateID }
            });
        console.log("Role successfully updated.");
    }
    static async updateEmployeeManager() {
        const id = await Prompt.getEmployeeToUpdate();
        const manager = await Prompt.updateEmployeeManager();
        await Employee.update(
            {
                manager_id: manager.managerID
            },
            {
                where: { employee_id: id.updateID }
            });
        console.log("Role successfully updated.");
    }
    static async deleteEmployee() {
        const res = await Prompt.deleteEmployee();
        const delEmp = await this.findByPk(res.deleteID, { raw: true });
        await this.destroy({
            where: {
                employee_id: res.deleteID
            }
        });
        console.log(`Employee ${delEmp.first_name} ${delEmp.last_name} successfully deleted`);
    }
}

Employee.init(
    {
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        manager_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'employee'
    }
);

module.exports = Employee;