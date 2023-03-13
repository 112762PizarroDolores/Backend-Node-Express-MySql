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

//DELETE!
const deleteEmployee = async (req, res) => {
//extraigo el id del empleado a borrar
const id_employee=req.params.id_employee;
const result = await EmployeesModel.deleteEmployee(id_employee)
res.status(200).json({ message: 'the employee was deleted succesfully!' });//DOLO REVISA EL ESTADO!!!
} 

//UPDATE
const updateEmployee = async (req, res) => {
  //extraigo el id y body del empleado a actualizar
  const values =  {...req.body};
      const id_employee=req.params.id_employee;
    //llamo a la funcion de mi model para hacer el update
  const result = await EmployeesModel.updateEmployee(id_employee, values)
  res.status(200).json({ message: 'the employee was updated succesfully!', result });//DOLO REVISA EL ESTADO!!!
  } 
  //EXPORT

     module.exports={
    findAllEmployees: obtenerEmployees,
    createEmployee:createEmployee,
    getEmployeById:getEmployeById,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee
}
