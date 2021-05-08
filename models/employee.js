const { Model, DataTypes} = require("sequelize");
const sequelize = require("../lib/connection");
const Prompt = require("../lib/prompt");
const App = require("../lib/app");

class Employee extends Model{

    static async employeeMenu() {
        const resp = await Prompt.employeeMenuPrompt()
        if (resp.menu == "See all employees") this.showAllEmployees();
        if (resp.menu == "Add new employee") this.addNewEmployee();
        if (resp.menu == "Delete employee") this.deleteEmployee();
        if (resp.menu == "Seed database") this.seedData();
        if (resp.menu == "Exit") App.menu();
    }
    static async seedData() {
        await this.drop();
        console.log("Dropped table");
        await this.sync();
        await this.bulkCreate([
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
        await this.create({
            first_name: employee.firstName,
            last_name: employee.lastName,
            role_id: employee.roleID,
            manager_id: employee.managerID
        });
        console.log(`New Employee ${employee.firstName} ${employee.lastName} created!`);
        this.employeeMenu();
    }
    static async showAllEmployees() {
        const employees = await this.findAll({ raw: true });
        console.table("Employees", employees);
        this.employeeMenu();
    }
    static async deleteEmployee() {
        const res = await Prompt.deletePrompt();
        const delEmp = await this.findByPk(res.deleteID, { raw: true });
        await this.destroy({
            where: {
                employee_id: res.deleteID
            }
        });        
        console.log(`Employee ${delEmp.first_name} ${delEmp.last_name} successfully deleted`);
        this.employeeMenu();
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