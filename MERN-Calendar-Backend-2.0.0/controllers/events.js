const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find() // {} especificar applicar filtros , vacio trae todo
                                .populate('user',['name']);
                                 //user => refrencia modelo relacion , campos necesito de la relacion - id viene por default 
    res.json({                 
        ok: true,
        eventos
    });
    
}

const crearEvento = async ( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEvento = async( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid; // se monta en el proceso de jwt
   
    try {

        const evento = await Evento.findById( eventoId );
      
       // console.log(evento.user.toString())

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) { // segnifica que otra persona quiere modificar informacion de otra persona eso no debe permitir
            return res.status(401).json({
                 ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body, // en peticion no viene uid
            user: uid  
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); 
        //{new : true } paraque me returna el objeto actualizado en tiempo real - sino me regresa el objeto que acabo de actualizar para hacer comparacion 
        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEvento = async( req, res = response ) => {
 

    const eventoId = req.params.id;
    const uid = req.uid; // montado en jwt process
 

    try {

        const evento = await Evento.findById( eventoId ); 
       

         if ( !evento ) {
             return res.status(404).json({
                 ok: false,
                 msg: 'Evento no existe por ese id'
             });
         }  // hay una nota sobre temas de seguridad invistigar

        if ( evento.user.toString() !== uid ) {

          return res.status(401).json({
              ok: false,
              msg: 'No tiene privilegio de eliminar este evento'
          });

        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

     
   

}


module.exports = {  // acciones del controller event
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}