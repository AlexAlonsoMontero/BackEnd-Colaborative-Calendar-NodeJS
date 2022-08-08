const crearUsuario = (request, response)=>{

    const { name, email, password } = request.body;
    
    if( name.length < 5){
        return response.status(400).json({
            ok:false,
            msg:'El nombre debe ser de 5 letras'
        })
    }

    return response.json({
        ok:true,
        msg: 'registro',
        name,
        email,
        password
    })
}

const loginUsuario = (request, response)=>{
    response.json({
        ok:true,
        msg:`login`,
        email,
        password
    })
}

const revalidarToken = (request, response)=>{
    response.json({
        ok:true,
        msg: ' renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}

