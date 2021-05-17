const { Role, Employee, Department } = require("../models");
const sequelize = require("../lib/connection");

const employeeJson = require("./employeeJson.json")
const roleJson = require("./roleJson.json")
const departmentJson = require("./departmentJson.json")

const seed = async () => {
    await sequelize.drop();
    await sequelize.sync()
    await Department.bulkCreate(departmentJson);
    await Role.bulkCreate(roleJson);
    await Employee.bulkCreate(employeeJson);
    console.log("Seeding complete!")
}

seed();