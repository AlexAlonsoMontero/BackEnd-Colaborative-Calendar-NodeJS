const { validationResult } = require("express-validator");

const validarCampos = (request, response, next) =>{
    
    const errors = validationResult(request);
    if (!errors.isEmpty()){
        return response.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}