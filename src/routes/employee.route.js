const employeeRouter = require('express').Router();
const {findAllEmployees, getEmployeById, createEmployee, deleteEmployee} = require ('../controllers/employee.controller');
employeeRouter.get("/", findAllEmployees)
employeeRouter.post('/create', createEmployee)//CREATE SOBRE LA BARRA /SIN TEXTO--> VER MEJORES PRACTICAS-...PARA PENSAR.
employeeRouter.delete('/:id_employee', deleteEmployee)



module.exports = employeeRouter;