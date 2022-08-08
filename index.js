const express = require('express');
require('dotenv').config();

//Crear servidor de express
const app = express();

//Directorio público
app.use( express.static('public'));
//Lectura body
app.use (express.json())


//Rutas
app.use('/api/auth',require('./routes/auth'))

//TODO: CRUD eventos

//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Server run port ${process.env.PORT}`);
});