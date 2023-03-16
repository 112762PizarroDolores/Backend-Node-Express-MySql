const connectiondb = require("../config/db.config");

//GET ALL EMPLOYEES
//where, ordenar, direction, limite
const getAllEmployees = async (where, ordenar, limite) => {
// console.log({...where, ...ordenar, ...direction, ...limite});
const params = `${where} ${ordenar} ${limite}`;

  const rows = await connectiondb
    .query(`SELECT * FROM employees ${params}`)
    .spread((rows) => rows);
  return rows;
};
//  const getAllEmployees = async(limit, offset)=> {

//  const rows = await connectiondb.query(`SELECT*FROM employees e LIMIT ${limit} OFFSET ${offset}`).spread((rows)=>rows)
//  return rows

//  }
//find by id
const getEmployeeById = async (id_employee) => {
  const sqlQuery = `SELECT * FROM  employees e WHERE e.id_employee = ${id_employee} `;
  const rows = await connectiondb.query(sqlQuery).spread((rows) => rows);
  return rows.length > 0 ? rows[0] : [];
};

//

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
  // conexion.query es un metodo js que recibe dos parametros, 1p- consulta a la db, 2p-arreglo con los valores que deseo insertar una consulta a la base de datos
  // .spread le permite a un array o cadena de texto ser expandido, donde
};

//DELETE
const deleteEmployee = async (id_employee) => {
  try {
      // Iniciar una transacción
  // await connectiondb.beginTransaction();
  // Eliminar el registro de la tabla secundaria (assets)que tiene la clave externa correspondiente
  const resultQuery1 = await connectiondb.query('DELETE FROM assets WHERE id_employee = ?', [id_employee]).spread((result) => result);
// Eliminar el registro de la tabla principal(employees)
  const sqlQuery2 = `DELETE FROM employees WHERE id_employee = ${id_employee}`;
  const resultQuery2 = await connectiondb.query(sqlQuery).spread((result) => result);
  // Verificar si se eliminaron los registros correctamente
  if (resultQuery1[0].affectedRows === 1 && resultQuery2[0].affectedRows === 1) {
    console.log('Los registros fueron eliminados correctamente');
  } else {
    console.log('No se pudieron eliminar los registros');
  }
  // Confirmar la transacción
  // await connectiondb.commit();
     return resultQuery1,resultQuery2;
  } catch (error) {
  // Deshacer la transacción en caso de error
  // await connectiondb.rollback();
  console.error('Error al eliminar los registros:', error);
} 
};
//UPDATE
const updateEmployee = async (id_employee, values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;

  const sqlQuery = `UPDATE employees SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE id_employee = ${id_employee}`;
  const result = await connectiondb
    .query(sqlQuery, [first_name, last_name, cuit, team_id, join_date, rol])
    .spread((result) => result);
  return result;
};
//EXPORTS
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
