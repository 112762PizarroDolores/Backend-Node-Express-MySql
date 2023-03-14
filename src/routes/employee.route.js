const employeeRouter = require('express').Router();
const {getAllEmployees, getEmployeeById, createEmployee, deleteEmployee, updateEmployee} = require ('../controllers/employee.controller');
employeeRouter.get("/", getAllEmployees)
employeeRouter.post('/create', createEmployee)//CREATE SOBRE LA BARRA /SIN TEXTO--> VER MEJORES PRACTICAS-...PARA PENSAR.
employeeRouter.delete('/:id_employee', deleteEmployee)
employeeRouter.put('/:id_employee', updateEmployee)
employeeRouter.get('/:id_employee', getEmployeeById)
 module.exports = employeeRouter;