const connectiondb = require("../config/db.config");
  //extraigo de parametros al  limite y de la const params ${limite}
const getAllAssets = async (where, ordenar) => {
  const params = `${where} ${ordenar} `;
  const rows = await connectiondb
    .query(`SELECT * FROM assets ${params}`)
    .spread((rows) => rows);
  return rows;
};
//FIND ASSETS BY ASSET ID
const getAssetById = async (id_asset) => {
  const sqlQuery = `SELECT * FROM  assets a WHERE a.id_asset = ${id_asset} `;
  const rows = await connectiondb.query(sqlQuery).spread((rows) => rows);
  return rows.length > 0 ? rows[0] : null;
};

// FIND ASSETS BY EMPLOYEE ID
const getAssetsByEmployeeId = async (id_employee) => {
  const sqlQuery = `SELECT a.name,  a.type, a.code, a.marca, a.description, a.purchase_date, e.first_name, e.last_name, e.id_employee FROM  assets a join employees e on a.id_employee = e.id_employee WHERE e.id_employee = ${id_employee} `;
  const rows = await connectiondb.query(sqlQuery).spread((rows) => rows);
  return rows;
};
//CREATE
const createAsset = async (values) => {
  const { name, type, code, marca, description, purchase_date, id_employee } =
    values;
  const result = await connectiondb
    .query(
      "INSERT INTO assets(name, type, code, marca, description, purchase_date, id_employee) values(?,?,?,?,?,?,?)",
      [name, type, code, marca, description, purchase_date, id_employee]
    )
    .spread((result) => result);
  return result;
  // conexion.query es un metodo js que recibe dos parametros, 1p- consulta a la db, 2p-arreglo con los valores que deseo insertar una consulta a la base de datos
  // .spread le permite a un array o cadena de texto ser expandido, donde
};

//DELETE
const deleteAsset = async (id_asset) => {
  const sqlQuery = `DELETE FROM assets WHERE id_asset = ${id_asset}`;
  console.log(sqlQuery);
  const result = await connectiondb.query(sqlQuery).spread((result) => result);
  return result;
};
//UPDATE ASSET
const updateAsset = async (asset, values) => {
  //saque a id_employee
  const { name, type, code, marca, description, purchase_date, id_employee } =
    values;
  console.log("SOY ASSET", asset);
  console.log("SOY VALUES", values); //saqué de la sig query el id_empoyee=?
  const sql = `UPDATE assets SET name=?, type=?, code=?, marca=?, description=?, purchase_date=?, id_employee=? WHERE id_asset=${asset.id_asset}`;
  const result = await connectiondb
    .query(sql, [
      name ? name : asset.name,
      type ? type : asset.type,
      code ? code : asset.code,
      marca ? marca : asset.marca,
      description ? description : asset.description,
      purchase_date ? purchase_date : asset.purchase_date,
      id_employee ? id_employee : asset.id_employee,
    ])
    .spread((result) => result);
  return result;
};

//UPDATE ASSETS BY EMPLOYEE ID

const resetEmployeeFKByIdEmployee = async (employeeId) => {
  const sql = `UPDATE assets SET id_employee=null WHERE id_employee = ${employeeId}`;
  const result = await connectiondb.query(sql).spread((result) => result);
  return result;
};

//EXPORTS
module.exports = {
  getAllAssets,
  getAssetById,
  createAsset,
  deleteAsset,
  updateAsset,
  getAssetsByEmployeeId,
  resetEmployeeFKByIdEmployee,
};
