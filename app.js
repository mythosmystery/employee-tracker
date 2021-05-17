const { Employee, Role, Department } = require("./models");
const Prompt = require("./lib/prompt");
const cTable = require("console.table");
class App {
    static menu = async () => {
        let res = { mainMenu: '' };
        while (res.mainMenu != "Exit") {
            res = await Prompt.mainMenu();
            if (res.mainMenu == "Employees") await this.employeeMenu();
            if (res.mainMenu == "Roles") await this.roleMenu();
            if (res.mainMenu == "Departments") await this.departmentMenu();
            if (res.mainMenu == "Exit") process.exit(0);
        }
    }
    static employeeMenu = async () => {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.employeeMenu();
            if (resp.menu == "See all employees") await this.showAllEmployees();
            if (resp.menu == "Add new employee") await this.addNewEmployee();
            if (resp.menu == "Update employee") await this.updateEmployee();
            if (resp.menu == "Delete employee") await this.deleteEmployee();
        }
    }
    static departmentMenu = async () => {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.departmentMenu();
            if (resp.menu == "See all departments") await this.showAllDepartments();
            if (resp.menu == "Add new department") await this.addNewDepartment();
            if (resp.menu == "Delete department") await this.deleteDepartment();
        }
    }
    static roleMenu = async () => {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.roleMenu();
            if (resp.menu == "See all roles") await this.showAllRoles();
            if (resp.menu == "Add new role") await this.addNewRole();
            if (resp.menu == "Delete role") await this.deleteRole();
        }
    }
    static addNewDepartment = async () => {
        const department = await Prompt.addDepartment();
        await Department.create({
            name: department.name
        });
        console.log(`New Department ${department.name} created!`);
    }
    static showAllDepartments = async () => {
        const departments = await Department.findAll({ raw: true });
        console.table("Departments", departments);
    }
    static deleteDepartment = async () => {
        const deleteID = await this.selectDepartment("Select department to delete:");
        await Department.destroy({
            where: {
                id: deleteID
            }
        });
        console.log(`department successfully deleted`);
    }

    static showAllRoles = async () => {
        let roles = [];
        const roleJson = await Role.findAll({ include: Department });
        roleJson.forEach(roleData => {
            const role = roleData.get({ plain: true });
            roles.push({
                title: role.title,
                salary: role.salary,
                department: role.department.name
            });
        })
        console.table("Roles", roles);
    }
    static addNewRole = async () => {
        const role = await Prompt.addRole();
        const departmentID = await this.selectDepartment("Select the department this role is in:");
        await Role.create({
            title: role.title,
            salary: role.salary,
            department_id: departmentID
        });
        console.log(`New role ${role.title} created!`);
    }
    static deleteRole = async () => {
        const deleteID = await this.selectRole("Select role to delete:");
        await Role.destroy({
            where: {
                id: deleteID
            }
        });
        console.log(`Role successfully deleted`);
    }

    static showAllEmployees = async () => {
        let employees = [];
        const empJson = await Employee.findAll({
            include: {
                model: Role,
                include: Department
            }
        });
        empJson.forEach(empData => {
            const emp = empData.get({ plain: true })
            employees.push({
                first_name: emp.first_name,
                last_name: emp.last_name,
                manager: `${empJson[emp.manager_id - 1].first_name} ${empJson[emp.manager_id - 1].last_name}`,
                role: emp.role.title,
                salary: `$${emp.role.salary}`,
                department: emp.role.department.name
            });
        });
        console.table(employees);
    }

    static addNewEmployee = async () => {
        const name = await Prompt.addEmployee();
        const roleID = await this.selectRole("Select this employee's role:");
        console.log("Select this employee's manager");
        const managerID = await this.selectEmployee("Select this employee's manager:");
        await Employee.create({
            first_name: name.firstName,
            last_name: name.lastName,
            role_id: roleID,
            manager_id: managerID
        });
        console.log(`New Employee ${name.firstName} ${name.lastName} created!`);
    }
    static updateEmployee = async () => {
        const name = await this.selectEmployee();
        const prop = await Prompt.propToUpdate();
        if (prop.prop == "Role") {
            await this.updateEmployeeRole(name);
        } else {
            await this.updateEmployeeManager(name);
        }
    }
    static updateEmployeeRole = async (empID) => {
        const roleID = await this.selectRole("Select the new role for this employee");
        await Employee.update(
            {
                role_id: roleID
            },
            {
                where: { id: empID }
            });
        console.log("Role successfully updated.");
    }
    static updateEmployeeManager = async (empID) => {
        const managerID = await this.selectEmployee("Select the new manager for this employee");
        await Employee.update(
            {
                manager_id: managerID
            },
            {
                where: { id: empID }
            });
        console.log("Manager successfully updated.");
    }
    static deleteEmployee = async () => {
        const deleteID = await this.selectEmployee("Select employee to delete:");
        await Employee.destroy({
            where: {
                id: deleteID
            }
        });
        console.log(`Employee successfully deleted`);
    }
    static selectEmployee = async (msg) => {
        let names = [];
        const employees = await Employee.findAll({ raw: true });
        employees.forEach(employee => {
            names.push(`${employee.first_name} ${employee.last_name}`);
        });
        const emp = await Prompt.selectFromList(msg, names);
        return names.indexOf(emp.name) + 1;
    }
    static selectRole = async (msg) => {
        let titles = [];
        const roles = await Role.findAll({ raw: true });
        roles.forEach(role => { titles.push(role.title) });
        const role = await Prompt.selectFromList(msg, titles);
        return titles.indexOf(role.name) + 1;
    }
    static selectDepartment = async (msg) => {
        let names = [];
        const departments = await Department.findAll({ raw: true });
        departments.forEach(department => { names.push(department.name) });
        const department = await Prompt.selectFromList(msg, names);
        return names.indexOf(department.name) + 1;
    }

}
module.exports = App;