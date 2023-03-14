
const connectiondb = require("../config/db.config")

const getAllEmployees = async()=> {
const rows = await connectiondb.query('SELECT*FROM employees e').spread((rows)=>rows)
return rows
}
//find by id
 const getEmployeeById = async (id_employee)=>{
    const sqlQuery=`SELECT * FROM  employees e WHERE e.id_employee = ${id_employee} `
     const rows = await  connectiondb.query(sqlQuery).spread((rows)=>rows)
     return rows.length>0 ? rows[0] : []
 }

// 

//CREATE
const createEmployee = async (values)=>{
   const  {first_name, last_name, cuit, team_id, join_date, rol} = values
   const  result= await connectiondb.query('INSERT INTO employees(first_name, last_name, cuit, team_id, join_date, rol) values(?,?,?,?,?,?)',
   [first_name, last_name, cuit, team_id, join_date, rol]).spread((result)=>result)
   return result
   // conexion.query es un metodo js que recibe dos parametros, 1p- consulta a la db, 2p-arreglo con los valores que deseo insertar una consulta a la base de datos
// .spread le permite a un array o cadena de texto ser expandido, donde 
}

//DELETE
const deleteEmployee = async (id_employee)=>{
    const sqlQuery=`DELETE FROM employees WHERE id_employee = ${id_employee}`
    console.log(sqlQuery)
    const result= await connectiondb.query(sqlQuery).spread((result)=>result)
    return result
 }
 //UPDATE
 const updateEmployee = async (id_employee, values)=>{
    const  {first_name, last_name, cuit, team_id, join_date, rol} = values
    
    const sqlQuery=`UPDATE employees SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE id_employee = ${id_employee}`
    const  result= await connectiondb.query(sqlQuery,[first_name, last_name, cuit, team_id, join_date, rol]).spread((result)=>result)
    return result
 }
 //EXPORTS
module.exports = {getAllEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
updateEmployee}

