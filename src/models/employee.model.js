const connectiondb = require("../config/db.config");

//GET ALL EMPLOYEES
//extraigo de parametros al  limite y de la const params ${limite}
const getAllEmployees = async (where, ordenar) => {
  const params = `${where} ${ordenar} `;

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
    const sqlQuery2 = `DELETE FROM employees WHERE id_employee = ${id_employee}`;
    const resultQuery2 = await connectiondb
      .query(sqlQuery2)
      .spread((result) => result);
    return resultQuery2;
  } catch (error) {
    console.error("Error al eliminar los registros:", error);
  }
};
//UPDATE
const updateEmployee = async (employee, values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const sql = `UPDATE employees SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE id_employee=${employee.id_employee}`;
  const result = await connectiondb
    .query(sql, [
      first_name ? first_name : employee.first_name,
      last_name ? last_name : employee.last_name,
      cuit ? cuit : employee.cuit,
      team_id ? team_id : employee.team_id,
      join_date ? join_date : employee.join_date,
      rol ? rol : employee.rol,
    ])
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
