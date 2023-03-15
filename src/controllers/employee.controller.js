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

  // console.log(req.query)
  //las query s emandan por enlace desps del simbolo de pregunta. y luego los valores van ordenamos como clave valor, se encadenas params con el &&

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
  //ORDENAMIENTO
  // if (direction) {
    
    //  ordenar = `ORDER BY ${orderBy} ${direction}`;
      
  //}
  
  //PAGINACIÓN
  // if (limit) {
  //   let pageResult = (page - 1) * limit;
  //   limite = `LIMIT ${pageResult},${limit}`;
  // }

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
//      const page = req.query.page || 1; // página actual
//      const limit =3; // límite de elementos por página
//      const offset = (page - 1) * limit; // offset para la consulta

//        const empleados = await EmployeesModel.getAllEmployees(limit, offset);
//        res.json({data: empleados});
//  };

//CREATE
const createEmployee = async (req, res) => {
  // try {

  const values = { ...req.body };
  const result = await EmployeesModel.createEmployee(values);
  console.log(result);
  res.status(201).json({ data: result });

  // } catch (error) {
  // const CustomError = new HttpError(
  //   "Fetching employee failed, please try again later.",
  //   500
  // );
  // res.json({ errorMessage: CustomError.message, CustomError });
};

// };

//DELETE!
const deleteEmployee = async (req, res) => {
  //extraigo el id del empleado a borrar
  const id_employee = req.params.id_employee;
  const result = await EmployeesModel.deleteEmployee(id_employee);
  res.status(200).json({ message: "the employee was deleted succesfully!" }); //DOLO REVISA EL ESTADO!!!
};

//UPDATE
const updateEmployee = async (req, res) => {
  //extraigo el id y body del empleado a actualizar
  const values = { ...req.body };
  const id_employee = req.params.id_employee;
  //llamo a la funcion de mi model para hacer el update
  const result = await EmployeesModel.updateEmployee(id_employee, values);
  res
    .status(200)
    .json({ message: "the employee was updated succesfully!", result }); //DOLO REVISA EL ESTADO!!!
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
