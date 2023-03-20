//CRUD
const { query } = require("express");
const connectiondb = require("../config/db.config");
const conexion = require("../config/db.config");
const EmployeesModel = require("../models/employee.model");
const HttpError = require('../customError/customError');

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
    direction = "ASC",////Puedo desde la url, param din, cambiarlo a desc
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
      where += ` AND cuit='${cuit}'`; //PENDIENTE: VALIDAR CUIT QUE NO SE REPITA/SEA UNICO
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
  limite = `LIMIT 25`;
  //QUERY PARA EL GET CON TODOS LOS PARAMS PARA FILTRAR, ORDENAR Y PAGINAR
  const empleados = await EmployeesModel.getAllEmployees(
    where,
    ordenar+direction,
    limite
  );
  res.json({ data: empleados });
}catch (err) {
  const error = new HttpError(
    'The operation "get all employees" failed, please try again later.',
    500
  );
  return next(error);
}
}


//CREATE
const createEmployee = async (req, res, next) => {
try{
  const values = { ...req.body };
  const result = await EmployeesModel.createEmployee(values);
  console.log(result);
  res.status(201).json({ message: "The operation 'Create Employee' was successfully", data: result });
}catch (err) {
  const error = new HttpError(
    'The operation "create employee" failed, please try again later.',
    500
  );
  return next(error);
}
  
};


//DELETE!
const deleteEmployee = async (req, res, next) => {
  //OPCION 1: ELIMINO LOS ASSETS VINCULADOS AL EMPLEADO A ELIMINAR, Y LUEGO A ESTE EMPLEADO
  try{
  //extraigo el id del empleado a eliminar
  const employeeId= req.params.id_employee;
  //encuentro el objeto EMPLOYEE a eliminar
  const employee=await EmployeesModel.getEmployeeById(employeeId)
  if(!employee) {
    return res.json({message:'The employee whose you want delete doesnt exists. Review'});
  }
   const result = await EmployeesModel.deleteEmployee(employeeId);
  res.status(200).json({ message: "the employee was deleted succesfully!" });
  }catch (err) {
    const error = new HttpError(
      'The operation "delete employee" failed, please try again later.',
      401
    );
    return next(error);
  }
//PENDIENTES: HACER ESTA OPCION 2 DEL DELETE DE EMPLEADOS Y POR OTRO LADO QUE EL CUIT EN BD SEA UNIQUE
//OPCION 2: COMO LA FK DE LA TABLA EN LA BD ACEPTA NULOS, AL BORRAR EL EMPLEADO LE HAGO DOS CONSULTAS: 
//1) UNA QUE ELIMINE PREVIAMENTE LA/S RELACION/ES //(REALIZANDO UPDATE DE TODOS LOS ASSETS QUE TENGAN ESE ID DEL EMPLOYEE)
// 2) Y MODIFICAR SU VALOR A NULO. Y POSTERIOR A ELLO: LA ELIM DEL EMPLOYEE

};


//UPDATE
const updateEmployee = async (req, res, next) => {
try{
    //extraigo el id y body del empleado a actualizar
  const userId= req.params.id_employee;

  //encuentro el objeto EMPLOYEE a modificar
  const user=await EmployeesModel.getEmployeeById(userId)
  if(!user) {
    return res.json({message:'the employee whose you want update doesnt exists, please review', code: 404});
  }
  const values = { ...req.body };
  const result=await EmployeesModel.updateEmployee(user,values);
  res.status(200).json({result, message:'the employee was updated succesfully!', result})
}catch (err) {
  const error = new HttpError(
    'The operation "update employee" failed, please try again later.',
    500
  );
  return next(error);
}
};


//FIND BY ID
const getEmployeeById = async (req, res, next) => {
  try{
 //extraigo el id del empleado a obtener por id
 const id_employee= req.params.id_employee;
 //encuentro el objeto EMPLOYEE a obtener
 const employee = await EmployeesModel.getEmployeeById(id_employee);
 //si no existe el id del objeto a obtener, entonces devolveme el sig msj
 if(!employee) {
   return res.json({message:'the employee whose you want get, doesnt exist', code: 404});
 }
  res
    .status(200)
    .json({
      data: employee,
      message: `reading the employee with id: ${id_employee}`,
    });
  }catch (err) {
    const error = new HttpError(
      'The operation "get employee by id" failed, please try again later.',
      500
    );
    return next(error);
  }
};


//EXPORT
module.exports = {
  getAllEmployees: getAllEmployees,
  createEmployee: createEmployee,
  deleteEmployee: deleteEmployee,
  updateEmployee: updateEmployee,
  getEmployeeById: getEmployeeById,
};
