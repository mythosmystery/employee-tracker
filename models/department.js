const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/connection");
const cTable = require("console.table");
const Prompt = require("../lib/prompt");

class Department extends Model {
    static async departmentMenu() {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.departmentMenu();
            if (resp.menu == "See all departments") await this.showAllDepartments();
            if (resp.menu == "Add new department") await this.addNewDepartment();
            if (resp.menu == "Delete department") await this.deleteDepartment();
            if (resp.menu == "Seed database") await this.seedDepartments();
        }
    }
    static async addNewDepartment() {
        const department = await Prompt.addDepartment();
        await this.create({
            name: department.name
        });
        console.log(`New Department ${department.name} created!`);
    }
    static async showAllDepartments() {
        const departments = await this.findAll({ raw: true });
        console.table("Departments", departments);
    }
    static async deleteDepartment() {
        const res = await Prompt.deleteDepartment();
        const delDept = await this.findByPk(res.deleteID, { raw: true });
        await this.destroy({
            where: {
                department_id: res.deleteID
            }
        });
        console.log(`${delDept.name} department successfully deleted`);
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
}

Department.init({
    department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'department'
    }
);
module.exports = Department;