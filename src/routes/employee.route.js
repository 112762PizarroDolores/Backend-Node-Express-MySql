const employeeRouter = require('express').Router();
const {validateCreateEmployee,validateUpdateEmployee, validateIdEmployee}=require("../middlewares/validatorEmployees")
const {getAllEmployees, getEmployeeById, createEmployee, deleteEmployee, updateEmployee} = require ('../controllers/employee.controller');

employeeRouter.get("/", getAllEmployees)
employeeRouter.post('/create', validateCreateEmployee, createEmployee)//CREATE SOBRE LA BARRA /SIN TEXTO--> VER MEJORES PRACTICAS-...PARA PENSAR.
employeeRouter.delete('/:id_employee', validateIdEmployee, deleteEmployee)
employeeRouter.put('/:id_employee', validateIdEmployee, validateUpdateEmployee, updateEmployee)
employeeRouter.get('/:id_employee', validateIdEmployee, getEmployeeById)


module.exports = employeeRouter;

