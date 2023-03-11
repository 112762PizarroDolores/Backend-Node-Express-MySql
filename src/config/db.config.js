 const connectiondb=require ('mysql2-promise')();
 const dotEnv=require('dotenv')
 dotEnv.config()

 const config = {
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME
}
connectiondb.configure(config)
module.exports=connectiondb

// const mysql = require('promise-mysql');
// const dotenv =require('dotenv');
// dotenv.config();


// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     user: process.env.USER,
//     password: process.env.PASSWORD

// });
// const getConnection=()=>{
//     return connection;
// };
// module.exports={
//     getConnection
// };

