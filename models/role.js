const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/connection");
const cTable = require("console.table");
const Prompt = require("../lib/prompt");

class Role extends Model {

    static async roleMenu() {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.roleMenu();
            if (resp.menu == "See all roles") await this.showAllRoles();
            if (resp.menu == "Add new role") await this.addNewRole();
            if (resp.menu == "Delete role") await this.deleteRole();
            if (resp.menu == "Seed database") await this.seedRoles();
        }
    }
    static async showAllRoles() {
        const roles = await this.findAll({ raw: true });
        console.table("Roles", roles);
    }
    static async addNewRole() {
        const role = await Prompt.addRole();
        await this.create({
            title: role.title,
            salary: role.salary,
            department_id: role.department_id
        });
        console.log(`New role ${role.title} created!`);
    }
    static async deleteRole() {
        const res = await Prompt.deleteRole();
        const delRole = await this.findByPk(res.deleteID, { raw: true });
        await this.destroy({
            where: {
                role_id: res.deleteID
            }
        });
        console.log(`Role ${delRole.title} successfully deleted`);
    }
    static async seedRoles() {
        await Role.drop();
        await Role.sync();
        await Role.bulkCreate([
            {
                title: "Manager",
                salary: 100000,
                department_id: 1
            },
            {
                title: "Analyst",
                salary: 80000,
                department_id: 2
            },
            {
                title: "Senior Engineer",
                salary: 200000,
                department_id: 3
            },
            {
                title: "Junior Engineer",
                salary: 65000,
                department_id: 3
            },
            {
                title: "Customer Service Rep",
                salary: 45000,
                department_id: 4
            }
        ]);
    }
}

Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    salary: {
        type: DataTypes.DECIMAL
    },
    department_id: {
        type: DataTypes.INTEGER
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'role'
    }
);
module.exports = Role;