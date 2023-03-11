//CRUD
const conexion= require ('../config/db.config');
const EmployeesModel= require('../models/employee.model');
//obtener employees

const obtenerEmployees= async (req,res)=>{
    const empleados = await EmployeesModel.findAllEmployees();
    res.json({data: empleados});
};


module.exports= {
   findAllEmployees: obtenerEmployees
}