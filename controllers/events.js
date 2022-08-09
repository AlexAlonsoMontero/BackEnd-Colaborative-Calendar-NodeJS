const Evento = require('../models/Evento')

const getEventos = async (request, response) => {
    try {
        const eventos = await Evento.find()
            .populate('user', 'name');
        response.json({
            ok: true,
            eventos
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Pongase en contacto con el administrador'
        })
    }

}

const crearEvento = async (request, response) => {
    const evento = new Evento(request.body);

    try {

        evento.user = request.uid
        const eventoGuardado = await evento.save();
        response.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const actualizarEvento = async (request, response) => {
    const eventoId = request.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            response.status(400).json({
                ok: false,
                msg: 'No existe el evento buscado'
            })
        }

        if (evento.user.toString() !== request.uid) {

            return response.status(401).json({
                ok: false,
                msg: 'No tiene permisos para modificar este evento'
            })
        }

        const nuevoEvento = {
            ...request.body,
            user: request.uid
        }


        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });



        response.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const eliminarEvento = async(request, response) => {
    const eventoId = request.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            response.status(400).json({
                ok: false,
                msg: 'No existe el evento buscado'
            })
        }

        if (evento.user.toString() !== request.uid) {

            return response.status(401).json({
                ok: false,
                msg: 'No tiene permisos para modificar este evento'
            })
        }

        const nuevoEvento = {
            ...request.body,
            user: request.uid
        }


        await Evento.findByIdAndDelete(eventoId);



        response.json({
            ok: true,
            msg: 'Registro eliminado'
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento


}