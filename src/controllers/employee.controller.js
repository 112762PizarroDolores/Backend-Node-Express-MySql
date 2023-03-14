//CRUD
const connectiondb = require('../config/db.config');
const conexion= require ('../config/db.config');
const EmployeesModel= require('../models/employee.model');
//obtener employees

const obtenerEmployees= async (req,res)=>{
    const empleados = await EmployeesModel.findAllEmployees();
    res.json({data: empleados});
};

//CREATE
const createEmployee = async (req, res) => {
  const values =  {...req.body};
  const result = await EmployeesModel.createEmployee(values)
  console.log(result)
  res.status(201).json({ data: result });
};

// FIND BY ID
// const findEmployeeById = async (req, res) => {
//    try {
//     const employee = await EmployeesModel.findEmployeeById(insertId)
//     res.status(201).json({ data: employee });
  
//   } catch (error) {
//     res.status(500).json({error: "Something is wrong! Review..."})
//   }
// };

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
  //FIND BY ID
const findEmployeeById = async (req, res) => {
  //extraigo el id del empleado a borrar
  const id_employee=req.params.id_employee;
  const employee = await EmployeesModel.findById(id_employee)
  res.status(200).json({data: employee, message: `reading the employee with id: ${id_employee}` });
  } 
  
  //EXPORT

     module.exports={
    findAllEmployees: obtenerEmployees,
    createEmployee:createEmployee,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee,
    findEmployeeById: findEmployeeById 
}
