/*
    Event routes
    /api/events
*/

const express = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require ('../helpers/isDate')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

//Totas las rutas tienen que estar validadas
router.use( validarJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear un evento 
router.post('/', 
[
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom( isDate ),
    validarCampos,
    
],
crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router