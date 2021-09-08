import moment from 'moment';

import { types } from '../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
            _id: '123',
            name: 'Fernando'
        }
    }],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
           

        console.log(action.payload)
            return {
                ...state,
                events: [
                    ...state.events, // objetos existentes en la coelccion 
                    action.payload // objeto a agregar 
                ]
            }
    
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }


        case types.eventUpdated:
           
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )        // esta funcion de linea si coincide actulizalos sino dejelo tal cual 
            }
        
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id ) // evitar regresar en la coleccion el objeto que la persona mando a borrar
                ),
                activeEvent: null // redefinir que no hay evento activo
            }

        default:
            return state;
    }


}
