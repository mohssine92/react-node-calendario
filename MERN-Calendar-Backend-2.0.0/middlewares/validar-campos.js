const { response } = require('express');
const { validationResult } = require('express-validator');
const validator = require('validator');



const validarCampos = (req, res = response, next) => {

    // manejo de errores
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }


    next();
}


const ValidatorIsMongoId = (req, res = response, next) => {
  
 // console.log(req.params.id)   
 // const idValid =  validator.isMongoId(req.params.id);
 
 
 if ( validator.isMongoId(req.params.id) === false ) {

  return res.status(400).json({
     ok: false,
     errors: 'no is id valid mongodb'

  });

 }

  next();

}

    
    







module.exports = {
    validarCampos,
    ValidatorIsMongoId
}

