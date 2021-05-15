const Prompt = require("./lib/prompt");
const Employee = require("./models/employee");
const Department = require("./models/department");
const Role = require("./models/role");
const sequelize = require("./lib/connection");

sequelize.sync({ force: false }).then(() => {
    console.log('Connected to DB');
    console.log('Starting app...');
    menu();
});

const menu = async () => {
    let res = { mainMenu: '' };
    while (res.mainMenu != "Exit") {
        res = await Prompt.mainMenu();
        if (res.mainMenu == "Employees") await Employee.employeeMenu();
        if (res.mainMenu == "Roles") await Role.roleMenu();
        if (res.mainMenu == "Departments") await Department.departmentMenu();
        if (res.mainMenu == "Exit") process.exit(0);
    }
}
