/*
    Rutas de usuarios / Auth
    host /api/auth
*/


const express = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = express.Router();

router.post('/new',crearUsuario );

router.post('/',loginUsuario);

router.get('/renew',revalidarToken);

module.exports = router;