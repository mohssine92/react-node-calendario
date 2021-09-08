const moment = require('moment');

const isDate = ( value , /* rest */ ) => { // toda informacion refrente a la peticion 

    if ( !value ) {
        return false;
    } // esto lo va a decir a express validator si esta funcion regresa false este es decir que este campo no es correcto  

    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
    
}



module.exports = { isDate };


