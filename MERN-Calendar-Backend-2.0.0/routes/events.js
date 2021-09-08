/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos , ValidatorIsMongoId } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

// Todas tienes que pasar por la validación del JWT
// AFECTA LAS RUTAS DE ABAJO , si tenemos una mas arriba no la va a afectar por secuenvcia de ejecucion 
// si furra algun ruta publica la subimos arriba y las de abajo seran protegidas por jwk
router.use( validarJWT );


// Obtener eventos 
router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ), // true , false
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        ValidatorIsMongoId,
        validarCampos
    ],
    actualizarEvento 
);

// Borrar evento
// TODO : validacion idIdMongoDb  
router.delete('/:id',[ ValidatorIsMongoId ], eliminarEvento ); 

module.exports = router;