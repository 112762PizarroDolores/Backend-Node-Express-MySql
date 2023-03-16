const connectiondb = require("../config/db.config");

//GET ALL EMPLOYEES

const getAllEmployees = async (where, ordenar, limite) => {

const params = `${where} ${ordenar} ${limite}`;

  const rows = await connectiondb
    .query(`SELECT * FROM employees ${params}`)
    .spread((rows) => rows);
  return rows;
};

//find by id
const getEmployeeById = async (id_employee) => {
  const sqlQuery = `SELECT * FROM  employees e WHERE e.id_employee = ${id_employee} `;
  const rows = await connectiondb.query(sqlQuery).spread((rows) => rows);
  return rows.length > 0 ? rows[0] : null;
};


//CREATE
const createEmployee = async (values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const result = await connectiondb
    .query(
      "INSERT INTO employees(first_name, last_name, cuit, team_id, join_date, rol) values(?,?,?,?,?,?)",
      [first_name, last_name, cuit, team_id, join_date, rol]
    )
    .spread((result) => result);
  return result;
  
};

//DELETE
const deleteEmployee = async (id_employee) => {
  try {
    
  // Eliminar el registro de la tabla secundaria (assets)que tiene la clave externa correspondiente
  const resultQuery1 = await connectiondb.query('DELETE FROM assets WHERE id_employee = ?', [id_employee]).spread((result) => result);
// Eliminar el registro de la tabla principal(employees)
  const sqlQuery2 = `DELETE FROM employees WHERE id_employee = ${id_employee}`;
  const resultQuery2 = await connectiondb.query(sqlQuery2).spread((result) => result);
  // Verificar si se eliminaron los registros correctamente
  if (resultQuery1[0].affectedRows === 1 && resultQuery2[0].affectedRows === 1) {
    console.log('Los registros fueron eliminados correctamente');
  } else {
    console.log('No se pudieron eliminar los registros');
  }

     return resultQuery1,resultQuery2;
  } catch (error) {

  console.error('Error al eliminar los registros:', error);
} 
};
//UPDATE
  const updateEmployee = async (user, values) => {
    const {first_name, last_name, cuit, team_id, join_date, rol} = values;
    const sql = `UPDATE employees SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE id_employee=${user.id_employee}`;
    const result = await connectiondb.query(sql,[
      first_name ? first_name:user.first_name, 
      last_name ? last_name:user.last_name, 
      cuit  ? cuit:user.cuit, 
      team_id ? team_id:user.team_id, 
      join_date ? join_date:user.join_date, 
      rol ? rol:user.rol
    ]).spread((result) =>result);
  
    return result
  };

//EXPORTS
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
