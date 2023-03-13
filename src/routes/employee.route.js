const employeeRouter = require('express').Router();
const {findAllEmployees, getEmployeById, createEmployee} = require ('../controllers/employee.controller');
employeeRouter.get("/", findAllEmployees)
employeeRouter.post('/create', createEmployee)
//employeeRouter.route('/').get(findAllEmployees)



////
//import de dependencias y variables
// const router = require('express').Router();
// // import de controllers;
// const {findEmployees, getEmployeById, createEmploye}=require('../controllers/employeesController');

// trae todos los empleados
//router.get("/", findEmployees)
// creacion de empleado
//router.post('/create', createEmploye)
module.exports = employeeRouter;