//Dependencias 
const express= require('express');
const cors= require('cors');
const dotEnv=require('dotenv')
const routeGetEmployees= require('./src/routes/employee.route')
//Creo la app de express
const app=express();
//Creo const con mi puerto. Luego setearé con mis var de entorno
const port=process.env.API_PORT || 3000;
//uso cors para evitar el error de cruz-nav
app.use(cors());
//get employees
app.use('/api/employees',routeGetEmployees)
//parseo Json
app.use(express.json({ limit: "50mb "}));
//La app escucha los req.
app.listen(port, ()=> {
    console.log(`The server is running in the port ${port}`)
})