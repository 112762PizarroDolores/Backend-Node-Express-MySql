
// Employees
// 1:getAllEmployees
// 2:getEmployeById
// 3:createEmploye
// 4:updateEmployee
// 5:deleteEmployee

const employeeRouter = require('express').Router();
const {findAllEmployees} = require ('../controllers/employee.controller');
employeeRouter.route('/').get(findAllEmployees)
module.exports=employeeRouter;