/*
    Rutas de usuarios / Auth
    host /api/auth
*/


const express = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = express.Router();



router.post('/new',
    [ //middlewaresz
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password tiene tamaño mínimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post('/',
    [//middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password tiene tamaño mínimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

router.get('/renew',validarJWT , revalidarToken);

module.exports = router;