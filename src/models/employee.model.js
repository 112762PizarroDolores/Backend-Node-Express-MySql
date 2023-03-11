const connectiondb = require("../config/db.config")

const findAllEmployees = async()=> {

const rows = await connectiondb.query('SELECT*FROM employees e').spread((rows)=>rows)
return rows
}

module.exports={findAllEmployees: findAllEmployees}