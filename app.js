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
    static departmentMenu = async () => {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.departmentMenu();
            if (resp.menu == "See all departments") await this.showAllDepartments();
            if (resp.menu == "Add new department") await this.addNewDepartment();
            if (resp.menu == "Delete department") await this.deleteDepartment();
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
        const res = await Prompt.deleteDepartment();
        const delDept = await Department.findByPk(res.deleteID, { raw: true });
        await Department.destroy({
            where: {
                department_id: res.deleteID
            }
        });
        console.log(`${delDept.name} department successfully deleted`);
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
    static showAllRoles = async () => {
        const roles = await Role.findAll({ raw: true });
        console.table("Roles", roles);
    }
    static addNewRole = async () => {
        const role = await Prompt.addRole();
        await Role.create({
            title: role.title,
            salary: role.salary,
            department_id: role.department_id
        });
        console.log(`New role ${role.title} created!`);
    }
    static deleteRole = async () => {
        const res = await Prompt.deleteRole();
        const delRole = await Role.findByPk(res.deleteID, { raw: true });
        await Role.destroy({
            where: {
                role_id: res.deleteID
            }
        });
        console.log(`Role ${delRole.title} successfully deleted`);
    }

    static employeeMenu = async () => {
        let resp = { menu: '' };
        while (resp.menu != "Exit") {
            resp = await Prompt.employeeMenu();
            if (resp.menu == "See all employees") await this.showAllEmployees();
            if (resp.menu == "Add new employee") await this.addNewEmployee();
            if (resp.menu == "Update employee role") await this.updateEmployeeRole();
            if (resp.menu == "Update employee manager") await this.updateEmployeeManager();
            if (resp.menu == "Delete employee") await this.deleteEmployee();
        }
    }
    static showAllEmployees = async () => {
        const employees = await this.formatEmployees();
        console.table("Employees", employees);
    }
    static formatEmployees = async () => {
        const employees = await Employee.findAll({ raw: true });
        let formatEmps = [];
        employees.forEach(async employee => {
            const manager = await Employee.findByPk(employee.manager_id, { raw: true });
            const role = await employee.getRole();
            const department = await role.getDepartment();
            const formatEmployee = {
                first_name: employee.first_name,
                last_name: employee.last_name,
                manager: manager.first_name,
                role: role.title,
                salary: role.salary,
                department: department.name
            }
            formatEmps.push(formatEmployee);
        });
        return formatEmps;
    }
    static addNewEmployee = async () => {
        const employee = await Prompt.addEmployee();
        const role = await Role.findByPk(employee.role_id, { raw: true });
        await Employee.create({
            first_name: employee.firstName,
            last_name: employee.lastName,
            role_id: employee.roleID,
            manager_id: employee.managerID
        });
        console.log(`New Employee ${employee.firstName} ${employee.lastName} created!`);
    }

    static updateEmployeeRole = async () => {
        const id = await Prompt.getEmployeeToUpdate();
        const role = await Prompt.updateEmployeeRole();
        await Employee.update(
            {
                role_id: role.roleID
            },
            {
                where: { employee_id: id.updateID }
            });
        console.log("Role successfully updated.");
    }
    static updateEmployeeManager = async () => {
        const id = await Prompt.getEmployeeToUpdate();
        const manager = await Prompt.updateEmployeeManager();
        await Employee.update(
            {
                manager_id: manager.managerID
            },
            {
                where: { employee_id: id.updateID }
            });
        console.log("Role successfully updated.");
    }
    static deleteEmployee = async () => {
        const res = await Prompt.deleteEmployee();
        const delEmp = await Employee.findByPk(res.deleteID, { raw: true });
        await Employee.destroy({
            where: {
                employee_id: res.deleteID
            }
        });
        console.log(`Employee ${delEmp.first_name} ${delEmp.last_name} successfully deleted`);
    }

}
module.exports = App;