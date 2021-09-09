import { types } from '../types/types';


// {
//     id: 'askdjhaksdjas',
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Fernando'
//     }
// }


const initialState = {
    events: [],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => { // state injecta lo que esta en el store

    switch ( action.type ) {
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            console.log(state)
            console.log(initialState)
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
                )        //repasar todo y sustituye la coincidencia
            }
        
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id ) // regresa todo menos la coincidencia que es evento actual 
                ),
                activeEvent: null // redefinir que no hay evento activo
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ] // eventos form db 
            } 
            
        case types.eventLogout:
            
            return {
               ...initialState 
            }   
    

        default:
            return state;
    }


}
