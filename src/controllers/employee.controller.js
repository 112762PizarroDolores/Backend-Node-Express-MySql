//CRUD
const { query } = require("express");
const connectiondb = require("../config/db.config");
const conexion = require("../config/db.config");
const EmployeesModel = require("../models/employee.model");
const HttpError = require('../utils/manejoError');//DOLO VER!!!

//GET ALL employees con paginación

const getAllEmployees = async (req, res, next) => {
  try{
  //1) EXTRACCION DE PARAMS PARA FILTRAR POR CAMPOS DE LA TABLA: first_name, last_name, cuit, team_id, join_date, rol;
  //TAMB TRAEMOS PARAM DE ORDEN/DIRECCION, PAGE(para paginar) Y LIMIT(para elegir cuantos resultados queremos obtener)
  // console.log(req.query);

  const {
    first_name,
    last_name,
    cuit,
    team_id,
    join_date,
    rol,
    direction = "ASC",
    page = 1,
    limit,
  } = req.query;


  //2) DECLARA VALORES INICIALES

  let where = "";
  let ordenar = "ORDER BY id_employee ";
  let limite = "";

  //3 FILTRADO
  if (first_name || last_name || cuit || team_id || join_date || rol) {
     where = "WHERE 1";

    if (first_name) {
      where += ` AND first_name='${first_name}'`;
    }
    if (last_name) {
      where += ` AND last_name='${last_name}'`;
    }
    if (cuit) {
      where += ` AND cuit='${cuit}'`;
    }
    if (team_id) {
      where += ` AND team_id=${team_id}`;
    }
    if (join_date) {
      where += ` AND join_date='${join_date}'`;
    }
    if (rol) {
      where += ` AND rol='${rol}'`;
    }
    
  }


  limite = `LIMIT 5`;
  //QUERY PARA EL GET CON TODOS LOS PARAMS PARA FILTRAR, ORDENAR Y PAGINAR
  const empleados = await EmployeesModel.getAllEmployees(
    where,
    ordenar+direction,
    limite
  );
  res.json({ data: empleados });
}catch (err) {
  const error = new HttpError(
    'Fetching employees failed, please try again later.',
    500
  );
  return next(error);
}
}


//CREATE
const createEmployee = async (req, res) => {

  const values = { ...req.body };
  const result = await EmployeesModel.createEmployee(values);
  console.log(result);
  res.status(201).json({ data: result });

  
};


//DELETE!
const deleteEmployee = async (req, res) => {
  //extraigo el id del empleado a borrar
  const id_employee = req.params.id_employee;
  const result = await EmployeesModel.deleteEmployee(id_employee);
  res.status(200).json({ message: "the employee was deleted succesfully!" });
};

//UPDATE
const updateEmployee = async (req, res, next) => {
try{
    //extraigo el id y body del empleado a actualizar
  const userId= req.params.id_employee;

  //encuentro el objeto EMPLOYEE a modificar
  const user=await EmployeesModel.getEmployeeById(userId)
  if(!user) {
    return res.json({message:'the employee doesnt exists'});
  }
  const values = { ...req.body };
  const result=await EmployeesModel.updateEmployee(user,values);
  res.json({result, message:'the employee was updated succesfully!', result})
  }
catch(error){
console.log(error)
next(error)
}
};
//FIND BY ID
const getEmployeeById = async (req, res) => {
  //extraigo el id del empleado a borrar
  const id_employee = req.params.id_employee;
  const employee = await EmployeesModel.getEmployeeById(id_employee);
  res
    .status(200)
    .json({
      data: employee,
      message: `reading the employee with id: ${id_employee}`,
    });
};

//EXPORT

module.exports = {
  getAllEmployees: getAllEmployees,
  createEmployee: createEmployee,
  deleteEmployee: deleteEmployee,
  updateEmployee: updateEmployee,
  getEmployeeById: getEmployeeById,
};
