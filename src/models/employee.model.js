
const connectiondb = require("../config/db.config")

const findAllEmployees = async()=> {

const rows = await connectiondb.query('SELECT*FROM employees e').spread((rows)=>rows)
return rows
}





const findById = async (id_employee)=>{
    const row = await  connectiondb.query("SELECT * FROM  employees e WHERE e.id_employee = ? ", [id_employee]).spread(row=>row)
    return row.length>0 ? row[0] : []
}

// 
// conexion.query es un metodo js que recibe dos parametros, 1p- consulta a la db, 2p-arreglo con los valores que deseo insertar una consulta a la base de datos
// .spread le permite a un array o cadena de texto ser expandido, donde 
const createEmployee = async (values)=>{
   const  {first_name, last_name, cuit, team_id, join_date, rol} = values
   const  result= await connectiondb.query('INSERT INTO employees(first_name, last_name, cuit, team_id, join_date, rol) values(?,?,?,?,?,?)',
   [first_name, last_name, cuit, team_id, join_date, rol]).spread((result)=>result)
   return result
}


module.exports = {findAllEmployees: findAllEmployees,
    findById : findById,
    createEmployee : createEmployee}

