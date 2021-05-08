const { Model, DataTypes} = require("sequelize");
const sequelize = require("../lib/connection");
const App = require("../lib/app");

class Department extends Model {
    static departmentMenu() {
        console.log("department menu");
        App.menu();
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