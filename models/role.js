const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/connection");
const App = require("../lib/app");
class Role extends Model {
    static roleMenu() {
        console.log("role menu");
        App.menu();
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