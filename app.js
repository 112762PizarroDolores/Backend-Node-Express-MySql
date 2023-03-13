// dependencias
const express = require("express");
const cors = require("cors");
const dotEnv=require("dotenv")
//const morgan = require("morgan");//DOLO INSTALALO DESPUES

// import de routes
//const assetsRouter = require("./src/routes/asset.route");
const employeesRouter = require("./src/routes/employee.route");


// Variables & App
const app = express();
const PORT = process.env.API_PORT || 3000;

//middleware global, pra resolver error cors
app.use(cors());
//middleware global, para recibir bodies de formato json
app.use(express.json({ limit: '50mb' }));
// middleware global, para ver logs de consultas en la terminal. Borrar en fase de produccion
//app.use(morgan("dev"));//DOLO VER SI ESTA DESC

//end point inicial, con el router
//app.use("/api/employees/assets", assetsRouter);http://localhost:3000/api/employee
app.use("/api/employees", employeesRouter); //http://localhost:3000/api/employee

// endpoint de error cuando se ingresa a una ruta que no existe
app.set("title", "Hi, The requested page is not available");
app.get("/*", (req, res) => {
  res.send(app.get("title"));
  console.log(app.get("title"));
});

//conexion
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});