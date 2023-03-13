//CRUD
const connectiondb = require('../config/db.config');
const conexion= require ('../config/db.config');
const EmployeesModel= require('../models/employee.model');
//obtener employees

const obtenerEmployees= async (req,res)=>{
    const empleados = await EmployeesModel.findAllEmployees();
    res.json({data: empleados});
};


//////
const getEmployeById = async (req, res) => {
  try {
    const empleados = await req.body;
    res.status(201).json({ data: empleados });
  } catch (err) {
    res.status(400).json({message: "ERROR ta todo mal viteh!"})
  }
};


const createEmployee = async (req, res) => {
    const values =  {...req.body};
    const result = await EmployeesModel.createEmployee(values)
    console.log(result)
    // const {insertId}=result
    // const employee= await employeModel.findById(insertId)
    res.status(201).json({ data: result });
};

//nuevo!
const deleteEmployee = async (req, res) => {
//extraigo el id del empleado a borrar
const id_employee=req.params.id_employee;
const result = await EmployeesModel.deleteEmployee(id_employee)
res.status(200).json({ message: 'the employee was deleted succesfully!' });//DOLO REVISA EL ESTADO!!!
} 

     module.exports={
    findAllEmployees: obtenerEmployees,
    createEmployee:createEmployee,
    getEmployeById:getEmployeById,
    deleteEmployee: deleteEmployee
}
