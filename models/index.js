const Employee = require("./employee");
const Role = require("./role");
const Department = require("./department");

Role.hasMany(Employee, {
    foreignKey: "role_id",
    onDelete: "CASCADE",
});
Employee.belongsTo(Role, {
    foreignKey: "role_id"
});
Department.hasMany(Role, {
    foreignKey: "department_id",
    onDelete: "CASCADE"
});
Role.belongsTo(Department, {
    foreignKey: "department_id"
});

module.exports = { Role, Department, Employee };
