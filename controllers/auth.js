const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (request, response) => {

    const { password, email } = request.body;

    try {
        let usuario = await Usuario.findOne({ email })
        if (usuario) {
            return response.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese email'
            })
        }
        usuario = new Usuario(request.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        const token = await generarJWT(usuario.id, usuario.name)

        response.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const loginUsuario = async (request, response) => {
    const { email, password } = request.body;
    try {

        const usuario = await Usuario.findOne(({ email }))
        if (!usuario) {
            return response.status(400).json({
                ok: false,
                msg: 'Usuario y contraseña incorrectos revisa los datos'
            })
        }
        //confirmar passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar JWT
        await usuario.save();
        const token = await generarJWT(usuario.id, usuario.name)


        response.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }


}

const revalidarToken = async(request, response) => {
    const uid = request.uid;
    const name = request.name;
    
    const token = await generarJWT( uid, name)


    response.json({
        ok: true,
        uid,
        name,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}

