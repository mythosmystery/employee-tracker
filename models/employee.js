const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/connection");

class Employee extends Model { }

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
        manager_id: {
            type: DataTypes.INTEGER
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "role",
                key: "id"
            }
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