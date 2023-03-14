//CRUD
const connectiondb = require('../config/db.config');
const conexion= require ('../config/db.config');
const EmployeesModel= require('../models/employee.model');
// const HttpError = require('../utils/manejoError');//DOLO VER!!!


//obtener employees

const getAllEmployees= async (req,res)=>{
  const page = req.query.page || 1; // página actual
  const limit =3; // límite de elementos por página
  const offset = (page - 1) * limit; // offset para la consulta

    const empleados = await EmployeesModel.getAllEmployees(limit, offset);
    res.json({data: empleados});
  };

//CREATE
const createEmployee = async (req, res) => {
// try {
  
  const values =  {...req.body};
  const result = await EmployeesModel.createEmployee(values)
  console.log(result)
  res.status(201).json({ data: result });

// } catch (error) {
  // const CustomError = new HttpError(
  //   "Fetching employee failed, please try again later.",
  //   500
  // );
  // res.json({ errorMessage: CustomError.message, CustomError });
}

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
const getEmployeeById = async (req, res) => {
  //extraigo el id del empleado a borrar
  const id_employee=req.params.id_employee;
  const employee = await EmployeesModel.getEmployeeById(id_employee)
  res.status(200).json({data: employee, message: `reading the employee with id: ${id_employee}` });
  } 
  
  //EXPORT

     module.exports={
    getAllEmployees: getAllEmployees,
    createEmployee:createEmployee,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee,
    getEmployeeById: getEmployeeById 
}