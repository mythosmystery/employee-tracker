const { Model, DataTypes} = require("sequelize");
const sequelize = require("../lib/connection");
class Department extends Model {}
Department.init(
    {
        department_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }

    }
);
module.exports = Department;