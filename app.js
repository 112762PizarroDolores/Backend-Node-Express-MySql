//Dependencias 
const express= require('express');
const cors= require('cors');
//Creo la app de express
const app=express();
//Creo const con mi puerto. Luego setearé con mis var de entorno
const port=3000
//uso cors para evitar el error de cruz-nav
app.use(cors());
//La app escucha los req.
app.listen(port, ()=> {
    console.log(`The server is running in the port ${port}`)
})