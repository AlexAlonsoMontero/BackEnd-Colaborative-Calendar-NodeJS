const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config')
//Crear servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())
//Directorio público
app.use( express.static('public'));
//Lectura body
app.use (express.json())


//Rutas
app.use('/api/auth',require('./routes/auth'))
app.use('/api/events',require('./routes/events'))

//TODO: CRUD eventos

//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Server run port ${process.env.PORT}`);
});