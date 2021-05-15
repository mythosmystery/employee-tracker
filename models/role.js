const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/connection");
const cTable = require("console.table");
const Prompt = require("../lib/prompt");
const Seeds = require("../lib/seeds");

class Role extends Model {
    static async roleMenu() {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.roleMenu();
            if (resp.menu == "See all roles") await this.showAllRoles();
            if (resp.menu == "Add new role") await this.addNewRole();
            if (resp.menu == "Delete role") await this.deleteRole();
            if (resp.menu == "Seed database") await Seeds.seedRoles();
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