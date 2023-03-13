const employeeRouter = require('express').Router();
const {findAllEmployees, getEmployeById, createEmployee, deleteEmployee, updateEmployee} = require ('../controllers/employee.controller');
employeeRouter.get("/", findAllEmployees)
employeeRouter.post('/create', createEmployee)//CREATE SOBRE LA BARRA /SIN TEXTO--> VER MEJORES PRACTICAS-...PARA PENSAR.
employeeRouter.delete('/:id_employee', deleteEmployee)
employeeRouter.put('/:id_employee', updateEmployee)


module.exports = employeeRouter;