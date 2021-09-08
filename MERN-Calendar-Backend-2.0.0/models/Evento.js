const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: { // saber quien grabo ese registro 
        type: Schema.Types.ObjectId, // id referente al modelo user 
        ref: 'Usuario',
        required: true
    }

});

// sobre escribir el serializador toJson que usa mongoose
EventoSchema.method('toJSON', function() { // organizar las props que necesito returnar en json al controller
    const { __v, _id, ...object } = this.toObject(); // todos lo demas estara almacenado en object
    object.id = _id;
    return object;
});



module.exports = model('Evento', EventoSchema );

