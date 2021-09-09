import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

// tener en cuenta todo informacion que dispatchamos en nuestro store de redux al hacer refresh se pierde , tenemos dos opciones 
// para la persistencia usar localstorage o base de datos , dependiendo del caso 


export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {   //  getState : injectar un state del store

        const { uid, name } = getState().auth;    // inf del user autenticado del store
        

        try {
            const resp = await fetchConToken('events', event, 'POST'); 
            const body = await resp.json();

           //  console.log(body)
            
            if ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log( event );
                dispatch( eventAddNew( event ) );
            }


        } catch (error) {
            console.log(error);
        }

        

    }
}

// no export porque solo uso en este archivo - disparo si realmente se graba en db con exito
const eventAddNew = (event) => ({ // recibo evento que quiero grabar
   type: types.eventAddNew,
   payload: event
});
 



export const eventSetActive = (event) => ({ // evento activo 
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });








export const eventStartUpdate = ( event ) => {
    return async(dispatch) => { //thunk

        
        try {
            const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else { // false - backend verifica toeken y no edja actualizar object creados popr otros users - validacion 
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});






export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else { // validacion backend - token - no aautoriza mofificar object de otra persona 
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}
const eventDeleted = () => ({ type: types.eventDeleted });






export const eventStartLoading = () => {
    return async(dispatch) => {
       
         try {
            
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();
             
            const events = prepareEvents( body.eventos ); // console.log(events)
            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error)
        } 

    }
}

const eventLoaded = (events) => ({ // accion al reducer - solo trabaja en este archivo no exporto 
    type: types.eventLoaded,
    payload: events
})


export const cleanCalendar = () => ({ type: types.eventLogout }) 
